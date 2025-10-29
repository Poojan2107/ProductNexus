import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";
import "./Form.css";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("NAME_AND_EMAIL_REQUIRED");
      return;
    }
    try {
      setLoading(true);
      await updateUserProfile(user.id, {
        name: form.name,
        email: form.email,
        password: form.password || undefined,
      });
      addNotification("PROFILE_UPDATED_SUCCESSFULLY", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card matrix">
      <h2 className="form-title">USER_PROFILE.exe</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>USERNAME</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          <span>EMAIL_ADDRESS</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="user@example.com"
          />
        </label>
        <label>
          <span>NEW_PASSWORD (leave blank to keep current)</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </label>
        <button className="btn accent" disabled={loading} type="submit">
          {loading ? "UPDATING_PROFILE..." : "UPDATE_PROFILE"}
        </button>
      </form>
    </div>
  );
}
