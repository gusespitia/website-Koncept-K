import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className=" bg-[#EDBCA4]/20 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  items-start lg:gap-6 ">
          {/* Imagen principal - solo visible en desktop */}
          <div className="hidden lg:top-8 sm:block">
            <div className="relative min-h-[900px]  h-full rounded-2xl shadow-lg overflow-hidden">
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
          <div className="relative lg:-mt-14 md:mt-4">
            {/* Caja de texto - ahora responsive sin position absolute problemático */}
            <div className="bg-white  px-6 sm:px-8 md:px-10 rounded-xl shadow-lg lg:mt-20 md:mb-6 lg:mb-12 py-4 sm:py-6 md:p-6  lg:py-10 md:-ml-14 lg:-ml-30  ">
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
            <div className="flex  justify-center items-center gap-6 sm:gap-8 md:gap-10 bottom-0 left-0 right-0 flex-row py-16">
              <div className="relative w-50 h-50 sm:w-50 sm:h-50 md:w-60 md:h-40 lg:w-60 lg:h-60 rounded-full shadow-lg overflow-hidden">
                <Image
                  src="/image1.jpg"
                  alt="Product showcase 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, (max-width: 700px) 50vw, 33vw"
                />
              </div>
              <div className="relative w-50 h-50 sm:w-50 sm:h-50 md:w-60 md:h-40 lg:w-60 lg:h-60 rounded-full shadow-lg overflow-hidden">
                <Image
                  src="/image2.jpg"
                  alt="Product showcase 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, (max-width: 700px) 50vw, 33vw"
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