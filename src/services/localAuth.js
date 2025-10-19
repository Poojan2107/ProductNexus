// Simple local authentication using localStorage.
// Not secure for production — intended for local/dev use only per user request.

const USERS_KEY = "product_app_users";
const CURRENT_KEY = "product_app_current_user";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

async function hashPassword(password) {
  // SHA-256 via Web Crypto API
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("localAuth: failed to save users", e);
  }
}

function setCurrentUser(user) {
  try {
    if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_KEY);
    // notify other tabs via storage event as well
    // we also call callbacks in this module when appropriate
  } catch (e) {
    console.error("localAuth: failed to set current user", e);
  }
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

const callbacks = new Set();

function notifyAuthState(user) {
  callbacks.forEach((cb) => {
    try {
      cb(user);
    } catch (e) {
      console.warn("localAuth callback failed", e);
    }
  });
}

// listen for storage events from other tabs
window.addEventListener("storage", (ev) => {
  if (ev.key === CURRENT_KEY) {
    notifyAuthState(getCurrentUser());
  }
});

export async function registerWithEmail(name, email, password) {
  const users = loadUsers();
  const normalized = String(email || "").toLowerCase();
  if (users[normalized]) throw new Error("USER_ALREADY_EXISTS");
  const id = generateId();
  const passHash = await hashPassword(password);
  const user = {
    id,
    name: name || "",
    email: normalized,
    passwordHash: passHash,
  };
  users[normalized] = user;
  saveUsers(users);
  // set current user
  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  notifyAuthState(getCurrentUser());
  return getCurrentUser();
}

export async function loginWithEmail(email, password) {
  const users = loadUsers();
  const normalized = String(email || "").toLowerCase();
  const user = users[normalized];
  if (!user) throw new Error("INVALID_CREDENTIALS");
  const passHash = await hashPassword(password);
  if (passHash !== user.passwordHash) throw new Error("INVALID_CREDENTIALS");
  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  notifyAuthState(getCurrentUser());
  return getCurrentUser();
}

export async function logout() {
  setCurrentUser(null);
  notifyAuthState(null);
}

export function onAuthStateChanged(cb) {
  callbacks.add(cb);
  // call immediately with current state
  try {
    cb(getCurrentUser());
  } catch (e) {
    /* ignore */
  }
  return () => callbacks.delete(cb);
}

export { getCurrentUser };
