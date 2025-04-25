const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-4 py-12 text-center">
      <div className="mx-auto mb-6 text-yellow-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Sorry! No results found
      </h2>

      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        Please try adjusting your filters, using more common keywords<br className="hidden md:block" />
        or explore featured events below
      </p>
    </div>
  );
}
export default NotFound