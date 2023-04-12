import { useState, useEffect } from "react";

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
        <span>Loading</span>
        <div className="relative inline-block w-6 h-6">
          <div className="absolute inset-0 border-2 border-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-2 border-blue-600 border-opacity-0 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
}

export const LoadingWithTimer = ({ time }: { time?: number }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, time ?? 3000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  return (
    <div className="flex justify-center items-center ">
      {loading ? (
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M 4 12 a 8 8 0 0 1 8 -8 V 0 C 5.373 0 0 5.373 0 12 h 4 z m 2 5.291 A 7.962 7.962 0 0 1 4 12 H 0 c 0 3.042 1.135 5.824 3 7.938 l 3 -2.647 z z"
          ></path>
        </svg>
      ) : (
        <div>Content Loaded!</div>
      )}
    </div>
  );
};
