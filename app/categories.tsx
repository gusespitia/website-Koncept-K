"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  category_name: string;
  category_slug: string;
  category_image?: {
    url: string;
    name: string;
  };
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        // Intento con API principal
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories?populate=category_image`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        clearTimeout(timeoutId);

        if (data?.data?.length > 0) {
          setCategories(data.data);
        } else {
          throw new Error("No categories found in primary API");
        }
      } catch (primaryError) {
        console.log("Trying backup API...", primaryError);
        try {
          // Intento con API de respaldo
          const responseBackup = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/categories?populate=category_image`
          );

          if (!responseBackup.ok)
            throw new Error(`HTTP error! status: ${responseBackup.status}`);

          const dataBackup = await responseBackup.json();

          if (dataBackup?.data) {
            setCategories(dataBackup.data);
          } else {
            throw new Error("No categories found in backup API");
          }
        } catch (backupError) {
          console.error("Both APIs failed:", backupError);
          setError("Failed to load categories. Please try again later.");
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-auto sm:px-6 lg:px-8 ">
      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-600 text-lg">Loading categories...</p>
        </div>
      ) : (
        <ul className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6 px-4 sm:px-6 py-6 ">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-center">
              <Link
                href={`/categories/${category.category_slug}`}
                className="block w-full max-w-xs text-center px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-200 font-medium text-sm sm:text-base"
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
