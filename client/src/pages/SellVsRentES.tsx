/*
 * DESIGN: Quiet Luxury Editorial - Vender vs. Alquilar (Español)
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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

function setPageMeta(title: string, description: string, url: string) {
  document.title = title;
  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function SellVsRentES() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [mortgageBalance, setMortgageBalance] = useState<string>("");
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<string>("");
  const [appreciation, setAppreciation] = useState<string>("");
  const [yearsHolding, setYearsHolding] = useState<string>("");
  const [vacancyMaintenance, setVacancyMaintenance] = useState<string>("8");

  useEffect(() => {
    setPageMeta(
      "Calculadora Vender vs. Alquilar | Cedar Park y Leander TX | Mario Manzano",
      "¿Deberías vender tu casa o alquilarla? Compara el resultado financiero de vender ahora vs conservar como alquiler en Cedar Park y Leander TX. Herramienta gratuita para propietarios.",
      "https://mariomanzano.com/es/sell-vs-rent"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Calculadora Vender vs. Alquilar",
    "url": "https://mariomanzano.com/es/sell-vs-rent",
    "description": "Calculadora gratuita para propietarios en Cedar Park y Leander TX. Compara los resultados financieros a largo plazo de vender ahora versus conservar tu casa como propiedad de alquiler.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const val = parseFloat(homeValue) || 0;
  const mortBal = parseFloat(mortgageBalance) || 0;
  const mPayment = parseFloat(monthlyMortgagePayment) || 0;
  const intRate = parseFloat(interestRate) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const otherExp = parseFloat(otherMonthlyExpenses) || 0;
  const appr = parseFloat(appreciation) || 0;
  const years = parseFloat(yearsHolding) || 0;
  const vacancyBuffer = parseFloat(vacancyMaintenance) || 0;

  let totalPrincipalPaidDown = 0;
  if (mortBal > 0 && mPayment > 0 && intRate > 0 && years > 0) {
    let currentBalance = mortBal;
    const monthlyInterestRate = (intRate / 100) / 12;
    const totalMonths = years * 12;
    for (let i = 0; i < totalMonths; i++) {
      if (currentBalance <= 0) break;
      const interestPayment = currentBalance * monthlyInterestRate;
      let principalPayment = mPayment - interestPayment;
      if (principalPayment < 0) principalPayment = 0;
      if (currentBalance - principalPayment < 0) principalPayment = currentBalance;
      totalPrincipalPaidDown += principalPayment;
      currentBalance -= principalPayment;
    }
  }

  const adjustedRent = rent * (1 - vacancyBuffer / 100);
  const sellingCostPercentage = 0.07;
  const estimatedNetIfSoldToday = val - (val * sellingCostPercentage) - mortBal;
  const totalMonthlyExpensesIfRenting = otherExp + mPayment;
  const annualCashFlowIfRenting = (adjustedRent - totalMonthlyExpensesIfRenting) * 12;
  const futureValue = val * Math.pow(1 + appr / 100, years);
  const futureMortgageBalance = Math.max(0, mortBal - totalPrincipalPaidDown);
  const estimatedNetIfRented = futureValue - futureMortgageBalance - (futureValue * sellingCostPercentage);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") { setter(""); }
    else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  const getStrategicTakeaway = () => {
    if (val === 0 || years === 0) return "Ingresa los detalles de tu casa para ver una comparación estratégica.";
    if (estimatedNetIfRented > estimatedNetIfSoldToday * 1.2) {
      return "Según estos números, conservar la propiedad como alquiler parece producir un resultado a largo plazo significativamente mejor que vender ahora. Dicho esto, los números solo cuentan parte de la historia. Tu capacidad para gestionar un alquiler, tu necesidad de liquidez y tu plazo también importan.";
    } else if (estimatedNetIfRented > estimatedNetIfSoldToday * 0.8) {
      return "La diferencia financiera entre vender ahora y conservar como alquiler es relativamente cercana en este escenario. La respuesta correcta depende de factores más allá de los números, incluyendo tu plazo, tu disposición a ser arrendador y qué planeas hacer con los ingresos.";
    } else {
      return "Según estos datos, vender ahora parece dejarte más dinero en el bolsillo que conservar como alquiler durante este período. Eso puede cambiar significativamente con diferentes supuestos de apreciación o niveles de renta. Vale la pena correr varios escenarios antes de decidir.";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Herramienta Estratégica</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            ¿Deberías<br /><em className="italic">vender o alquilar?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-6 leading-relaxed">
            Esta es una de las preguntas más frecuentes de los propietarios en Cedar Park y Leander. Vender te da liquidez y elimina la responsabilidad continua. Alquilar mantiene tu capital trabajando con el tiempo y puede ser una herramienta sólida para construir riqueza si los números lo respaldan.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Esta herramienta compara ambos caminos lado a lado según tus números específicos. Ingresa los detalles de tu casa y un período de tenencia para ver qué opción sale adelante financieramente.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Entradas */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Detalles de tu Casa</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Valor Estimado de la Casa</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={homeValue} onChange={handleInputChange(setHomeValue)}
                      onFocus={(e) => e.target.value === "0" && setHomeValue("")}
                      onBlur={(e) => e.target.value === "" && setHomeValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Saldo Pendiente de Hipoteca</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={mortgageBalance} onChange={handleInputChange(setMortgageBalance)}
                      onFocus={(e) => e.target.value === "0" && setMortgageBalance("")}
                      onBlur={(e) => e.target.value === "" && setMortgageBalance("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Pago Mensual de Hipoteca (P&I)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input type="text" value={monthlyMortgagePayment} onChange={handleInputChange(setMonthlyMortgagePayment)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyMortgagePayment("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyMortgagePayment("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Tasa de Interés Anual (%)</label>
                    <input type="text" value={interestRate} onChange={handleInputChange(setInterestRate)}
                      onFocus={(e) => e.target.value === "0" && setInterestRate("")}
                      onBlur={(e) => e.target.value === "" && setInterestRate("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">Tu tasa de interés anual actual.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Renta Mensual</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input type="text" value={monthlyRent} onChange={handleInputChange(setMonthlyRent)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyRent("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyRent("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Otros Gastos Mensuales (HOA, Impuestos, Seguro)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input type="text" value={otherMonthlyExpenses} onChange={handleInputChange(setOtherMonthlyExpenses)}
                        onFocus={(e) => e.target.value === "0" && setOtherMonthlyExpenses("")}
                        onBlur={(e) => e.target.value === "" && setOtherMonthlyExpenses("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Apreciación Anual (%)</label>
                    <input type="text" value={appreciation} onChange={handleInputChange(setAppreciation)}
                      onFocus={(e) => e.target.value === "0" && setAppreciation("")}
                      onBlur={(e) => e.target.value === "" && setAppreciation("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">Crecimiento anual promedio del valor. Ej: ingresa 3 para 3%.</p>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Años de Tenencia</label>
                    <input type="text" value={yearsHolding} onChange={handleInputChange(setYearsHolding)}
                      onFocus={(e) => e.target.value === "0" && setYearsHolding("")}
                      onBlur={(e) => e.target.value === "" && setYearsHolding("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Margen de Vacancia / Mantenimiento (%)</label>
                  <input type="text" value={vacancyMaintenance} onChange={handleInputChange(setVacancyMaintenance)}
                    onFocus={(e) => e.target.value === "0" && setVacancyMaintenance("")}
                    onBlur={(e) => e.target.value === "" && setVacancyMaintenance("0")}
                    className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">Cubre vacancias, reparaciones y costos de tenencia. Típico: 5 a 10%.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Análisis Estratégico</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Estimado Neto si Vendes Hoy</p>
                    <p className="font-display text-4xl font-light text-white">{formatCurrency(estimatedNetIfSoldToday)}</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Flujo de Caja Anual (Ajustado)</p>
                    <p className={`font-display text-4xl font-light ${annualCashFlowIfRenting >= 0 ? "text-[#B8974A]" : "text-red-400"}`}>
                      {formatCurrency(annualCashFlowIfRenting)}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Estimado Neto si Alquilas y Vendes Después</p>
                  <p className="font-display text-5xl md:text-6xl font-light text-white mb-2">{formatCurrency(estimatedNetIfRented)}</p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Incluye apreciación, flujo de caja del alquiler y reducción de hipoteca durante {years} años, luego venta.
                  </p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-light text-white mb-4">Lo Que Esto Significa</h3>
                <p className="font-body text-base text-white/70 leading-relaxed mb-8">{getStrategicTakeaway()}</p>
                <Link href="/es/contacto">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Hablar Sobre Tu Estrategia
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sección educativa */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿Es mejor alquilar que vender en Cedar Park o Leander?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              En el mercado de Cedar Park y Leander, alquilar tiende a ser una estrategia de apreciación a largo plazo más que una fuente de flujo de caja inmediato. Las casas en esta área han mantenido bien su valor con el tiempo, lo que hace que el camino del alquiler sea atractivo si tu pago hipotecario es bajo en relación con lo que podría rentar la propiedad.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              Dicho esto, los números son solo parte de la decisión. Ser arrendador significa lidiar con inquilinos, mantenimiento, vacancias y administración de propiedades. Si no estás preparado para esa responsabilidad continua, la ventaja financiera de alquilar puede no valer el estrés.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
              Si no estás seguro de qué camino tiene más sentido para tu situación, eso es exactamente el tipo de conversación que tengo con propietarios en esta área. Sin presión. Solo un análisis claro de los números y lo que realmente significan.
            </p>
          </RevealDiv>
        </div>

        <div className="mt-20 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿No sabes cuánto vale tu casa?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              Obtén una estimación base antes de correr la comparación.
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
