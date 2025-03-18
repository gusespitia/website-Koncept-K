"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const BrandsPage = () => {
  // Actualizamos la interfaz para que coincida con la estructura de la API
  interface Brand {
    id: number;
    brand_name: string;
    brand_visible: boolean;
    brand_description: string | null;
    brand_slug: string | null;
    brand_image: {
      url: string;
    };
    brand_category: Array<{
      category_name: string;
    }>;
  }

  interface Category {
    id: number;
    category_name: string;
    category_slug: string | null;
  }

  // Estados
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/brands?populate=brand_category"
        );
        const data = await response.json();
        if (data && data.data) {
          setBrands(data.data); // Guardamos todas las marcas
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories");
        const data = await response.json();
        if (data && data.data) {
          setCategories(data.data); // Guardamos todas las categorías
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  // Agrupar marcas por categoría
  const groupedBrands = categories.reduce((acc, category) => {
    // Filtra las marcas que pertenecen a esta categoría
    const filteredBrands = brands.filter((brand) =>
      brand.brand_category.some(
        (brandCategory) => brandCategory.category_name === category.category_name
      )
    );

    // Si hay marcas en esta categoría, las agregamos al acumulador
    if (filteredBrands.length > 0) {
      acc.push({
        categoryName: category.category_name,
        categorySlug: category.category_slug,
        brands: filteredBrands,
      });
    }
    return acc;
  }, [] as { categoryName: string; categorySlug: string | null; brands: Brand[] }[]);

  return (
    <div className="min-h-screen bg-[#EDBCA4] p-6">
      {groupedBrands.length > 0 ? (
        groupedBrands.map(({ categoryName, categorySlug, brands }) => (
          <section key={categoryName} className="mb-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">{categoryName}</h2>
            <div className="grid grid-cols-3 gap-6">
              {brands.map((brand) => (
                <div key={brand.id} className="grid justify-center items-center border p-4 rounded-md">
                  <Image
                    src={brand.brand_image?.url || "/logo.png"}
                    alt={brand.brand_name}
                    width={60}
                    height={60}
                    className="mr-2"
                  />
                  <Link href={`/merken/${brand.brand_slug}`}>
                  <span>{brand.brand_name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <p>No brands found for the selected categories.</p>
      )}
    </div>
  );
};

export default BrandsPage;
