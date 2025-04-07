"use client";

import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: number;
  category_name: string;
  category_slug: string;
  category_image?: {
    url: string;
    name: string;
  };
}

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
}

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={80}
      height={80}
      priority
      className="w-20 h-20"
    />
  );
};

export default function FooterSection({
  logo = <Logo />,
  name = "Koncept K.",
  columns = [
    
    {
      title: "Bedrijf",
      links: [
        { text: "Over Ons", href: "/over-ons" },
        { text: "Merken", href: "/merken" },
        { text: "Home", href: "/" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Social Media",
      links: [
        { text: "Instagram", href: "https://instagram.com/konceptk" },
        { text: "Facebook", href: "https://facebook.com/konceptk" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Koncept K. Alle rechten voorbehouden`,
  policies = [
    { text: "Privacybeleid", href: "/privacybeleid" },
    { text: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
    { text: "Cookiebeleid", href: "/privacybeleid#cookies" },
  ],
}: FooterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories?populate=category_image`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        clearTimeout(timeoutId);

        if (data?.data?.length > 0) {
          setCategories(data.data);
        } else {
          throw new Error("Geen categorieën gevonden");
        }
      } catch (error) {
        console.error("Fout bij laden categorieën:", error);
        setError("Kon categorieën niet laden. Probeer later opnieuw.");
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="w-full bg-[var(--color-store)] text-gray-800 shadow-lg mt-12">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo en bedrijfsinfo */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              {logo}
              <span className="text-xl font-bold">{name}</span>
            </Link>
            <p className="text-sm">
              Jouw favoriete winkel voor kwaliteitsproducten in België.
            </p>
          </div>

          {/* Dynamische kolommen */}
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg">{column.title}</h3>
              <ul className="space-y-1">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-gray-600 transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Categorieën sectie */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-lg">Shop Categorieën</h3>
            {loading ? (
              <p className="text-sm">Categorieën laden...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              <ul className="space-y-1">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.category_slug}`}
                      className="hover:text-gray-700 transition-colors text-sm"
                    >
                      {category.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Onderste sectie */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">{copyright}</div>

            <div className="flex items-center space-x-6">
              {policies.map((policy, index) => (
                <Link
                  key={index}
                  href={policy.href}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  {policy.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}