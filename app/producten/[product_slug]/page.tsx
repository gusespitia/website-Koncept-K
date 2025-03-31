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
  product_image?: [{ url: string; name: string }];
}

const Page: React.FC = () => {
  const params = useParams();
  const slug = params.product_slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[product_slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        if (data?.data) {
          setProducts(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="bg-[#EDBCA4] min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {products.map((product) => {
              const imageUrl = product.product_image?.[0]?.url
                ? product.product_image[0].url.startsWith("http")
                  ? product.product_image[0].url
                  : `${CLOUDINARY_BASE_URL}${product.product_image[0].url}`
                : "/logo.png";

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
                >
                  {/* Product Header */}
                  <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {product.product_name}
                    </h1>
                  </div>

                  {/* Product Content */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative aspect-square">
                      <Image
                        src={imageUrl}
                        alt={product.product_name}
                        fill
                        className="rounded-lg object-cover shadow-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">
                          €{product.product_price}
                        </p>
                      </div>

                      {product.product_description && (
                        <div className="prose max-w-none">
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Product Details
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {product.product_description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Back Button */}
            <div className="flex justify-center mt-12">
              <Link
                href="/merken"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600 group-hover:-translate-x-1 transition-transform"
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
                <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                  Back to Brands
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;