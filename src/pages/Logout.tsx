import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.post('http://localhost:5000/api/user/logout')
      .then(() => {
        localStorage.clear(); // Clear auth tokens or any local data
        navigate('/login');
      })
      .catch(err => {
        console.error('Logout failed:', err);
        setError('Failed to logout. Please try again.');
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        {error}
        <br />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return <p className="text-center mt-10 text-gray-600">Logging out...</p>;
};

export default Logout;
