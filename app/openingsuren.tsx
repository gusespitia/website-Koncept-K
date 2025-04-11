import React from 'react'
import Image from "next/image";

const Openingsuren = () => {
  return (

  <div className="max-w-7xl mx-auto px-4">
        <hr className="my-0 border-t border-gray-200" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="order-2 md:order-1">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-800">
              Openingsuren
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center">
                <span className="inline-block w-6 mr-2">📍</span>
                Statiestraat 135, 2600 Berchem
              </p>
              <p className="flex items-center">
                <span className="inline-block w-6 mr-2">🕖</span>
                Openingsuren: van woensdag tot zaterdag 11:00 - 18:00
              </p>
              <p className="flex items-center">
                <span className="inline-block w-6 mr-2">🛍️</span>
                Elke eerste zondag van de maand is koopzondag. De winkel zal dan
                geopend zijn van 13:00 tot 18:00.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs h-48 md:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/store1.jpg"
                alt="Nuestra tienda"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Openingsuren