import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-brand-bg">
      <AuthForm defaultMode="login" />
    </div>
  );
};

export default AuthPage;
