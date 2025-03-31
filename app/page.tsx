import Home from "./features";
import Categories from "./categories";
import Products from "./products";

export default function Page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[minmax(250px,_auto)_60px_minmax(500px,_auto)] min-h-screen">
      {/* Sección Home */}
      <div className="row-start-1 row-end-2 col-span-1 lg:col-span-2">
        <Home />
        
      </div>

      {/* Sección Categorías */}
      <div className="row-start-2 row-end-3 col-span-1 lg:col-span-2 -mt-2 flex flex-col gap-6">
        <hr className=""/>
        <Categories />
        <hr className=""/>
      </div>
      <Products />
    </section>
  );
}
