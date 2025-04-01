"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface Brand {
  id: number;
  brand_name: string;
  brand_visible: boolean;
  brand_description: string | null;
  brand_slug: string;
  brand_image?: {
    url: string;
  };
}

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}brands?populate=brand_image`
        );
        const { data } = await response.json();
        setBrands(data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the exceptional brands we proudly collaborate with to bring you quality products
          </p>
        </div>

        {/* Brands Grid */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-4 rounded" />
                </div>
              ))}
            </div>
          ) : brands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {brands
                .sort((a, b) => a.brand_name.localeCompare(b.brand_name))
                .map((brand) => {
                  const imageUrl = brand.brand_image?.url
                    ? brand.brand_image.url.startsWith("http")
                      ? brand.brand_image.url
                      : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
                    : "/logo.png";

                  return (
                    <Link
                      href={`/merken/${brand.brand_slug}`}
                      key={brand.id}
                      className="group transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 h-full">
                        <div className="relative w-full aspect-square mb-4">
                          <Image
                            src={imageUrl}
                            alt={brand.brand_name}
                            fill
                            className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            priority={false}
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                          {brand.brand_name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No brands available</h3>
              <p className="text-gray-500">Check back later for our brand collaborations</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BrandsPage;