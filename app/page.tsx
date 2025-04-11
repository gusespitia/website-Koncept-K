import Categories from "./categories";
import Carrusel from "./carrosuel";
import Openingsuren from "./openingsuren";

export default function Page() {
  return (
    <main className="">
      {/* Carrusel de ancho completo */}
      <div className="w-full ">
        <Carrusel />
      </div>

      {/* Contenido principal con ancho máximo */}
      <div className="max-w-6xl mx-auto px-8  ">
        {/* Texto descriptivo */}
        <div className=" text-center  mx-auto bg-white px-20">
          <h2 className="text-2xl font-bold text-gray-900 my-4">
            Koncept K – Tijdloze stijl voor de moderne man
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Bij Koncept K. draait het om meer dan kleding. Het is een plek waar
            smaak, kwaliteit en karakter samenkomen. Katja stelt elk seizoen een
            verfijnde selectie samen van kleding, accessoires, ondergoed en
            stijlvolle objecten – met zorg gekozen voor de man die bewust leeft
            en waarde hecht aan uitstraling. De collecties zijn zowel eigentijds
            als tijdloos, en brengen een elegante balans tussen casual klasse en
            verfijnde eenvoud.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 my-4">
            Discreet advies, met oog voor detail
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Bij Koncept K. gaat het niet om wat je koopt, maar om hoe je je
            erbij voelt. We geven advies zonder druk, en denken met je mee op
            een manier die persoonlijk, stijlvol en doordacht is. Onze service
            is discreet maar betrokken – zodat je vol vertrouwen en comfort de
            deur uit stapt, met of zonder aankoop.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 my-4">
            Een winkelervaring met klasse
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Rust, ruimte en aandacht: dat is de sfeer die je bij ons ervaart.
            Geen snelle verkoop, maar een winkelmoment dat voelt als een
            verademing. Neem de tijd om te passen, te ontdekken en geïnspireerd
            te worden. Terwijl jij verschillende stijlen uitprobeert, serveren
            wij een lekker koffie in een setting die rust uitstraalt.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 my-4">
            Gevestigd in het hart van historisch Berchem
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Koncept K. bevindt zich in de iconische Statiestraat in Berchem, een
            buurt met karakter en een rijke geschiedenis. Vroeger het kloppend
            hart van de spoorweggeschiedenis, vandaag een charmante mix van
            erfgoed en hedendaagse flair. Tussen de statige gevels en unieke
            panden vind je onze winkel als een stijlvolle, ingetogen parel in de
            stad. Berchem is dan ook de perfecte omgeving voor wie houdt van
            authentieke beleving met een moderne toets.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 my-4">
            Ontdek het zelf – op jouw tempo
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Of je nu gericht komt shoppen of gewoon even wil binnenstappen om te
            ontdekken wat Koncept K. te bieden heeft: je bent van harte welkom.
            Voel de sfeer, bekijk de collectie, stel vragen – zonder
            verplichtingen, maar met alle aandacht voor jou.
          </p>
        </div>

        {/* Sección de categorías y productos */}
        <section className="">
          <div className="p-6">
            <Categories />
          </div>
          <Openingsuren />
        </section>
      </div>
    </main>
  );
}
