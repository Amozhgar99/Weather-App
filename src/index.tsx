import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// CREATE TABLE admin_notes (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     captain_id INT NOT NULL,
//     created_by VARCHAR(255) NOT NULL,
//     note TEXT NOT NULL,
//     note_type ENUM('general', 'warning', 'attention', 'followuo') DEFAULT 'general',
//     is_active TINYINT(1) DEFAULT 1,
//     created_at DATETIME DEFAULT NOW(),
//     updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
// );33r65tre
