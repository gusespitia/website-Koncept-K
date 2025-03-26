"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

// Interfaz para definir la estructura de los datos
interface Brand {
  id: number;
  brand_name: string;
  brand_slug: string;
  brand_description: string | null;
  brand_image?: {
    url: string;
  };
}

const Page: React.FC = () => {
  const params = useParams();
  const slug = (params.merken_slug as string) ?? "Decoratie";
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchMerken = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/brands?filters[brand_slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        if (data?.data) {
          setBrands(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchMerken();
  }, [slug]); // Se actualiza cuando cambia el slug

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Merken
        </h2>
        <div className="">
          {brands.map((brand) => {
            const imageUrl = brand.brand_image?.url
              ? brand.brand_image.url.startsWith("http")
                ? brand.brand_image.url
                : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
              : "/logo.png";

            return (
              <div
                key={brand.id}
                className="flex flex-col items-center border p-4 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Link href={`/merken/${brand.brand_slug}`} className="text-center">
                  <Image
                    src={imageUrl}
                    alt={brand.brand_name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover shadow-md hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    {brand.brand_name}
                  </h3>
                </Link>
                {brand.brand_description && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {brand.brand_description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
