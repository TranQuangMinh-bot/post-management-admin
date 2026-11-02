import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { portal } from './supabase';

// Different tab titles make the two windows easy to tell apart
document.title =
  portal === 'admin' ? 'Admin - Post Management' : 'Post Management';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
