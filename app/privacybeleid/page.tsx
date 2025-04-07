// app/privacybeleid/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid | Koncept K.',
  description: 'Onze gegevensbeschermingsbeleid in overeenstemming met de GDPR',
};

export default function PrivacybeleidPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacybeleid van Koncept K.</h1>
      <p className="mb-4">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-BE')}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Gegevensverantwoordelijke</h2>
        <p>
          Koncept K. (BTW-nummer: BE0XXX.XXX.XXX)<br />
          Adres: [Jouw Bedrijfsadres]<br />
          Email: privacy@konceptk.be
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Verwerkte gegevens</h2>
        <p>Wij verzamelen:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Persoonlijke identificatiegegevens (naam, adres, e-mail)</li>
          <li>Betalingsgegevens (via beveiligde gateways zoals Stripe)</li>
          <li>Browsergedrag (via cookies, met uw toestemming)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Rechtsgrond</h2>
        <p>
          Verwerking gebeurt op basis van:<br />
          - Uitvoering van overeenkomst (art. 6.1.b GDPR)<br />
          - Wettelijke verplichting (art. 6.1.c GDPR)<br />
          - Gerechtvaardigd belang (art. 6.1.f GDPR)
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Uw rechten</h2>
        <p>Volgens de GDPR hebt u recht op:</p>
        <ul className="list-disc pl-6">
          <li>Toegang en rectificatie</li>
          <li>Vergetelheid (&quot;recht op verwijdering&quot;)</li>
          <li>Bezwaar tegen verwerking</li>
          <li>Gegevensoverdraagbaarheid</li>
        </ul>
        <p className="mt-4">
          Oefen deze rechten uit via <strong>privacy@konceptk.be</strong>.
        </p>
      </section>

      <section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Cookiebeleid</h2>
  <p>Wij gebruiken alleen strikt noodzakelijke cookies voor:</p>
  <ul className="list-disc pl-6 mb-4">
    <li>Werking van het contactformulier (CSRF-token)</li>
    <li>Basisveiligheid (bv. spamprotectie)</li>
  </ul>
  <p>Deze cookies vereisen geen toestemming volgens de EU-richtlijn.</p>
</section>
### Noodzakelijke Cookies

| Cookie Naam | Doel | Duur |
|-------------|------|------|
| form_token | Beveiliging formulier | 1 uur |
| csrf_token | Cross-Site Request Forgery bescherming | Sessie |

Deze cookies zijn essentieel en worden automatisch geplaatst zonder toestemming (artikel 5.3 ePrivacy Richtlijn).
    </div>
  );
}