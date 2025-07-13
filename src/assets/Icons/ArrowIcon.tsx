import React from "react";

const ArrowIcon = ({
  className = "text-purple-300",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      height="16px"
      width="16px"
      viewBox="0 0 155.139 155.139"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="currentColor"
        points="155.139,77.566 79.18,1.596 79.18,45.978 0,45.978 0,109.155 79.18,109.155 79.18,153.542"
      />
    </svg>
  );
};

export { ArrowIcon };
