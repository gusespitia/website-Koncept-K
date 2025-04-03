import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#EDBCA4]/20 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start lg:gap-6">
          {/* Imagen principal - solo visible en desktop */}
          <div className="hidden lg:block lg:top-8">
            <div className="relative min-h-[800px] h-full rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/image3.jpg"
                alt="Koncept K. store"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="relative -mt-14 ">
            {/* Caja de texto - ahora responsive sin position absolute problemático */}
            <div className="bg-white px-6 sm:px-8 md:px-10 rounded-xl shadow-lg lg:mt-20 mb-8 lg:mb-12 py-4 -ml-30">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-6">
                Welkom bij <span className="font-bold">K</span>oncept{" "}
                <span className="font-bold">K.</span>
              </h1>
              <p className="text-gray-700 text-base sm:text-sm leading-relaxed text-justify">
                Welkom bij Koncept K., een unieke conceptstore in Berchem die
                herenmode, accessoires, decoratie en cadeau artikelen bij elkaar
                brengt. Als trotse 4de generatie in herenkleding hebben we
                jarenlange ervaring en passie opgebouwd voor het leveren van
                hoogwaardige producten die passen bij de trendy man. Onze
                zorgvuldig samengestelde selectie weerspiegelt onze toewijding
                aan stijl en duurzaamheid, zodat je iets bijzonders kunt vinden
                voor elke gelegenheid. Daarnaast vind je bij ons ook cadeau
                artikelen en decoratie voor zowel hem als haar. Ontdek de
                perfecte mix van mode en lifestyle bij Koncept K.
              </p>
            </div>

            {/* Imágenes inferiores - ahora posicionadas correctamente */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 bottom-0 left-0 right-0 ">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden">
                <Image
                  src="/image1.jpg"
                  alt="Product showcase 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden">
                <Image
                  src="/image2.jpg"
                  alt="Product showcase 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;