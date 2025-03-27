"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  product_name: string;
  product_image?: [{ url: string; name: string }];
}

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/products?populate=product_image&filters[product_feature][$eq]=true#"
        );
        const data = await response.json();
        if (data?.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="w-full max-w-8xl mx-auto px-4 absolute inset-0">
      <h1 className="text-3xl font-bold mb-4 text-center -mt-3">
        Discover our new products
      </h1>
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
            Loading features...
          </button>
        </div>
      )}
      <Carousel
        orientation="horizontal"
        opts={{ loop: true, containScroll: "trimSnaps", dragFree: true }}
        plugins={[Autoplay({ delay: 6000 })]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex mx-auto">
          {products.slice(0).map((product) => {
            const imageUrl = product.product_image?.[0]?.url
              ? product.product_image[0].url.startsWith("http")
                ? product.product_image[0].url
                : `${CLOUDINARY_BASE_URL}${product.product_image[0].url}`
              : "/logo.png";

            return (
              <CarouselItem
                key={product.id}
                className="basis-1/7 transition-transform duration-500 hover:scale-105 cursor-pointer select-none w-[30%] min-w-[200px]"
                style={{ perspective: "1000px" }} // 🔥 Para efectos 3D
              >
                <div className="relative transform transition-transform hover:rotate-y-[15deg]">
                  {/* Imagen del producto */}
                  <Image
                    width={500}
                    height={500}
                    src={imageUrl}
                    priority
                    alt={product.product_name}
                    className="w-auto h-auto object-cover rounded-lg"
                  />
                  {/* Nombre del producto sobre la imagen */}
                  <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40">
                    <p className="text-white text-lg font-semibold text-center px-2 no-select cursor-pointer">
                      {product.product_name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Home;
