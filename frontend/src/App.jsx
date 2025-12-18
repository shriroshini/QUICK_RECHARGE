import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RechargePlans from './pages/RechargePlans';
import Recharge from './pages/Recharge';
import History from './pages/History';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import AddPlan from './pages/AddPlan';
import AdminProtectedRoute from './routes/AdminProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <AdminProvider>
              <Routes>
              <Route path="/" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <LandingPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/login" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Login />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/signup" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Signup />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/plans" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <RechargePlans />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/recharge" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Recharge />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/history" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <History />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
              </Routes>
            </AdminProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
