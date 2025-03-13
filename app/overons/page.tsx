import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <h1 className="font-bold">Welkom bij Koncept K.</h1>
      <h1>Laten we onszelf even voorstellen</h1>
      <p>
        Welkom bij Koncept K., een unieke conceptstore in Berchem die herenmode, accessoires, decoratie
        en cadeau artikelen bij elkaar brengt. Als trotse 4de generatie in herenkleding hebben we jarenlange ervaring
        en passie opgebouwd voor het leveren van hoogwaardige producten die passen bij de trendy man. Onze zorgvuldig
        samengestelde selectie weerspiegelt onze toewijding aan stijl en duurzaamheid, zodat je iets bijzonders kunt
        vinden voor elke gelegenheid. Daarnaast vind je bij ons ook cadeau artikelen en decoratie voor zowel hem als haar.
        Ontdek de perfecte mix van mode en lifestyle bij Koncept K.
      </p>

      {/* Images at the bottom */}
      <div className="flex justify-center gap-4 mt-8">
        <Image width={300} height={300} src="/image1.jpg" alt="Image 1" className="w-75 h-75 object-fit rounded-full border-4 border-black" />
        <Image width={300} height={300} src="/image2.jpg" alt="Image 2" className="w-75 h-75 object-fit rounded-full border-4 border-black" />
      </div>
    </div>
  );
};

export default page;