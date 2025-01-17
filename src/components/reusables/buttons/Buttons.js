import React from "react";

export const Button = ({
  text = "Button",
  clasName,
  onClick,
  icon,
  reverse,
}) => {
  return (
    <button
      onClick={onClick}
      className={` 
        ${clasName} 
        ${
          reverse
            ? "bg-white text-green-800 border border-green-800 hover:bg-green-800 hover:text-white"
            : "bg-green-800 text-white border-green-800 hover:text-green-800 hover:bg-white"
        } 
        rounded-xl px-4 py-2 flex items-center justify-center gap-x-2
      `}
    >
      <span>{text}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};
