# GitHub Web Editor Changes - CTA Conversion Updates

**Total Files to Update: 6**

Follow these steps in GitHub's web editor:
1. Go to https://github.com/mm-manzano/mariomanzano.com
2. For each file below, click the file name to open it
3. Click the pencil icon (✏️) to edit
4. Replace the BEFORE code with the AFTER code
5. Click "Commit changes" and add the commit message shown
6. After all 6 files are updated, the site will automatically deploy

---

## FILE 1: `client/src/lib/ctaLinks.ts`

**Path:** `client/src/lib/ctaLinks.ts`

**BEFORE:**
```typescript
/**
 * CTA Link Utility
 * Handles mobile (SMS) vs desktop (Contact page) routing for CTA buttons
 * Pre-fills messages based on button type and language
 */

const PHONE_NUMBER_ENCODED = "5126959255";

const SMS_MESSAGES = {
  en: {
    "start-conversation": "Hey Mario, I came across your site and had a question about my home.",
    "get-plan": "Hey Mario, I'm trying to figure out what to do with my home and wanted your thoughts.",
  },
  es: {
    "start-conversation": "Hola Mario, vi tu sitio web y tengo una pregunta sobre mi casa.",
    "get-plan": "Hola Mario, estoy tratando de decidir qué hacer con mi casa y me gustaría tu opinión.",
  },
};

export type ButtonType = "start-conversation" | "get-plan";
export type Language = "en" | "es";

/**
 * Detect if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get the appropriate link for CTA button
 * Mobile: SMS link with pre-filled message
 * Desktop: Contact page link
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
  const isMobile = isMobileDevice();
  const message = SMS_MESSAGES[language][buttonType];

  if (isMobile) {
    // SMS link for mobile
    // Format: sms:XXXXXXXXXX?body=Message
    const encodedMessage = encodeURIComponent(message);
    return `sms:${PHONE_NUMBER_ENCODED}?body=${encodedMessage}`;
  } else {
    // Contact page link for desktop
    return language === "es" ? "/es/contacto" : "/contact";
  }
}
```

**AFTER:**
```typescript
/**
 * CTA Link Utility
 * Handles routing for CTA buttons:
 * - "get-guide": Routes to GoHighLevel funnel (both mobile & desktop)
 * - "start-conversation": SMS on mobile, Contact page on desktop
 */

const PHONE_NUMBER_ENCODED = "5126959255";
const FUNNEL_URL = "https://go.mariomanzano.com/homeowner-guide";

const SMS_MESSAGES = {
  en: {
    "start-conversation": "Hey Mario, I came across your site and had a question about my home.",
    "get-plan": "Hey Mario, I'm trying to figure out what to do with my home and wanted your thoughts.",
  },
  es: {
    "start-conversation": "Hola Mario, vi tu sitio web y tengo una pregunta sobre mi casa.",
    "get-plan": "Hola Mario, estoy tratando de decidir qué hacer con mi casa y me gustaría tu opinión.",
  },
};

export type ButtonType = "start-conversation" | "get-plan" | "get-guide";
export type Language = "en" | "es";

/**
 * Detect if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get the appropriate link for CTA button
 * "get-guide": Always routes to funnel (mobile & desktop)
 * "start-conversation": SMS on mobile, Contact page on desktop
 * "get-plan": SMS on mobile, Contact page on desktop (legacy)
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
  // "get-guide" always routes to funnel, regardless of device
  if (buttonType === "get-guide") {
    return FUNNEL_URL;
  }

  // "start-conversation" and "get-plan" use mobile/desktop logic
  const isMobile = isMobileDevice();
  const message = SMS_MESSAGES[language][buttonType];

  if (isMobile) {
    // SMS link for mobile
    // Format: sms:XXXXXXXXXX?body=Message
    const encodedMessage = encodeURIComponent(message);
    return `sms:${PHONE_NUMBER_ENCODED}?body=${encodedMessage}`;
  } else {
    // Contact page link for desktop
    return language === "es" ? "/es/contacto" : "/contact";
  }
}
```

**Commit Message:** `Update ctaLinks utility to support funnel routing`

---

## FILE 2: `client/src/components/Navigation.tsx`

**Path:** `client/src/components/Navigation.tsx`

**FIND and REPLACE (Line 14-21):**

**BEFORE:**
```typescript
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Homeowner Guide", href: "/homeowner-guide" },
  { label: "Selling Process", href: "/selling-process" },
  { label: "Search Homes", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const navLinksES = [
  { label: "Inicio", href: "/es" },
  { label: "Guía para Propietarios", href: "/es/guia-para-propietarios" },
  { label: "Proceso de Venta", href: "/es/proceso-de-venta" },
  { label: "Buscar Casas", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "Acerca", href: "/es/acerca" },
  { label: "Contacto", href: "/es/contacto" },
];
```

