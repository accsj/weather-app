import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


const AppRouter = () => {
  return (
      <Router>
        <ToastContainer />
          <Routes>
              <Route path="/" element={<App />} />
          </Routes>
      </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRouter />
);