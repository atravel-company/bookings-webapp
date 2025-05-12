export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="31.415, 31.415"
        />
      </svg>
      <p className="mt-4 text-lg font-medium text-gray-700">
        Loading report, please wait...
      </p>
    </div>
  );
}