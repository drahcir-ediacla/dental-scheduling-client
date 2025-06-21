import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas/loginSchema';
import type { LoginSchemaType } from '../../schemas/loginSchema';
import { axiosInstance } from '../../lib/axiosInstance';

const LoginUser: React.FC = () => {
  const [form, setForm] = useState<LoginSchemaType>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginSchemaType>>({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<LoginSchemaType> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginSchemaType;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axiosInstance.post('/api/users/login', form);
      console.log('Login successful:', response.data);
      window.location.href = '/'; // Redirect to homepage or dashboard
    } catch (error: any) {
      console.error('Login failed:', error);
      setServerError(error?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Login</h2>

        {serverError && <p className="text-red-600 text-sm mb-4 text-center">{serverError}</p>}

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-3 mb-1 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

        <label className="block mt-4 mb-2 text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={`w-full p-3 mb-1 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-4 mb-4">
          Login
        </button>

        <div className="flex flex-col items-center gap-2 text-blue-600">
          <button type="button" onClick={() => navigate('/')} className="hover:underline">
            Back to Homepage
          </button>
          <button type="button" onClick={() => navigate('/create-account')} className="hover:underline">
            Don't have an account? Create one
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
