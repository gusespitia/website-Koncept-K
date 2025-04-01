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

  return (
    <section className="row-start-3 row-end-4 col-span-1 lg:col-span-2 mb-28">
      <h1 className="text-center text-3xl font-bold mb-6 ">
        Productos
      </h1>

      {/* Contenedor relativo para el botón absoluto */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading ? (
            <p>Cargando...</p>
          ) : products.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            products.slice(0, visibleCount).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer flex flex-col"
              >
                <Link href={`/producten/${product.product_slug}`}>
                  <div className="relative w-full h-56">
                    <Image
                      src={
                        product.product_image?.[0]?.url
                          ? product.product_image[0].url.startsWith("http")
                            ? product.product_image[0].url
                            : `${CLOUDINARY_BASE_URL}${product.product_image[0].url}`
                          : "/logo.png"
                      }
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

                    {/* Botón "Ver más" */}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Botón posicionado absolutamente en la parte inferior */}
        {!loading && visibleCount < products.length && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full pt-8">
            <button
              onClick={loadMoreProducts}
              className="bg-[var(--color-store)] text-gray-600 hover:text-gray-900 duration-200 text-md  uppercase  px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              See More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
