import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AdminProvider } from './context/EditContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AdminProvider>
     <BrowserRouter> 
     <GoogleOAuthProvider clientId='436878237872-f7d1gltubmu8ibe639psmeu1q3qkavq6.apps.googleusercontent.com'>
     <App />
      </GoogleOAuthProvider>
     </BrowserRouter>
  </AdminProvider>
  </React.StrictMode>
);
