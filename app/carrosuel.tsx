// carrusel.tsx
"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Carrusel = () => {
  const brands = [
    { id: 1, picture: "/store1.jpg", name: "Store 1" },
    { id: 2, picture: "/store2.jpg", name: "Store 2" },
    { id: 3, picture: "/store3.jpg", name: "Store 3" },
    { id: 4, picture: "/store4.jpg", name: "Store 4" },
    { id: 5, picture: "/store5.jpg", name: "Store 5" },
    { id: 6, picture: "/store6.jpg", name: "Store 6" },
    { id: 7, picture: "/store7.jpg", name: "Store 7" },
  ];

  if (!brands) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          loop: true,
          align: "center",
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({ delay: 9000 })]}
        className="w-full"
      >
        <CarouselContent>
          {brands.map((brand) => (
            <CarouselItem key={brand.id} className="basis-full">
              <div className="relative w-full h-[80vh] min-h-[400px]">
                <Image
                  src={brand.picture}
                  alt={brand.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex absolute left-4" />
        <CarouselNext className="hidden md:flex absolute right-4" />
      </Carousel>

 
    </div>
  );
};

export default Carrusel;