"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}categories?populate=category_image`
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-600 text-lg">Loading categories...</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-center ">
              <Link
                href={`/categories/${category.category_slug}`}
                className="block w-full text-center px-6 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-200 font-medium"
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