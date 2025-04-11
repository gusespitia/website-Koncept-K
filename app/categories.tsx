"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";
const DEFAULT_PLACEHOLDER = "/placeholder-category.png";

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
  const [retrying, setRetrying] = useState(false);

  const fetchCategories = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories?populate=category_image`,
        { signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data?.length > 0) {
        setCategories(data.data);
        return;
      }

      throw new Error("No categories found in primary API");
    } catch (primaryError) {
      if (primaryError instanceof Error) {
        if (primaryError.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        console.log("Trying backup API...", primaryError.message);
      }

      try {
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
        if (backupError instanceof Error) {
          console.error("Both APIs failed:", backupError.message);
          throw backupError;
        } else {
          console.error("Unexpected error in backup API", backupError);
          throw new Error("Unexpected error in backup API");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetchCategories(controller.signal).catch((error) => {
      if (error instanceof Error) {
        setError(
          error.message || "Failed to load categories. Please try again later."
        );
      } else {
        setError("Failed to load categories. Please try again later.");
      }
    });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await fetchCategories();
    } catch (error) {
      if (error instanceof Error) {
        setError(
          error.message || "Failed to load categories. Please try again later."
        );
      } else {
        setError("Failed to load categories. Please try again later.");
      }
    } finally {
      setRetrying(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
        <Alert variant="destructive" className="max-w-md mb-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleRetry} disabled={retrying}>
          {retrying ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Try Again"
          )}
        </Button>
      </div>
    );
  }

  const getImageUrl = (category: Category) => {
    if (!category.category_image?.url) return DEFAULT_PLACEHOLDER;
    return category.category_image.url.startsWith("http")
      ? category.category_image.url
      : `${CLOUDINARY_BASE_URL}${category.category_image.url}`;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <hr className="mb-10 border-t border-gray-200" />
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.category_slug}`}
              className="group flex flex-col items-center p-3 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-3">
                <Image
                  src={getImageUrl(category)}
                  alt={category.category_name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
              </div>
              <h3 className="text-sm font-semibold text-center text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                {category.category_name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
