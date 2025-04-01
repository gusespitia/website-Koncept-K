"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  documentId?: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_description: string;
  product_description_general?: string;
  product_image?: { url: string; name: string }[];
  product_colors?: ProductColor[];
}

const Page = () => {
  const params = useParams();
  const slug = params.product_slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "€0,00";
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[product_slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        if (data?.data?.length > 0) {
          setProduct(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <Skeleton className="aspect-square w-full rounded-lg" />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">Product Not Found</h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
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
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const images = product.product_image?.map((img) =>
    img.url.startsWith("http") ? img.url : `${CLOUDINARY_BASE_URL}${img.url}`
  ) || ["/logo.png"];

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Product Header */}
          <div className="border-b border-gray-200 p-6 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[var(--color-store)]">
              {product.product_name}
            </p>
          </div>

          {/* Product Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-1/3 p-6 ">
              {images.length > 1 ? (
                <Carousel className="w-full ">
                  <CarouselContent>
                    {images.map((imgUrl, index) => (
                      <CarouselItem key={index}>
                        <div
                          className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in group "
                          onClick={() => openLightbox(index)}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${product.product_name} - Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw "
                            priority={index === 0}
                          />
                          <div className="absolute bottom-1 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            {index + 1}/{images.length}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1 hidden sm:flex" />
                  <CarouselNext className="right-1 hidden sm:flex" />
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
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-6  border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="mb-2 ">
                <p className="text-3xl font-bold text-gray-900 hover:text-[var(--color-store)] cursor-pointer transition-all duration-500 animate-out select-none">
                  {formatPrice(product.product_price)}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 font-normal text-sm mb-4">
                  {product.product_description}
                </ul>
                <div className={"border-b border-gray-200"}>
                  <p className="text-sm mb-1">Available in</p>
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {/* Contenedor flexible con espacio entre elementos */}
                    {product.product_colors?.map((color) => (
                      <div
                        key={color.id}
                        className="flex items-center space-x-2 mb-3"
                      >
                        {/* Círculo de color */}
                        <div
                          className={`h-8 w-8 rounded-full border border-gray-300 shadow-md flex-shrink-0 hover:scale-x-105 transition-transform duration-300 ease-in-out hover:shadow-accent-foreground`}
                          style={{
                            backgroundColor: color.color_name,
                            // Opcional: si color_name es texto y no código HEX:
                            ...(/^#([0-9A-F]{3}){1,2}$/i.test(color.color_name)
                              ? {}
                              : {
                                  backgroundColor: color.color_name,
                                }),
                          }}
                          title={color.color_name.charAt(0).toUpperCase() + color.color_name.slice(1).toLowerCase()}
                        ></div>

                       
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              {product.product_description_general && (
                <div className="prose max-w-none text-gray-600 text-sm">
                  <ul className="space-y-2">
                    {product.product_description_general
                      .split("\n")
                      .filter((p) => p.trim() !== "")
                      .map((paragraph, index) => (
                        <li
                          key={index}
                          className="text-gray-600 flex items-start gap-2"
                        >
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5"
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
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-white hover:bg-gray-100 rounded-lg shadow-sm text-gray-700 font-medium transition-colors"
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
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-white/80 border-none">
          <div className="relative w-full h-full ">
            <Carousel
              className="w-full "
              opts={{ startIndex: selectedImageIndex }}
            >
              <CarouselContent>
                {images.map((imgUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square ">
                      <Image
                        src={imgUrl}
                        alt={`${product.product_name} - Image ${index + 1}`}
                        fill
                        className="object-contain "
                        sizes="100vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-black/50 text-white hover:bg-black/70" />
              <CarouselNext className="right-4 bg-black/50 text-white hover:bg-black/70" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
