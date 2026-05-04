import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, Home, TrendingUp, DollarSign } from "lucide-react";

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

export default function SellVsRent() {
  // State for inputs - using string to allow empty state
  const [homeValue, setHomeValue] = useState<string>("");
  const [mortgageBalance, setMortgageBalance] = useState<string>("");
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>(""); // New input for interest rate
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<string>("");
  const [appreciation, setAppreciation] = useState<string>("");
  const [yearsHolding, setYearsHolding] = useState<string>("");
  const [vacancyMaintenance, setVacancyMaintenance] = useState<string>("8"); // Default to 8%

  // Calculations
  const val = parseFloat(homeValue) || 0;
  let mortBal = parseFloat(mortgageBalance) || 0;
  const mPayment = parseFloat(monthlyMortgagePayment) || 0;
  const intRate = parseFloat(interestRate) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const otherExp = parseFloat(otherMonthlyExpenses) || 0;
  const appr = parseFloat(appreciation) || 0;
  const years = parseFloat(yearsHolding) || 0;
  const vacancyBuffer = parseFloat(vacancyMaintenance) || 0;

  // Amortization calculation for principal paid down
  let totalPrincipalPaidDown = 0;
  if (mortBal > 0 && mPayment > 0 && intRate > 0 && years > 0) {
    let currentBalance = mortBal;
    const monthlyInterestRate = (intRate / 100) / 12;
    const totalMonths = years * 12;

    for (let i = 0; i < totalMonths; i++) {
      if (currentBalance <= 0) break; // Mortgage paid off
      const interestPayment = currentBalance * monthlyInterestRate;
      let principalPayment = mPayment - interestPayment;

      if (principalPayment < 0) { // Payment doesn't cover interest, or very low payment
        principalPayment = 0; // Or handle as an error/warning
      }
      
      if (currentBalance - principalPayment < 0) { // Avoid negative balance
        principalPayment = currentBalance;
      }

      totalPrincipalPaidDown += principalPayment;
      currentBalance -= principalPayment;
    }
  }

  // Adjusted Rent with buffer
  const adjustedRent = rent * (1 - vacancyBuffer / 100);

  // Sell Scenario Calculation (7% selling cost)
  const sellingCostPercentage = 0.07;
  const estimatedNetIfSoldToday = val - (val * sellingCostPercentage) - mortBal;

  // Rent Scenario Calculations
  const totalMonthlyExpensesIfRenting = otherExp + mPayment;
  const annualCashFlowIfRenting = (adjustedRent - totalMonthlyExpensesIfRenting) * 12;
  const futureValue = val * Math.pow(1 + appr / 100, years);
  
  const futureMortgageBalance = Math.max(0, mortBal - totalPrincipalPaidDown); // Cannot go below zero

  const totalGainFromRenting = (futureValue - val) + (annualCashFlowIfRenting * years) + totalPrincipalPaidDown;
  const estimatedNetIfRented = futureValue - futureMortgageBalance - (futureValue * sellingCostPercentage); // Net after selling in the future

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  // Helper to handle input changes and prevent leading zeros
  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") {
      setter("");
    } else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  // Strategic Takeaway
  const getStrategicTakeaway = () => {
    if (val === 0 || years === 0) return "Enter your home details to see a strategic comparison.";

    if (estimatedNetIfRented > estimatedNetIfSoldToday * 1.2) { // Renting gain significantly higher
      return "This scenario strongly favors holding as a rental, assuming these numbers hold. It suggests a significant financial benefit over selling now.";
    } else if (estimatedNetIfRented > estimatedNetIfSoldToday * 0.8) { // Renting gain close to selling
      return "This is a close decision. The financial difference between selling now and holding as a rental is relatively small compared to the effort and risk of renting. Consider non-financial factors.";
    } else { // Selling is stronger
      return "Selling now appears to be the more efficient option based on these assumptions. The financial benefits of renting do not significantly outweigh the costs and effort involved.";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-20">
      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Strategy Tool</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            Should you <br /><em className="italic">sell or rent?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Compare what selling now looks like versus holding as a rental, so you can decide what actually makes sense for your situation.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Your Home Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Estimated Home Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={homeValue}
                      onChange={handleInputChange(setHomeValue)}
                      onFocus={(e) => e.target.value === "0" && setHomeValue("")}
                      onBlur={(e) => e.target.value === "" && setHomeValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Outstanding Mortgage Balance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={mortgageBalance}
                      onChange={handleInputChange(setMortgageBalance)}
                      onFocus={(e) => e.target.value === "0" && setMortgageBalance("")}
                      onBlur={(e) => e.target.value === "" && setMortgageBalance("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Monthly Mortgage Payment (P&I)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input 
                        type="text" 
                        value={monthlyMortgagePayment}
                        onChange={handleInputChange(setMonthlyMortgagePayment)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyMortgagePayment("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyMortgagePayment("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Annual Interest Rate (%)</label>
                    <input 
                      type="text" 
                      value={interestRate}
                      onChange={handleInputChange(setInterestRate)}
                      onFocus={(e) => e.target.value === "0" && setInterestRate("")}
                      onBlur={(e) => e.target.value === "" && setInterestRate("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                    <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">
                      Your current annual interest rate on the mortgage.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Monthly Rent</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input 
                        type="text" 
                        value={monthlyRent}
                        onChange={handleInputChange(setMonthlyRent)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyRent("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyRent("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Other Monthly Expenses (HOA, Taxes, Insurance)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input 
                        type="text" 
                        value={otherMonthlyExpenses}
                        onChange={handleInputChange(setOtherMonthlyExpenses)}
                        onFocus={(e) => e.target.value === "0" && setOtherMonthlyExpenses("")}
                        onBlur={(e) => e.target.value === "" && setOtherMonthlyExpenses("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Yearly Appreciation (%)</label>
                    <input 
                      type="text" 
                      value={appreciation}
                      onChange={handleInputChange(setAppreciation)}
                      onFocus={(e) => e.target.value === "0" && setAppreciation("")}
                      onBlur={(e) => e.target.value === "" && setAppreciation("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                    <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">
                      Average annual home value growth. e.g., enter 3 for 3%.
                    </p>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Years Holding</label>
                    <input 
                      type="text" 
                      value={yearsHolding}
                      onChange={handleInputChange(setYearsHolding)}
                      onFocus={(e) => e.target.value === "0" && setYearsHolding("")}
                      onBlur={(e) => e.target.value === "" && setYearsHolding("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Vacancy / Maintenance Buffer (%)</label>
                  <input 
                    type="text" 
                    value={vacancyMaintenance}
                    onChange={handleInputChange(setVacancyMaintenance)}
                    onFocus={(e) => e.target.value === "0" && setVacancyMaintenance("")}
                    onBlur={(e) => e.target.value === "" && setVacancyMaintenance("0")}
                    className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                  />
                  <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">
                    Accounts for potential vacancies, repairs, and other holding costs. Typical: 5-10%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Strategic Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Estimated Net if Sold Today</p>
                    <p className="font-display text-4xl font-light text-white">
                      {formatCurrency(estimatedNetIfSoldToday)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Annual Cash Flow (Adjusted)</p>
                    <p className={`font-display text-4xl font-light ${annualCashFlowIfRenting >= 0 ? "text-[#B8974A]" : "text-red-400"}`}>
                      {formatCurrency(annualCashFlowIfRenting)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Estimated Net if Rented & Sold Later</p>
                  <p className="font-display text-5xl md:text-6xl font-light text-white mb-2">
                    {formatCurrency(estimatedNetIfRented)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Includes appreciation, rental cash flow, and mortgage paydown over {years} years, then selling.
                  </p>
                </div>
              </div>

              {/* Strategic Takeaway Section */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-light text-white mb-4">Strategic Takeaway</h3>
                <p className="font-body text-base text-white/70 leading-relaxed mb-8">
                  {getStrategicTakeaway()}
                </p>
                <Link href="/contact">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Discuss Your Strategy
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Valuation Section */}
        <div className="mt-32 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">Before you decide, you may want a baseline estimate.</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              These estimates don't account for your home's condition, upgrades, or positioning. I'll walk you through how I'd actually price it in today's market.
            </p>
            <Link href="/home-value">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Get Baseline Estimate
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
