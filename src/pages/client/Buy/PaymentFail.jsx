import React from 'react';

const PaymentFail = () => {
    // Custom X mark SVG
    const XMarkIcon = () => (
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
    return (
        <div className="mt-8 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mt-8">
                <div className="p-6 sm:p-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                            <XMarkIcon />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
                        <p className="text-gray-600 mb-6">We couldn't process your payment. Please try again.</p>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150"
                            >
                                Back to Home
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;