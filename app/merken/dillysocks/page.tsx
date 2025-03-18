"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const DillySocksPage = () => {
  interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    category_id: number;
    attributes: {
      category_name: string;
    };
  }
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories");
        const data = await response.json();
        if (data.data) {
          setProducts(data.data);    
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDBCA4] p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Dilly Socks</h1>

      {/* Brand Information Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Over Dilly Socks</h2>

        <div className="flex justify-center items-center mb-6">
          {/* Displaying the Dilly Socks Logo/Image */}
          <Image
            src="/dillysocks.png"
            alt="Dilly Socks"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>

        <p>
          Dilly Socks is een leuke en trendy merk dat hoogwaardige sokken aanbiedt voor mannen en vrouwen.
          Onze sokken zijn ontworpen met levendige kleuren en patronen, perfect om een vleugje stijl aan
          elke outfit toe te voegen. Of je nu op zoek bent naar iets gedurfd en speels of subtiel en
          stijlvol, Dilly Socks heeft voor jou de perfecte sokken.
        </p>

        <p className="mt-4">
          Ontdek ons assortiment comfortabele, duurzame en modieuze sokken in verschillende ontwerpen.
          Wij geloven dat zelfs het kleinste accessoire een statement kan maken.
        </p>
      </section>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-bold text-center mb-4">Producten in de kijker</h2>
      <section className="mt-8 bg-white p-6 rounded-lg shadow-lg grid grid-cols-4">
        {/* Map over the products */}
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <ul key={product.id} className="justify-start mb-6">
                {/* Accede a product.attributes.category_name para mostrar el nombre */}
                <li>{product.attributes.category_name}</li>               
              </ul>
            ))
          ) : (
            <p>No products available</p> // Muestra un mensaje si no hay productos
          )}
        </div>
      </section>
    </div>
  );
};

export default DillySocksPage;
