import Home from "./features";
import Categories from "./categories";
import Image from "next/image";
export default function Page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[minmax(340px,_auto)_80px_minmax(500px,_auto)] min-h-screen">
      {/* Sección Home */}
      <div className="row-start-1 row-end-2 col-span-1 lg:col-span-2">
        <Home />
      </div>

      {/* Sección Categorías */}
      <div className="row-start-2 row-end-3 col-span-1 lg:col-span-2">
        <Categories />
      </div>

      {/* Productos ocupa la tercera fila */}
      <div className="row-start-3 row-end-4 col-span-1 lg:col-span-2 p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Producten</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks2.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks2.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>  <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
            src="/dillysocks1.jpg"
            alt="Image 1"
            width={400}
            height={500}
            className="object-cover w-full h-auto transition-transform duration-300 transform hover:scale-110"
          />
          </div>
        </div>
        <div className="flex justify-center my-8">
          <button
            type="button"
            className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center gap-2"
            disabled
          >
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
              ></path>
            </svg>
            See more
          </button>
        </div>
      </div>
    </section>
  );
}
