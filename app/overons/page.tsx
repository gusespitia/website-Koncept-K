import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 items-start p-4 lg:p-6 gap-2 lg:grid-rows-[380px_minmax(400px,0.8fr)_10px] min-h-screen py-8 px-4 sm:px-6 lg:px-8 rounded-md shadow-2xl bg-[#EDBCA4]/20 select-none">
      {/* Imagen principal en pantallas grandes */}
      <div className="hidden lg:flex justify-center items-center row-span-2">
        <Image
          width={500}
          height={700}
          src="/image3.jpg"
          alt="Image 3"
          loading="lazy"
          className="w-full h-auto max-h-[100vh] max-w-md lg:max-w-lg object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Caja de texto (overlapping the image) */}
      <div className="bg-white p-12 md:p-14 rounded-lg shadow-lg w-[950px] text-center lg:text-left absolute lg:top-[10%] lg:left-[50%] lg:transform lg:-translate-x-[25%] z-10">
        <h1 className="text-4xl md:text-5xl mb-6 text-center">
          Welkom bij <span className="font-bold">K</span>oncept{" "}
          <span className="font-bold">K.</span>
        </h1>
        <p className="text-gray-700 leading-snug text-m text-justify">
          Welkom bij Koncept K., een unieke conceptstore in Berchem die
          herenmode, accessoires, decoratie en cadeau artikelen bij elkaar
          brengt. Als trotse 4de generatie in herenkleding hebben we jarenlange
          ervaring en passie opgebouwd voor het leveren van hoogwaardige
          producten die passen bij de trendy man. Onze zorgvuldig samengestelde
          selectie weerspiegelt onze toewijding aan stijl en duurzaamheid, zodat
          je iets bijzonders kunt vinden voor elke gelegenheid. Daarnaast vind
          je bij ons ook cadeau artikelen en decoratie voor zowel hem als haar.
          Ontdek de perfecte mix van mode en lifestyle bij Koncept K.
        </p>
      </div>

      {/* Bottom images - Keeping them side by side */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-90 lg:mt-90 z-10 relative">
        {/* First Image */}
        <div className="flex items-center justify-center relative -mt-25">
          <Image
            width={500}
            height={500}
            src="/image1.jpg"
            alt="Image 1"
            loading="lazy"
            className="w-75 h-75 object-cover rounded-full shadow-md"
          />
        </div>

        {/* Second Image - Move it more down */}
        <div className="flex items-center justify-center relative mt-50">
          {" "}
          {/* Increased margin-top here for the second image */}
          <Image
            width={500}
            height={500}
            src="/image2.jpg"
            alt="Image 2"
            loading="lazy"
            className="w-75 h-75 object-cover rounded-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
