import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

const { FiMapPin, FiUser, FiMail, FiLock, FiHome, FiEye, FiEyeOff } = FiIcons;

function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login } = useAuthStore();

  const password = watch('password');

  // const onSubmit = (data) => {
  //   if (step === 1) {
  //     setStep(2);
  //     return;
  //   }

  //   // Simulate registration and address verification
  //   const userData = {
  //     id: 1,
  //     name: data.name,
  //     email: data.email,
  //     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  //     neighborhood: 'Maple Heights',
  //     verified: false
  //   };
    
  //   login(userData);
  //   toast.success('Welcome to NeighborNet! Address verification pending.');
  // };
const onSubmit = async (data) => {
  if (step === 1) {
    setStep(2);
    return;
  }

  try {
    debugger
    const response = await fetch("https://localhost:7097/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({
        username: data.name,          
        fullName: data.name,          
        email: data.email,
        password: data.password,
        city :data.city,
       
        zip: data.zipCode
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      toast.error(errText || "Signup failed");
      return;
    }

    const result = await response.json();
    toast.success(result.message || "Signup successful!");

   
    const userData = {
      id: result.id, 
      name: data.name,
      email: data.email,
      neighborhood: data.address || "",
      verified: false,
    };
    login(userData);

  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-community-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-community-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <SafeIcon icon={FiMapPin} className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Your Neighborhood</h1>
              <p className="text-gray-600">
                {step === 1 ? 'Create your account' : 'Verify your address'}
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <SafeIcon 
                        icon={FiUser} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                      />
                      <input
                        {...register('name', { required: 'Full name is required' })}
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <SafeIcon 
                        icon={FiMail} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                      />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <SafeIcon 
                        icon={FiLock} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                      />
                      <input
                        {...register('password', { 
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <SafeIcon 
                        icon={FiLock} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                      />
                      <input
                        {...register('confirmPassword', { 
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <SafeIcon 
                        icon={FiHome} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                      />
                      <input
                        {...register('address', { required: 'Address is required' })}
                        type="text"
                        placeholder="123 Main Street"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        type="text"
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        {...register('zipCode', { required: 'ZIP code is required' })}
                        type="text"
                        placeholder="12345"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      📍 We'll verify your address to ensure you can only access content from your neighborhood. 
                      This helps keep our community safe and relevant.
                    </p>
                  </div>
                </>
              )}

              <div className="flex items-center">
                <input 
                  {...register('agreement', { required: 'You must agree to continue' })}
                  type="checkbox" 
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                    Good Neighbor Pledge
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              {errors.agreement && (
                <p className="mt-1 text-sm text-red-600">{errors.agreement.message}</p>
              )}

              <div className="flex space-x-4">
                {step === 2 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
                  >
                    Back
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-600 to-community-600 text-white py-3 rounded-lg font-medium hover:from-primary-700 hover:to-community-700 transition-all"
                >
                  {step === 1 ? 'Continue' : 'Join Neighborhood'}
                </motion.button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;