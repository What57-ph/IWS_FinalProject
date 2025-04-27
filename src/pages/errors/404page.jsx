import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-black opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float">
              <svg
                className="w-64 h-64 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-black">Oops! Lost in Space</h2>
          <p className="text-xl text-black opacity-90">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Please go back to the previous page or return to the Homepage
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 rounded-full font-semibold 
          hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105
          shadow-lg hover:shadow-xl"
        >
          Back to Home
        </button>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;