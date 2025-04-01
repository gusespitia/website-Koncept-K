"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [visibleCount, setVisibleCount] = useState(5);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "€0,00";
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const loadMoreProducts = useCallback(() => {
    setVisibleCount((prev) => prev + 5);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}products?populate=product_image`
        );
        const data = await response.json();
        if (data?.data) setProducts(data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
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
      Productos
    </h2>

    {products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-500">Sorry , no products found</p>
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
                    priority={false}
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
          <div className="mt-10 text-center">
            <button
              onClick={loadMoreProducts}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              See More
            </button>
          </div>
        )}
      </>
    )}
  </section>
  );
};

export default Products;
