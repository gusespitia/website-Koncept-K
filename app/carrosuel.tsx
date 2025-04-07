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
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="relative">
        <Carousel
          opts={{
            loop: true,
            align: "center",
            slidesToScroll: 1,
          }}
          plugins={[Autoplay({ delay: 9000 })]}
          className="w-full  mx-auto"
        >
          <CarouselContent>
            {brands.map((brand) => (
              <CarouselItem key={brand.id} className="basis-full">
               
                  <div className="flex flex-col items-center  bg-white rounded-sm shadow-md hover:shadow-md transition-shadow duration-300 mx-2">
                    <div className="relative w-full h-96 select-none cursor-pointer">
                      <Image
                        src={brand.picture}
                        alt={brand.name}
                        fill
                        className="object-cover rounded-sm w-full h-full"
                      />
                    </div>
                    <div className="mt-4 text-center"></div>
                  </div>
              
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute left-0 -translate-x-8" />
          <CarouselNext className="hidden md:flex absolute right-0 translate-x-8" />
        </Carousel>
      </div>
      <hr className="my-12 border-t border-gray-200 max-w-7xl mx-auto mt-12"/>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
      <div className="order-2 md:order-1">       
    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-800">Openingsuren</h3>
    <div className="space-y-2 text-gray-600">
      <p className="flex items-center">
        <span className="inline-block w-6 mr-2">📅</span>
        Woensdag tot Zaterdag: 11:00 - 18:00
      </p>
    
      <p className="flex items-center">
        <span className="inline-block w-6 mr-2">🚫</span>
        Zondag, Maandag en Dinsdag: Gesloten
      </p>
    </div>
  </div>
  
  <div className="order-1 md:order-2 flex justify-center md:justify-end">
    <div className="relative w-full max-w-xs h-48 md:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image 
        src="/store1.jpg" 
        alt="Nuestra tienda" 
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  </div>
</div>
    </section>
  );
};

export default Carrusel;
