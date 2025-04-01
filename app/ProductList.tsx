"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_image?: { url: string; name: string }[];
}

const ProductList = ({ categorySlug }: { categorySlug: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[category][category_slug][$eq]=${categorySlug}&populate=*`
        );
        const data = await response.json();
        if (data?.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const imageUrl = product.product_image?.[0]?.url
          ? product.product_image[0].url.startsWith("http")
            ? product.product_image[0].url
            : `${CLOUDINARY_BASE_URL}${product.product_image[0].url}`
          : "/logo.png";

        return (
          <Link
            key={product.id}
            href={`/products/${product.product_slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={product.product_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                  {product.product_name}
                </h3>
                <p className="text-lg font-bold text-[#8B4513] mt-2">
                  {formatPrice(product.product_price)}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;