// src/components/UIComponents.jsx
import React from "react";

export const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

export const Table = ({ children, className, ...props }) => (
  <table
    {...props}
    className={`w-full border-collapse border border-gray-300 ${className}`}
  >
    {children}
  </table>
);
