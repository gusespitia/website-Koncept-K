"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftToLine } from "lucide-react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface Brand {
  id: number;
  brand_name: string;
  brand_slug: string;
  brand_description: string | null;
  brand_image?: {
    url: string;
  };
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_description: string;
  product_description_general?: string;
  product_image?: { url: string; name: string }[];
}

const Page: React.FC = () => {
  const params = useParams();
  const slug = (params.merken_slug as string) ?? "Decoratie";
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "€0,00";
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const loadMoreProducts = useCallback(() => {
    setVisibleCount((prev) => prev + 8);
  }, []);

  const fetchWithFallback = async (url: string, backupUrl: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Primary API failed, trying backup: ${error}`);
      const responseBackup = await fetch(backupUrl);
      if (!responseBackup.ok)
        throw new Error(`Backup API failed: ${responseBackup.status}`);
      return await responseBackup.json();
    } finally {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch brand data with fallback
        const brandData = await fetchWithFallback(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?filters[brand_slug][$eq]=${slug}&populate=*`,
          `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/brands?filters[brand_slug][$eq]=${slug}&populate=*`
        );

        // Fetch products data with fallback
        const productData = await fetchWithFallback(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?filters[product_brand][brand_slug][$eq]=${slug}&populate=*`,
          `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/products?filters[product_brand][brand_slug][$eq]=${slug}&populate=*`
        );

        if (brandData?.data) setBrands(brandData.data);
        if (productData?.data) setProducts(productData.data);
      } catch (error) {
        console.error("All API attempts failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand Section */}
        {brands.map((brand) => {
          const imageUrl = brand.brand_image?.url
            ? brand.brand_image.url.startsWith("http")
              ? brand.brand_image.url
              : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
            : "/logo.png";

          return (
            <div key={brand.id} className="mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <div className="h-full flex items-center justify-center p-8">
                      <Image
                        src={imageUrl}
                        alt={brand.brand_name}
                        width={200}
                        height={200}
                        className="rounded-full object-cover h-48 w-48 shadow-lg"
                        priority
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {brand.brand_name}
                    </h1>
                    {brand.brand_description && (
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {brand.brand_description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Products Section */}
        <section className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden p-4 -mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Producten
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Geen producten gevonden</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
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
                    Ontdek meer
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Back Button */}
        <div className="text-center ">
        <Link href="/merken" className="flex justify-center mt-4">
                  <button className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none hover:inset-shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    <ArrowLeftToLine />
                    Terug
                  </button>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
