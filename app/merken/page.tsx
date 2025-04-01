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
        const response = await fetch(
          "http://localhost:1337/api/brands?populate=brand_image"
        );
        const data = await response.json();
        if (data?.data) {
          setBrands(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 rounded-md bg-white shadow-2xl shadow-[#EDBCA4]/70">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-center text-3xl font-bold">
            Our Brands
          </h1>
          <p className="my-3 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the premium brands we collaborate with
          </p>
        </div>

        {/* Brands Grid */}
        <div className=" p-4 sm:p-8 rounded-xl ">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-3 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 ">
              {brands
                .slice()
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
                      className="group"
                    >
                      <div className="flex flex-col items-center p-2  border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 h-30 w-30 ">
                        <div className="relative w-full aspect-square mb-4 overflow-hidden ">
                          <Image
                            src={imageUrl}
                            alt={brand.brand_name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105 "
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        </div>
                      </div>
                      <p className="text-xs font-normal text-gray-700 text-center group-hover:font-semibold transition-all mt-1  duration-500">
                        {brand.brand_name}
                      </p>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!loading && brands.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-500">No brands available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsPage;
