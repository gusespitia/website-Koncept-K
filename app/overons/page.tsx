import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-[var(--color-store)] grid grid-cols-1 lg:grid-cols-2 items-start p-4 lg:p-6 gap-2 rounded-md lg:grid-rows-[380px_minmax(400px,0.8fr)_10px] ">
      
      {/* Imagen principal en pantallas grandes */}
      <div className="hidden lg:flex justify-center items-center row-span-2">
        <Image
          width={500}
          height={700}
          src="/image3.jpg"
          alt="Image 3"
          className="w-full h-auto max-h-[100vh] max-w-md lg:max-w-lg object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Caja de texto */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-2xl text-center lg:text-lef -ml-40">
        <h1 className="text-3xl md:text-4xl mb-4 text-center">
          Welkom bij <span className="font-bold">K</span>oncept <span className="font-bold">K.</span>
        </h1>
        <p className="text-gray-700 leading-snug text-sm  text-justify">
          Welkom bij Koncept K., een unieke conceptstore in Berchem die herenmode, accessoires, decoratie en cadeau artikelen bij elkaar brengt. 
          Als trotse 4de generatie in herenkleding hebben we jarenlange ervaring en passie opgebouwd voor het leveren van hoogwaardige producten 
          die passen bij de trendy man. Onze zorgvuldig samengestelde selectie weerspiegelt onze toewijding aan stijl en duurzaamheid, zodat 
          je iets bijzonders kunt vinden voor elke gelegenheid. Daarnaast vind je bij ons ook cadeau artikelen en decoratie voor zowel hem als haar. 
          Ontdek de perfecte mix van mode en lifestyle bij Koncept K.
        </p>
      </div>

      {/* Imágenes inferiores */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:mt-0">
        <Image
          width={200}
          height={200}
          src="/image1.jpg"
          alt="Image 1"
          className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-full shadow-md animate-in transition-all"
        />
        <Image
          width={200}
          height={200}
          src="/image2.jpg"
          alt="Image 2"
          className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-full shadow-md"
        />
      </div>
    </div>
  );
};

export default Page;
