import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA2b2ohMx4GSLYwCEllxU_pj8L1Lm-nm54',
  authDomain: 'product-app-react-84aa7.firebaseapp.com',
  databaseURL: 'https://product-app-react-84aa7-default-rtdb.firebaseio.com/',
  projectId: 'product-app-react-84aa7',
  storageBucket: 'product-app-react-84aa7.firebasestorage.app',
  messagingSenderId: '465161377893',
  appId: '1:465161377893:web:87ed24a25372db8f1f8e8c',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
