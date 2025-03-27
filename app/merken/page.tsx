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
    <div className=" bg-[#EDBCA4] p-6 rounded-md">
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg mx-8 py-6 ">
        <h2 className="text-2xl font-bold text-center mb-4">Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-lg" />
              ))
            : brands.map((brand) => {
                const imageUrl = brand.brand_image?.url
                  ? brand.brand_image.url.startsWith("http")
                    ? brand.brand_image.url
                    : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
                  : "/logo.png";

                return (
                  <Link
                    href={`/merken/${brand.brand_slug}`}
                    className="text-center"
                    key={brand.id}
                  >
                    <div className="flex flex-col items-center border p-4 rounded-lg shadow-md bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
                      <Image
                        src={imageUrl}
                        alt={brand.brand_name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover shadow-xl hover:scale-110 transition-transform duration-300 h-24 w-24"
                      />
                      <h3 className="mt-3 text-lg font-semibold text-gray-900">
                        {brand.brand_name}
                      </h3>
                    </div>{" "}
                  </Link>
                );
              })}
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
