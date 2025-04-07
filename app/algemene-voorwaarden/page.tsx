// app/algemene-voorwaarden/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Koncept K.',
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Algemene Voorwaarden van Koncept K.</h1>
      <p className="mb-4">Van toepassing vanaf: {new Date().toLocaleDateString('nl-BE')}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Identiteit</h2>
        <p>
          Koncept K.<br />
          BTW: BE0XXX.XXX.XXX<br />
          Ondernemingsnummer: XXX.XXX.XXX<br />
          E-mail: info@konceptk.be
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Bestellingen</h2>
        <ul className="list-disc pl-6">
          <li>Offertes zijn 14 dagen geldig</li>
          <li>Betaling binnen 30 dagen tenzij anders overeengekomen</li>
          <li>Klachten binnen 14 dagen na levering</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Levering</h2>
        <p>
          - Levertijd: 3-5 werkdagen in België<br />
          - Transportkosten: €5,95 (gratis vanaf €50)<br />
          - Retourbeleid: 14 dagen bedenktijd conform Europese richtlijn
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Garantie</h2>
        <p>
          Wettelijke garantie van 2 jaar op productdefecten (art. 1649bis BW).<br />
          Commerciële garanties worden specifiek per product vermeld.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Geschillen</h2>
        <p>
          Geschillen vallen onder de bevoegdheid van de rechtbanken van [Jouw Provincie].<br />
          Consumenten kunnen ook terecht bij <a href="https://ec.europa.eu/consumers/odr" className="text-blue-600">Europees ODR-platform</a>.
        </p>
      </section>
    </div>
  );
}