/*
 * DISEÑO: Editorial de Lujo Silencioso - Calculadora Remodelar vs. Vender
 * Propósito: Ayuda a los propietarios a analizar el impacto financiero de las renovaciones.
 * Diseño: Entradas a la izquierda, resultados a la derecha, con sección de valoración opcional.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Hammer, TrendingUp, AlertCircle } from "lucide-react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function RemodelVsSellES() {
  // Estado para las entradas - usando string para permitir estado vacío
  const [currentValue, setCurrentValue] = useState<string>("");
  const [remodelCost, setRemodelCost] = useState<string>("");
  const [expectedIncrease, setExpectedIncrease] = useState<string>("");

  // Cálculos
  const current = parseFloat(currentValue) || 0;
  const cost = parseFloat(remodelCost) || 0;
  const increase = parseFloat(expectedIncrease) || 0;

  const newValue = current * (1 + increase / 100);
  const netGain = newValue - current - cost;

  // Nuevos cálculos de apoyo
  const valueAdded = newValue - current;
  const roi = cost === 0 ? 0 : (netGain / cost) * 100; // Manejar división por cero

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const formatPercentage = (num: number) => 
    new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num / 100);

  // Ayudante para manejar cambios en las entradas y prevenir ceros a la izquierda
  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") {
      setter("");
    } else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  // Clasificación del ROI
  const getRoiClassification = (roiValue: number) => {
    if (roiValue >= 20) return "Retorno sólido";
    if (roiValue >= 10) return "Retorno moderado";
    if (roiValue >= 0) return "Retorno marginal";
    return "Retorno negativo";
  };

  // Conclusión Estratégica
  const getStrategicTakeaway = (roiValue: number) => {
    if (roiValue >= 20) return "Esta remodelación muestra un retorno sólido y puede valer la pena considerarla dependiendo de tus tiempos.";
    if (roiValue >= 10) return "Esta remodelación muestra un retorno moderado. Puede tener sentido si mejora cómo se muestra y se vende la casa.";
    if (roiValue >= 0) return "Esta remodelación produce un retorno limitado. En muchos casos, puede no justificar el costo, el tiempo y las molestias.";
    return "Este escenario sugiere que la remodelación podría no ser financieramente beneficiosa en comparación con vender la casa tal como está.";
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-20">
      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Herramienta de Estrategia</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            ¿Vale la pena <br /><em className="italic">remodelar?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Entiende si es probable que una remodelación mejore tu resultado, o si vender tal como está podría ser el mejor camino.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Entradas - Lado Izquierdo */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Detalles del Proyecto</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Valor Actual de la Casa (Tal Cual)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={currentValue}
                      onChange={handleInputChange(setCurrentValue)}
                      onFocus={(e) => e.target.value === "0" && setCurrentValue("")}
                      onBlur={(e) => e.target.value === "" && setCurrentValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Costo Estimado de Remodelación</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={remodelCost}
                      onChange={handleInputChange(setRemodelCost)}
                      onFocus={(e) => e.target.value === "0" && setRemodelCost("")}
                      onBlur={(e) => e.target.value === "" && setRemodelCost("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Aumento de Valor Esperado (%)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={expectedIncrease}
                      onChange={handleInputChange(setExpectedIncrease)}
                      onFocus={(e) => e.target.value === "0" && setExpectedIncrease("")}
                      onBlur={(e) => e.target.value === "" && setExpectedIncrease("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">%</span>
                  </div>
                  <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">
                    Rangos típicos: Actualizaciones cosméticas: 3-7% | Mejoras en cocina/baño: 5-12% | Renovación completa: 10-20%+
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F5F0] p-6 border border-[#E8E0D5] flex gap-4">
              <AlertCircle className="text-[#B8974A] shrink-0" size={20} />
              <p className="font-body text-xs text-[#1A1A18]/60 leading-relaxed">
                <strong>Nota del Asesor:</strong> La mayoría de las remodelaciones de lujo rara vez devuelven el 100% de su costo. Enfócate en actualizaciones funcionales y una presentación neutral para obtener el mayor ROI.
              </p>
            </div>
          </div>

          {/* Resultados - Lado Derecho */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Análisis de ROI</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Nuevo Valor Proyectado</p>
                    <p className="font-display text-4xl font-light text-white">
                      {formatCurrency(newValue)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Inversión en Remodelación</p>
                    <p className="font-display text-4xl font-light text-white/60">
                      {formatCurrency(cost)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Ganancia Neta Estimada tras Remodelar</p>
                  <p className={`font-display text-5xl md:text-6xl font-light mb-2 ${netGain >= 0 ? 'text-white' : 'text-red-400'}`}>
                    {formatCurrency(netGain)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed mb-4">
                    Valor añadido: {formatCurrency(valueAdded)} <br/>
                    Retorno de la remodelación: {formatPercentage(roi)}
                  </p>
                  <p className="font-body text-sm text-white/60">
                    {getRoiClassification(roi)}
                  </p>
                </div>
              </div>

              {/* Sección de Conclusión Estratégica */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-light text-white mb-4">Conclusión Estratégica</h3>
                <p className="font-body text-base text-white/70 leading-relaxed mb-8">
                  {getStrategicTakeaway(roi)}
                </p>
                <Link href="/es/contacto">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Analiza Esto Conmigo
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Valoración Opcional */}
        <div className="mt-32 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">Antes de decidir, es posible que desees una estimación base.</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              Estas estimaciones no tienen en cuenta la condición de tu hogar, las mejoras o el posicionamiento. Te guiaré sobre cómo le pondría precio realmente en el mercado actual.
            </p>
            <Link href="/es/home-value">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Obtener Estimación Base
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
