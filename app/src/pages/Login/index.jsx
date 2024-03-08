import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../../store/services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const response = await login({ email, password });
      console.log(response.data);
      if (response) {
        setSuccess(response.data.message);
      }
    } catch (error) {
      setError(error);
      console.error('Erreur lors de la connexion :', error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/admin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div className="py-8 text-center">
      <h1>Connexion</h1>
      {success ? (
        <>
          <p className="py-8">{success}</p>
          <p>Vous allez être redirigé dans 3sec...</p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email{' '}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Mot de passe{' '}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      )}
    </div>
  );
};

export default Login;
