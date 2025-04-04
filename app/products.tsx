"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleFadingPlus } from "lucide-react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_image?: [{ url: string; name: string }];
}

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "€0,00";
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const loadMoreProducts = useCallback(() => {
    setVisibleCount((prev) => prev + 10);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

      try {
        // Intenta con la API principal primero
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/products?populate=product_image`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data?.data.length > 0) setProducts(data.data);
      } catch (error) {
        console.log(error);
        try {
          // Si falla, intenta con el backup (BACKEND_V2)
          const responseBackup = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?populate=product_image`
          );
          const dataBackup = await responseBackup.json();
          if (dataBackup?.data) setProducts(dataBackup.data);
        } catch (errorBackup) {
          console.error("Error en ambos backends:", errorBackup);
        }
      } finally {
        clearTimeout(timeoutId); // Limpia el timeout
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Producten{" "}
      </h2>

      {products.length === 0 ? (
        <div className="h-auto flex items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center max-w-7xl mx-auto mb-8">
          <div className="bg-white p-12  text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mt-4">
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
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              Geen producten beschikbaar
            </h3>
            <p className="text-gray-500">
              Kom later terug voor onze nieuwste producten
            </p>{" "}
            <Link href="/" className="">
              <button className="w-fit mx-auto mt-8 flex gap-2  items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--color-store)] hover:shadow-accent-foreground hover:shadow-sm hover:text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-500">
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
                Terug
              </button>{" "}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.slice(0, visibleCount).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Link href={`/producten/${product.product_slug}`} passHref>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={
                        product.product_image?.[0]?.url
                          ? product.product_image[0].url.startsWith("http")
                            ? product.product_image[0].url
                            : `${CLOUDINARY_BASE_URL}${product.product_image[0].url}`
                          : "/logo.png"
                      }
                      alt={product.product_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {product.product_name}
                    </h3>
                    <p className="text-indigo-600 font-semibold">
                      {formatPrice(product.product_price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreProducts}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none hover:inset-shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <CircleFadingPlus />
                Ontdek meer
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Products;
