import React from "react";
import Image from "next/image";

const DillySocksPage = () => {
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
      <section className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Producten in de kijker</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex justify-center items-center border p-4 rounded-md">
            <Image
              src="/dillysocks1.jpg"
              alt="Dilly Socks Product 1"
              width={100}
              height={100}
              className="mr-4"
            />
            <span className="font-bold">Socks Style 1</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <Image
              src="/dillysocks2.jpg"
              alt="Dilly Socks Product 2"
              width={100}
              height={100}
              className="mr-4"
            />
            <span className="font-bold">Socks Style 2</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DillySocksPage;