// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXHyOPE38PlyhoGKPRCF1OubK0tgLl-0A',
  authDomain: 'museum-ai.firebaseapp.com',
  projectId: 'museum-ai',
  storageBucket: 'museum-ai.appspot.com',
  messagingSenderId: '604267199928',
  appId: '1:604267199928:web:cf08a30d0765008815634d',
  measurementId: 'G-SBGXJR22WP'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
