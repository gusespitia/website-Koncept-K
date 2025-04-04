"use client";

import Image from "next/image";
import { ReactNode } from "react";

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={54}
      height={54}
       priority
      className="w-20 h-20 md:w-20 md:h-20 lg:w-20 lg:h-20"
    />
  );
};

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

export default function FooterSection({
  logo = <Logo />,

  columns = [
    {
      title: "Categorieën",
      links: [
        { text: "Mannen", href: "#" },
        { text: "Vrouwen", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Over Ons", href: "overons" },
        { text: "Merken", href: "/merken" },
        { text: "Home", href: "/" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Instagram", href: "#" },
        { text: "Facebook", href: "#" },
      ],
    },
  ],
  copyright = "© 2025 GusDev. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ],
}: FooterProps) {
  return (
    <footer className="w-full bg-[var(--color-store)] shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo y nombre */}
          <div className="flex flex-col space-y-4 w-20">
            <div className="flex items-center space-x-3">{logo}</div>
          </div>

          {/* Columnas dinámicas */}
          {columns.map((column, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-1 ">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0">
            <div className="text-xs text-gray-600">{copyright}</div>

            <div className="flex items-center space-x-6">
              {policies.map((policy, index) => (
                <a
                  key={index}
                  href={policy.href}
                  className=" text-gray-600 hover:text-gray-900 text-xs"
                >
                  {policy.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
