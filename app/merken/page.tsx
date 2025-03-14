import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen bg-[#EDBCA4] p-6">
      {/* Section 1: Herenmode */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Herenmode</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">40Weft</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Anerkjendt</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Anthony Morato</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">GABBA</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Nowadays</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Profuomo</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">STROM</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">The Surfcar</span>
          </div>
        </div>
      </section>

      {/* Section 2: Schoenen & Accessoires */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Schoenen & Accessoires</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex justify-center items-center border p-4 rounded-md">
            <Link href="/merken/dillysocks">
          <Image
              src="/dillysocks.png"
              alt="Dilly Socks"
              width={60}
              height={60}
              className="mr-2"
            />
            <span className="font-bold cursor-pointer">Dilly Socks</span>
            </Link>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Melik Shoes</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">W6yz</span>
          </div>
        </div>
      </section>

      {/* Section 3: Cadeauartikelen & Decoratie */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Cadeauartikelen & Decoratie</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">AURA 3D</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Dock & Bay</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Designworks Collective</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Lumen</span>
          </div>
          <div className="flex justify-center items-center border p-4 rounded-md">
            <span className="font-bold">Quartier Libre</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;