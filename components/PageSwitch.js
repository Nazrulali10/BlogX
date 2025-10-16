import React from "react";

const PageSwitch = ({ mainFilter, setMainFilter }) => {
  const button = ['All', 'Following'];

  return (
    <div className="flex flex-col text-gray-500 dark:text-white w-full items-center justify-center mb-4 md:mb-8">
      <div className="relative flex gap-10 w-fit mx-auto">
        {button.map((label, i) => (
          <button
            key={i}
            onClick={() => setMainFilter(label)}
            className="min-w-20 text-xl focus:outline-none mb-1 cursor-pointer"
          >
            {label}
          </button>
        ))}

        <div
          className="absolute bottom-0 bg-blue-700 rounded-full h-0.5 w-22 transition-transform duration-500"
          style={{
            transform:
              mainFilter === "All" ? "translateX(0)" : "translateX(135%)",
          }}
        />
      </div>
    </div>
  );
};

export default PageSwitch;
