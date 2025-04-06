"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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

          if (!responseBackup.ok) {
            throw new Error(`HTTP error! status: ${responseBackup.status}`);
          }

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

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-120 h-120 mb-2" />
              <Skeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => {
            const imageUrl = category.category_image?.url
              ? category.category_image.url.startsWith("http")
                ? category.category_image.url
                : `${CLOUDINARY_BASE_URL}${category.category_image.url}`
              : "/placeholder-category.png";

            return (
              <Link
                key={category.id}
                href={`/categories/${category.category_slug}`}
                className="group flex flex-col items-center p-2 transition-all duration-500 hover:bg-gray-50 hover:shadow-md border-2 border-gray-200"
              >
                <div className="relative group-hover:scale-105 transition-transform duration-500 overflow-hidden mb-3  ">
                  <Image
                    src={imageUrl}
                    alt={category.category_name}
                    width={200}
                    height={200}
                    className="object-cover transition-transform  w-full min-h-56 duration-300 group-hover:scale-105"
                   
                  />
                </div>
                <h3 className="text-sm  font-bold text-black text-center  transition-colors">
                  {category.category_name}
                </h3>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Categories;
