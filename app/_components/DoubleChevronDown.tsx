import React from "react";

interface DoubleChevronDownProps {
  onClick?: () => void;
  className?: string;
}

export const DoubleChevronDown: React.FC<DoubleChevronDownProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      role="button"
      aria-label="Scroll down"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce-slow"
      >
        {/* First chevron */}
        <path
          d="M8 12L20 24L32 12"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Second chevron */}
        <path
          d="M8 20L20 32L32 20"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
