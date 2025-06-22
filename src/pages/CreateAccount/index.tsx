import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../../schemas/createAccountSchema';
import type { RegisterSchemaType } from '../../schemas/createAccountSchema';
import { axiosInstance } from '../../lib/axiosInstance';
import PrimaryButton from '../../components/PrimaryButton';

const CreateAccount = () => {
  const [form, setForm] = useState<RegisterSchemaType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<RegisterSchemaType>>({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<RegisterSchemaType> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegisterSchemaType;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axiosInstance.post('/api/users/register', form);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      setServerError(error?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Create Account</h2>

        {serverError && <p className="text-red-600 text-sm mb-4 text-center">{serverError}</p>}

        <label className="block mb-2 text-gray-700 font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className={`w-full p-3 mb-1 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.firstName ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
          }`}
        />
        {errors.firstName && <p className="text-red-500 text-sm mb-3">{errors.firstName}</p>}

        <label className="block mb-2 text-gray-700 font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className={`w-full p-3 mb-1 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.lastName ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
          }`}
        />
        {errors.lastName && <p className="text-red-500 text-sm mb-3">{errors.lastName}</p>}

        <label className="block mb-2 text-gray-700 font-medium">Email</label>
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

        <label className="block mb-2 text-gray-700 font-medium">Password</label>
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

        <PrimaryButton type="submit" className="w-full mt-4 mb-4 rounded-xl">Create Account</PrimaryButton>

        <div className="flex flex-col items-center gap-2 text-blue-600">
          <button type="button" onClick={() => navigate('/')} className="hover:underline">
            Back to Homepage
          </button>
          <button type="button" onClick={() => navigate('/login')} className="hover:underline">
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
