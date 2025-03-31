import Features from "./features";
import Categories from "./categories";
import Products from "./products";

export default function Page() {
  return (
    <main className="min-h-screen ">
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[minmax(200px,_auto)_60px_minmax(500px,_auto)]  gap-0">
        {/* Sección Hero con Features (full width) */}
        <section className="col-span-full py-4 px-4 sm:px-4 lg:px-4 ">
          <Features />
        </section>

        {/* Separador decorativo */}
        <div className="" />

        {/* Sección Principal (Categorías + Productos) */}
        <section className="col-span-full bg-white px-6 py-4 space-y-4 shadow-2xl rounded-md mb-6">
          {/* Categorías */}
             {/* Separador sutil */}
             <hr className="border-t border-gray-200 max-w-7xl mx-auto" />
          <div className="max-w-7xl mx-auto">
            <Categories />
          </div>

          {/* Separador sutil */}
          <hr className="border-t border-gray-200 max-w-7xl mx-auto" />

          {/* Productos */}
          <div className="max-w-7xl mx-auto ">
            <Products />
          </div>
        </section>
      </div>
    </main>
  );
}