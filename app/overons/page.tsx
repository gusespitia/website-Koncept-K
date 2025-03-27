import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-[#EDBCA4] flex flex-col lg:grid lg:grid-cols-2 items-start p-4 lg:p-4 gap-4 rounded-md ">
      {/* Main Image on the left (for larger screens) */}
      <div className="hidden lg:flex justify-center items-center row-span-2 pr-8 -ml-2 ">
        <Image
          width={800}
          height={900}
          src="/image3.jpg"
          alt="Image 3"
          className="w-full max-w-md lg:max-w-lg object-cover rounded-2xl  shadow-md shadow-accent-foreground"
        />
      </div>

      {/* Text Box */}
      <div className="bg-white p-6 md:p-6 rounded-lg shadow-lg max-w-2xl text-center lg:text-left -ml-44 animate-fade-in transform duration-150 transition-all ">
        <h1 className="font-bold text-3xl md:text-4xl mb-6">
          Welkom bij Koncept K.
        </h1>
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Laten we onszelf even voorstellen
        </h3>
        <p className="text-gray-700 leading-relaxed">
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

      {/* Images at the bottom (Stack on mobile, inline on larger screens) */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-6 lg:mt-0 col-start-2 ">
        <Image
          width={300}
          height={300}
          src="/image1.jpg"
          alt="Image 1"
          className="w-30 h-30 md:w-50 md:h-50 object-cover rounded-full shadow-md shadow-accent-foreground animate-in transform duration-750 transition-all"
        />
        <Image
          width={300}
          height={300}
          src="/image2.jpg"
          alt="Image 2"
          className="w-30 h-30 md:w-50 md:h-50 object-cover rounded-full shadow-md shadow-accent-foreground"
        />
      </div>
    </div>
  );
};

export default Page;
