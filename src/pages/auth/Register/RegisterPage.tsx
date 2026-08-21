import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/forms/RegisterForm/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-gray-400">
          Join Cinematique for seamless online ticket booking
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-xs text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-[#E50914] font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
