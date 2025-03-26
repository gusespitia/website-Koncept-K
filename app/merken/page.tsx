"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dcs91nwxd/image"; // Reemplaza con tu Cloud Name

const BrandsPage = () => {
  interface Brand {
    id: number;
    brand_name: string;
    brand_visible: boolean;
    brand_description: string | null;
    brand_slug: string;
    brand_image: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
        medium?: { url: string };
      };
      provider: string;
    };
  }

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/brands?populate=brand_image"
        );
        const data = await response.json();
        console.log("API Response:", data); // 👀 Verifica qué URLs devuelve Strapi
        if (data && data.data) {
          setBrands(data.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDBCA4] p-6">
      {brands.length > 0 ? (
        <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Brands</h2>
          <div className="grid grid-cols-3 gap-6">
            {brands.map((brand) => {
              // Asegurar URL de Cloudinary
              const imageUrl = brand.brand_image?.url
                ? brand.brand_image.url.startsWith("http")
                  ? brand.brand_image.url // Si ya es una URL completa, úsala
                  : `${CLOUDINARY_BASE_URL}${brand.brand_image.url}` // Si es relativa, conviértela
                : "/logo.png";
              console.log(imageUrl);

              return (
                <div
                  key={brand.id}
                  className="grid justify-center items-center border p-4 rounded-md gap-1"
                > <Link href={`/merken/${brand.brand_slug}`}>
                  <Image
                    src={imageUrl}
                    alt={brand.brand_name}
                    width={60}
                    height={60}
                    className=" rounded-full shadow-md shadow-accent-foreground object-cover h-auto w-auto mb-2 hover:scale-3d hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                 
                    <span>{brand.brand_name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <p>No brands found.</p>
      )}
    </div>
  );
};

export default BrandsPage;
