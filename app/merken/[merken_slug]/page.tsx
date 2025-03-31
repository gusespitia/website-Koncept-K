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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerken = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/brands?filters[brand_slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        if (data?.data) {
          setLoading(true);
          setBrands(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchMerken();
  }, [slug]); // Se actualiza cuando cambia el slug

  return (
    <div className="bg-[var(--color-store)] p-6 rounded-md">
      <div className="container mx-auto ">
        {loading && (
          <div className="flex justify-center ">
            <button
              type="button"
              className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center gap-2"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                ></path>
              </svg>
              Loading...
            </button>
          </div>
        )}
        <div className="mx-8 ">
          {brands.map((brand) => {
            const imageUrl = brand.brand_image?.url
              ? brand.brand_image.url.startsWith("http")
                ? brand.brand_image.url
                : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
              : "/logo.png";

            return (
              <div
                key={brand.id}
                className="flex flex-col items-center border p-4 rounded-lg shadow-lg bg-white pb-14"
              >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                  {brand.brand_name}
                </h2>
                <Image
                  src={imageUrl}
                  alt={brand.brand_name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover shadow-md shadow-accent-foreground mb-8 h-30 w-30"
                />
                {brand.brand_description && (
                  <p className="text-sm/relaxed text-gray-900 mt-2 text-center">
                    {brand.brand_description}
                  </p>
                )}
              </div>
            );
          })}{" "}
          <Link href="/merken" className="flex ">
            <div className="bg-white p-4 rounded-lg shadow-lg flex  w-fit mx-auto my-8 hover:bg-gray-100 hover:scale-95 transution-all duration-700 ease-in-out cursor-pointer gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p className="font-semibold   hover:text-gray-800">Go back</p>
            </div>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
