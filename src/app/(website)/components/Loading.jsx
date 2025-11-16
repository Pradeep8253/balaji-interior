import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="grid grid-cols-2 gap-2">
        <div
          className="w-10 h-10 bg-logo-blue rounded-sm animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-10 h-10 bg-logo-blue rounded-sm animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-10 h-10 bg-logo-blue rounded-sm animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="w-10 h-10 bg-logo-blue rounded-sm animate-pulse"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* Text Component */}
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-logo-brown">
          Balaji <span className="text-logo-blue">Luxury</span>
        </p>
        <p className="text-xl font-semibold text-logo-olive">
          Interior Designers
        </p>
        <p className="mt-3 text-base text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
