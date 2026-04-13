import { useState, useEffect } from "react";
import { navigation, siteConfig } from "../../data/site";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden relative z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isOpen ? "bg-gray-100" : "hover:bg-charcoal/5"
        }`}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[55] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <nav
        className={`fixed top-0 right-0 w-full h-[100dvh] bg-white z-[55] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Navegación móvil"
      >
        {/* Logo row inside menu */}
        <div className="flex items-center px-8 pt-5 pb-4 border-b border-gray-100">
          <a href="#" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-xl">🦷</span>
            <span className="text-xl italic text-charcoal" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              {siteConfig.name}
            </span>
          </a>
        </div>

        <div className="flex flex-col px-8 pt-6 pb-12 gap-2 bg-white h-full">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-charcoal py-3 border-b border-gray-100 hover:text-[#E8976F] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(
                () => window.dispatchEvent(new CustomEvent("open-booking")),
                150
              );
            }}
            className="mt-6 inline-flex items-center justify-center bg-[#F2B8A0] text-white font-semibold rounded-full px-7 py-3.5 text-sm hover:bg-[#E8976F] transition-colors"
          >
            Agenda tu cita · gratis 🦷
          </button>
        </div>
      </nav>
    </>
  );
}
