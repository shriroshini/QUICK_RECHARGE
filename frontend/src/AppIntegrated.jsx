import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProviderIntegrated } from './context/AuthContextIntegrated';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';
import NavbarIntegrated from './components/NavbarIntegrated';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import LoginIntegrated from './pages/LoginIntegrated';
import SignupIntegrated from './pages/SignupIntegrated';
import UserHome from './pages/UserHome';
import RechargePlansIntegrated from './pages/RechargePlansIntegrated';
import Recharge from './pages/Recharge';
import History from './pages/History';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './routes/AdminProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <NavbarIntegrated />}
      <main className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/role-selection" element={<RoleSelection />} />
                  <Route path="/login" element={<LoginIntegrated />} />
                  <Route path="/signup" element={<SignupIntegrated />} />
                  <Route path="/home" element={
                    <ProtectedRoute>
                      <UserHome />
                    </ProtectedRoute>
                  } />
                  <Route path="/plans" element={<RechargePlansIntegrated />} />
                  <Route path="/recharge" element={
                    <ProtectedRoute>
                      <Recharge />
                    </ProtectedRoute>
                  } />
                  <Route path="/history" element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <Admin />
                    </AdminProtectedRoute>
                  } />
                </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppIntegrated() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProviderIntegrated>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </AuthProviderIntegrated>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppIntegrated;