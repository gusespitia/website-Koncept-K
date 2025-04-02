"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftToLine } from 'lucide-react';

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
      const controller = new AbortController(); // <- Mover aquí
      const timeoutId = setTimeout(() => controller.abort(), 5000); // <- Mover aquí
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?filters[product_category][category_slug][$eq]=${categorySlug}&populate=*`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data?.data.length > 0) 
          setProducts(data.data);
      } catch (error) {
        console.log(error);
        try {
          // Si falla, intenta con el backup (BACKEND_V2)
          const responseBackup = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/products?filters[product_category][category_slug][$eq]=${categorySlug}&populate=*`
          );
          const dataBackup = await responseBackup.json();
          if (dataBackup?.data) setProducts(dataBackup.data);
        } catch (errorBackup) {
          console.error("Error en ambos backends:", errorBackup);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]); // Se actualiza cuando cambia el slug
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-md shadow-lg  min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <p className="text-2xl font-bold mb-8 text-center text-[var(--color-store)]">
          {categorySlug.replace(/-/g, " ").toLocaleUpperCase()}
        </p>

        <div className="mx-8 "></div>
       
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
                         loading="lazy"
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

<div className="text-center ">
        <Link href="/" className="flex justify-center mt-4">
                  <button className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none hover:inset-shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    <ArrowLeftToLine />
                    Return to Home
                  </button>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