**AFTER:**
```typescript
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Selling Process", href: "/selling-process" },
  { label: "Search Homes", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const navLinksES = [
  { label: "Inicio", href: "/es" },
  { label: "Proceso de Venta", href: "/es/proceso-de-venta" },
  { label: "Buscar Casas", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "Acerca", href: "/es/acerca" },
  { label: "Contacto", href: "/es/contacto" },
];
```

**Commit Message:** `Remove Homeowner Guide from navigation menu`

---

## FILE 3: `client/src/pages/Home.tsx`

**Path:** `client/src/pages/Home.tsx`

**CHANGE 1 (Line 85-92 - Hero CTA):**

**BEFORE:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getCTALink("start-conversation", "en")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Start a conversation
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**AFTER:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getCTALink("get-guide", "en")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Get the Homeowner Guide
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**CHANGE 2 (Line 205-218 - Services Grid):**

**BEFORE:**
```typescript
                <Link href="/homeowner-guide" className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-xs text-[#B8974A] group-hover:text-[#D4B878] transition-colors duration-500 inline-block">
                    More in the Homeowner Guide
                  </span>
                </Link>
```

**AFTER:**
```typescript
                <a href={getCTALink("get-guide", "en")} className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-xs text-[#B8974A] group-hover:text-[#D4B878] transition-colors duration-500 inline-block">
                    Get the Homeowner Guide
                  </span>
                </a>
```

**CHANGE 3 (Line 364-371 - CTA Band):**

**BEFORE:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("start-conversation", "en")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Start a conversation
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**AFTER:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("get-guide", "en")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Get the Homeowner Guide
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**Commit Message:** `Update English homepage CTAs to route to funnel`

---

## FILE 4: `client/src/pages/HomeES.tsx`

**Path:** `client/src/pages/HomeES.tsx`

**CHANGE 1 (Line 84-91 - Hero CTA):**

**BEFORE:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getCTALink("start-conversation", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Iniciar una Conversación
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**AFTER:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getCTALink("get-guide", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Obtén la Guía para Propietarios
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**CHANGE 2 (Line 205-218 - Services Grid):**

**BEFORE:**
```typescript
                <a href={service.link} className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-xs text-[#B8974A] group-hover:text-[#D4B878] transition-colors duration-500 inline-block">
                    {service.cta}
                  </span>
                </a>
```

**AFTER:**
```typescript
                <a href={getCTALink("get-guide", "es")} className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-xs text-[#B8974A] group-hover:text-[#D4B878] transition-colors duration-500 inline-block">
                    Obtén la Guía para Propietarios
                  </span>
                </a>
```

**CHANGE 3 (Line 412-419 - CTA Band):**

**BEFORE:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("start-conversation", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Iniciar una Conversación
                </span>
              </a>
            </div>
```

**AFTER:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("get-guide", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Obtén la Guía para Propietarios
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**Commit Message:** `Update Spanish homepage CTAs to route to funnel`

---

## FILE 5: `client/src/pages/SellerGuide.tsx`

**Path:** `client/src/pages/SellerGuide.tsx`

**No changes needed** - This file already has the correct CTA ("Book a Consultation" → Contact page for direct contact)

---

## FILE 6: `client/src/pages/SellerGuideES.tsx`

**Path:** `client/src/pages/SellerGuideES.tsx`

**FIND and REPLACE (Line 278-290):**

**BEFORE:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/home-value">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Get My Valor de Casa
                  <ArrowRight size={14} />
                </span>
              </a>
              <a href={getCTALink("get-plan", "es")}>
                <span className="btn-luxury-outline border-white/50 text-white hover:bg-white hover:text-[#1A1A18] inline-flex items-center gap-3">
                  Obtener un plan
                </span>
              </a>
            </div>
```

**AFTER:**
```typescript
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("start-conversation", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Iniciar una Conversación
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
```

**Commit Message:** `Fix Spanish Seller Process page CTA`

---

## SUMMARY

**Total Changes:**
- 6 files updated
- 3 English pages updated (Home, Navigation)
- 3 Spanish pages updated (HomeES, Navigation, SellerGuideES)
- All CTAs now route to: `https://go.mariomanzano.com/homeowner-guide`
- Homeowner Guide removed from navigation but remains accessible via direct URL

**After all changes are committed:**
- GitHub Pages will automatically rebuild
- Site will deploy within 1-2 minutes
- New CTAs will be live on mariomanzano.com
