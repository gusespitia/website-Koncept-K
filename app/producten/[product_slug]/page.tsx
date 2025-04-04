"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftToLine } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

interface ProductColor {
  id: number;
  color_name: string;
  color_visible: boolean;
}

interface ProductSize {
  id: number;
  size_name: string;
}
interface ProductMaterial {
  id: number;
  material_type: string;
  material_visible: boolean;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_size?: ProductSize[];
  product_materials?: ProductMaterial[];
  product_description: string | string[];
  product_description_general?: string;
  product_image?: { url: string; name: string }[];
  product_colors?: ProductColor[];
}

const Page = () => {
  const params = useParams();
  const slug = params.product_slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formatPrice = (price: number | undefined) => {
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price || 0);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const controller = new AbortController();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?filters[product_slug][$eq]=${slug}&populate=*`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data?.data?.length > 0) {
          setProduct(data.data[0]);
        } else {
          // Fallback to secondary API
          const backupResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/products?filters[product_slug][$eq]=${slug}&populate=*`
          );
          const backupData = await backupResponse.json();
          setProduct(backupData?.data?.[0] || null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        const controller = new AbortController();
        clearTimeout(setTimeout(() => controller.abort(), 5000)); // Limpia el timeout
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* Image Skeleton */}
              <div className="w-full lg:w-1/2">
                <Skeleton className="aspect-square w-full rounded-lg" />
              </div>

              {/* Content Skeleton */}
              <div className="w-full lg:w-1/2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/3" />

                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Product not available
          </h3>
          <p className="text-gray-500 mb-4">
            Please check back later or browse our other products.
          </p>
          <Link href="/" className="inline-flex justify-center">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <ArrowLeftToLine size={16} />
              Back to store
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.product_image?.map((img) =>
    img.url.startsWith("http") ? img.url : `${CLOUDINARY_BASE_URL}${img.url}`
  ) || ["/placeholder-product.png"];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Product Header */}
          <div className="border-b border-gray-100 p-4 sm:p-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.product_name}
            </h1>
          </div>

          {/* Product Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery - Left Column */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6">
              {images.length > 1 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((imgUrl, index) => (
                      <CarouselItem key={index}>
                        <div
                          className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in group"
                          onClick={() => openLightbox(index)}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${product.product_name} - Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            priority={index === 0}
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            {index + 1}/{images.length}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 hidden sm:flex" />
                  <CarouselNext className="right-2 hidden sm:flex" />
                </Carousel>
              ) : (
                <div
                  className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in group"
                  onClick={() => openLightbox(0)}
                >
                  <Image
                    src={images[0]}
                    alt={product.product_name}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Product Details - Right Column */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
              {/* Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.product_price)}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start font-medium text-gray-500 mb-2">
                    <span>{product.product_description}</span>
                  </li>
                </ul>
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Key Features
              </h3>
              {/* Sizes */}
              {product.product_size && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Available sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.product_size.map((size) => (
                      <span
                        key={size.id}
                        className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors hover:scale-110"
                      >
                        {size.size_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <hr className="my-2" />
              {Array.isArray(product.product_materials) &&
                product.product_materials.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Available materials
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.product_materials?.map((material) => (
                        <span
                          key={material.id}
                          className="hover:scale-110 px-3 py-1.5 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          {material.material_type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              <hr className="my-2" />
              {/* Colors */}
              {Array.isArray(product.product_colors) &&
                product.product_colors.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Available colors
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {product.product_colors.map((color) => {
                        const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(
                          color.color_name
                        );
                        const colorName =
                          color.color_name.charAt(0).toUpperCase() +
                          color.color_name.slice(1);

                        return (
                          <div
                            key={color.id}
                            className="flex flex-col items-center group"
                          >
                            <div
                              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-gray-200 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md`}
                              style={{
                                backgroundColor: isHexColor
                                  ? color.color_name
                                  : color.color_name || "#cccccc",
                              }}
                              title={colorName}
                            />
                            <span className="mt-1 text-xs text-gray-500">
                              {colorName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Detailed Description */}
              {product.product_description_general && (
                <div className="prose prose-sm max-w-none text-gray-600">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Product details
                  </h4>
                  <ul className="space-y-2">
                    {product.product_description_general
                      .split("\n")
                      .filter((p) => p.trim() !== "")
                      .map((paragraph, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {paragraph}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <ArrowLeftToLine size={16} />
              Back to store
            </button>
          </Link>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
          <div className="relative w-full h-full">
            <Carousel opts={{ startIndex: selectedImageIndex }}>
              <CarouselContent>
                {images.map((imgUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-[70vh]">
                      <Image
                        src={imgUrl}
                        alt={`${product.product_name} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:left-4 bg-black/50 text-white hover:bg-black/70" />
              <CarouselNext className="right-2 sm:right-4 bg-black/50 text-white hover:bg-black/70" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
