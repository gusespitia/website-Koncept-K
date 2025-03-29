import React from "react";

const categories = () => {
  return (
    <div className="w-full max-w-8xl mx-auto row-start-2 col-span-2">
      <ul className="flex gap-10 justify-center cursor-pointer">
        <li className="font-serif border-1 border-black px-4 py-1 ">
          Herenmode
        </li>
        <li className="font-serif border-1 border-black px-4 py-1 ">
          Schoenen
        </li>
        <li className="font-serif border-1 border-black px-4 py-1 ">
          Accessoires
        </li>
        <li className="font-serif border-1 border-black px-4 py-1 ">
          Decoratie
        </li>
        <li className="font-serif border-1 border-black px-4 py-1 ">Example</li>
      </ul>
    </div>
  );
};

export default categories;
