/*
 * DISEÑO: Editorial de Lujo Silencioso - Página de Valor de la Casa
 * Propósito: Página de conversión principal para clientes potenciales de venta.
 * Diseño: Minimalista, primero móvil, enfocado en la herramienta de valoración.
 */

import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

export default function HomeValueES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <div className="container max-w-4xl">
        {/* Enlace de Regreso */}
        <Link href="/es">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Volver a Estrategia
          </span>
        </Link>

        {/* Sección de Encabezado */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            ¿Cuánto vale tu casa <br />
            <em className="italic">realmente?</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            Obtén una estimación instantánea. Luego, hablemos de lo que realmente significa para tu próximo paso.
          </p>
        </div>

        {/* Contenedor de la Herramienta */}
        <div className="bg-white p-4 md:p-8 shadow-sm border border-[#E8E0D5] min-h-[200px] flex flex-col items-center justify-center">
          <div className="w-full">
            <iframe 
              style={{ width: '100%', height: '160px' }} 
              src="https://mariomanzano.exprealty.com/sellembed.php" 
              allowTransparency={true} 
              frameBorder="0"
              title="Herramienta de Valoración de la Casa"
            ></iframe>
          </div>
        </div>

        {/* Texto de Descargo de Responsabilidad */}
        <div className="mt-12 text-center">
          <p className="font-display text-xl md:text-2xl font-light text-[#1A1A18] mb-6">
            <em className="italic">Este es un punto de partida.</em>
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mx-auto">
            El precio real depende de la condición, la estrategia y el momento. Estas estimaciones no tienen en cuenta la condición de tu hogar, las mejoras o el posicionamiento. Te guiaré sobre cómo le pondría precio realmente en el mercado actual.
          </p>
        </div>

        {/* Flujo del Próximo Paso */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white">
          <div>
            <h4 className="font-display text-xl font-light mb-2">Próximo Paso: Calcula tus ganancias netas</h4>
            <p className="font-body text-sm text-white/60">Descubre exactamente con cuánto dinero te quedarás después de los costos.</p>
          </div>
          <Link href="/es/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Ir a Hoja de Neto
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
