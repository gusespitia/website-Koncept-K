"use client";
import React from "react";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  category_name: string;
  category_image?: { url: string; name: string };

}

const Categories = () => {
  const [categories, setCategories]  = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/categories?populate=category_image"
        );
        const data = await response.json();
        if (data?.data) {
          setCategories(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="w-full max-w-8xl mx-auto row-start-2 col-span-2 ">
      <ul className="flex gap-10 justify-center cursor-pointer ">
       {loading ? (
        <p>Loading...</p>
      ) : (
        categories.map((category) => (
        <ul key={category.id}>
           <li className="font-serif border-1 border-black px-4 py-1 rounded-xs">
          {category.category_name}
        </li>
        </ul>
      ))
      )}
    
      </ul>
    </div>
  );
};

export default Categories;
