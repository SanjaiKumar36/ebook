import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuthor?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuthor = false,
  requireAdmin = false,
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0a24] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ❌ NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔥 AUTHOR CHECK
if (requireAuthor) {
  return <>{children}</>;
}
  // 🔥 ADMIN CHECK (ONLY EMAIL)
  const ADMIN_EMAIL = "sanjaikumar87232@gmail.com";

  const userEmail = user?.email?.toLowerCase().trim();
  const adminEmail = ADMIN_EMAIL.toLowerCase().trim();

  console.log("USER EMAIL:", userEmail);
  console.log("ADMIN EMAIL:", adminEmail);

  if (requireAdmin && userEmail !== adminEmail) {
    console.log("NOT ADMIN → redirect");
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;