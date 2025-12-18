import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProviderIntegrated } from './context/AuthContextIntegrated';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import LoginIntegrated from './pages/LoginIntegrated';
import SignupIntegrated from './pages/SignupIntegrated';

function AppWorking() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProviderIntegrated>
          <UserProvider>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginIntegrated />} />
                <Route path="/signup" element={<SignupIntegrated />} />
              </Routes>
            </div>
          </UserProvider>
        </AuthProviderIntegrated>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppWorking;