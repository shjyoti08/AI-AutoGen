// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import AppRoutes from './routing/Routing'; // Import the routing component

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes /> {/* Use the separated routing component */}
      </Router>
    </AuthProvider>
  );
}

export default App;
