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

interface Brand {
  id: number;
  brand_name: string;
  brand_image?: { url: string; name: string };
}

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image";

const Home = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/brands?populate=brand_image"
        );
        const data = await response.json();
        if (data?.data) {
          setBrands(data.data);
          console.log(data.data);
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
    <section className="w-full max-w-8xl mx-auto px-4  row-start-1 col-span-2">
      <h1 className="text-center text-3xl font-bold">
        Discover our brands
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
        opts={{
          loop: true,
          align: "center", // Centra los elementos
          slidesToScroll: "auto",
          containScroll: "keepSnaps", // Evita cortar elementos
          dragFree: true,
        }}
        plugins={[Autoplay({ delay: 6000 })]}
        className="w-f overflow-visible mx-auto"
      >
        <CarouselContent className="flex mx-auto">
          {brands.slice(0).map((brand) => {
            const imageUrl = brand.brand_image?.url
              ? brand.brand_image.url.startsWith("http")
                ? brand.brand_image.url
                : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}`
              : "/logo.png";

            return (
              <CarouselItem
                key={brand.id}
                className="basis-1/7 transition-transform duration-500 hover:scale-105 cursor-pointer select-none w-[30%] min-w-[200px]"
                style={{ perspective: "1000px" }} // 🔥 Para efectos 3D
              >
                <div className="relative transform transition-transform flex flex-col items-center bg-white rounded-lg shadow-lg w-full mx-auto my-4 hover:bg-gray-50 hover:scale-102 transution-all duration-700 ease-in-out cursor-pointer p-2 ">
                  {/* Imagen del producto */}
                  <Image
                    width={300}
                    height={200}
                    src={imageUrl}
                    priority
                    
                    alt={brand.brand_name}
                    className="w-30 h-20 object-contain rounded-lg"
                  />
                  {/* Nombre del producto sobre la imagen */}
                  <div className="mx-auto mt-1">
                    <p className="text-black text-sm font-semibold no-select cursor-pointer">
                      {brand.brand_name}
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
