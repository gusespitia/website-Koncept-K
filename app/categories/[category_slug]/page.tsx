"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_description: string;
  product_category: string;
  product_image?: [{ url: string; name: string }];
}

const Page: React.FC = () => {
  const params = useParams();
  const categorySlug = (params.category_slug as string) ?? "decoratie";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "€0,00";
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}products?filters[product_category][category_slug][$eq]=${categorySlug}&populate=*`
        );
        const data = await response.json();
        if (data?.data) {
          setLoading(true);
          setProducts(data.data);
          console.log(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchProducts();
  }, [categorySlug]); // Se actualiza cuando cambia el slug

  return (
    <div className="bg-white rounded-md shadow-lg  min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <p className="text-2xl font-bold mb-8 text-center text-[var(--color-store)]">
          {categorySlug.replace(/-/g, " ").toLocaleUpperCase()}
        </p>

        <div className="mx-8 "></div>
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
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Sorry no products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => {
              const imageUrl = product.product_image?.[0].url
                ? product.product_image?.[0].url.startsWith("http")
                  ? product.product_image?.[0].url
                  : `${CLOUDINARY_BASE_URL}${product.product_image?.[0].url}`
                : "/logo.png";

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl  transition-transform duration-600 transform hover:scale-105 cursor-pointer flex flex-col"
                >
                  {" "}
                  <Link href={`/producten/${product.product_slug}`}>
                    <div className="relative w-full h-56">
                      <Image
                        src={imageUrl}
                        alt={product.product_name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h2 className="text-sm font-semibold text-gray-900 truncate mb-1">
                        {product.product_name}
                      </h2>

                      <p className="text-xs  text-center ">
                        {formatPrice(product.product_price)}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 rounded-lg shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
