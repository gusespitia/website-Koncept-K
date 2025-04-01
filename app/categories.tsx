"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  category_name: string;
  category_slug: string;
  category_image?: { url: string; name: string };
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto py-6">
      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-6 justify-center "> {/* Solo un <ul> */}
          {categories.map((category) => (
            <li key={category.id}> {/* Cada categoría es un <li> */}
              <Link
                href={`/categories/${category.category_slug}`}
                className="inline-block px-4 py-2  text-gray-800 rounded-md border  bg-gray-200 border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 font-medium"
              
              >
                {category.category_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;