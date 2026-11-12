/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { EntrepreneurDashboard } from './pages/EntrepreneurDashboard';
import { EntrepreneurProfilePage } from './pages/EntrepreneurProfilePage';
import { InvestorProfilePage } from './pages/InvestorProfilePage';
import { ChatPage } from './pages/ChatPage';
import { LandingPage } from './pages/LandingPage';
import { NexusAIChatbot } from './components/ai/NexusAIChatbot';

// Protected Route wrapper with role check
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'investor' | 'entrepreneur' }> = ({
  children,
  allowedRole
}) => {
  const { isAuthenticated, currentUser } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={currentUser.role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur'} replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Investor Routes */}
          <Route
            path="/dashboard/investor"
            element={
              <ProtectedRoute allowedRole="investor">
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Entrepreneur Routes */}
          <Route
            path="/dashboard/entrepreneur"
            element={
              <ProtectedRoute allowedRole="entrepreneur">
                <EntrepreneurDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profiles */}
          <Route
            path="/profile/entrepreneur/:id"
            element={
              <ProtectedRoute>
                <EntrepreneurProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/investor/:id"
            element={
              <ProtectedRoute>
                <InvestorProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Real-Time Style Communication Chat */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:userId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Floating Animated AI Co-Pilot */}
        <NexusAIChatbot />
      </BrowserRouter>
    </AppProvider>
  );
}
