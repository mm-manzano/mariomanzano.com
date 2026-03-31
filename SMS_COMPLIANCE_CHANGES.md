# SMS Compliance Updates - GitHub Web Editor Guide

**Total Files to Create/Update: 7**

Apply changes in this order via GitHub web editor.

---

## CHANGE 1: Update Footer Component

**File:** `client/src/components/Footer.tsx`

**FIND (Line 91-93):**
```typescript
            <p className="font-body text-xs text-white/50">
              {isSpanish ? "Representado por eXp Realty" : "Brokered by eXp Realty"}
            </p>
```

**REPLACE WITH:**
```typescript
            <p className="font-body text-xs text-white/50">
              {isSpanish ? "Representado por eXp Realty · Leander, TX" : "Brokered by eXp Realty · Leander, TX"}
            </p>
            <a href={isSpanish ? "/es/privacy-policy" : "/privacy-policy"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
              {isSpanish ? "Política de Privacidad" : "Privacy Policy"}
            </a>
            <a href={isSpanish ? "/es/terms-of-service" : "/terms-of-service"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300 ml-4">
              {isSpanish ? "Términos de Servicio" : "Terms of Service"}
            </a>
```

**Commit Message:** `Add location to footer and add privacy/terms links`

---

## CHANGE 2: Create Privacy Policy Page (English)

**File:** `client/src/pages/PrivacyPolicy.tsx` (NEW FILE)

**Create new file with this content:**
```typescript
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-6 font-body text-base text-[#1A1A18]/70 leading-relaxed">
            <p>
              Mario Manzano operates this website and may collect personal information such as name, phone number, and email when users submit forms or use the chat widget.
            </p>

            <p>
              This information is used to respond to inquiries, provide services, and send updates or marketing messages if consent is given.
            </p>

            <p>
              We do not sell or share your personal information with third parties for marketing purposes.
            </p>

            <p>
              Message and data rates may apply. Message frequency may vary. You can reply STOP to unsubscribe or HELP for assistance.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E8E0D5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contact:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:** `Create English Privacy Policy page`

---

## CHANGE 3: Create Privacy Policy Page (Spanish)

**File:** `client/src/pages/PrivacyPolicyES.tsx` (NEW FILE)

**Create new file with this content:**
```typescript
export default function PrivacyPolicyES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-8">
            Política de Privacidad
          </h1>

          <div className="space-y-6 font-body text-base text-[#1A1A18]/70 leading-relaxed">
            <p>
              Mario Manzano opera este sitio web y puede recopilar información personal como nombre, número de teléfono y correo electrónico cuando los usuarios envían formularios o utilizan el chat del sitio.
            </p>

            <p>
              Esta información se utiliza para responder consultas, brindar servicios y enviar actualizaciones o mensajes relacionados con bienes raíces si el usuario ha dado su consentimiento.
            </p>

            <p>
              No vendemos ni compartimos información personal con terceros para fines de marketing.
            </p>

            <p>
              Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. Puede responder STOP para cancelar la suscripción o HELP para obtener ayuda.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E8E0D5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contacto:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:** `Create Spanish Privacy Policy page`

---

## CHANGE 4: Create Terms of Service Page (English)

**File:** `client/src/pages/TermsOfService.tsx` (NEW FILE)

**Create new file with this content:**
```typescript
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-8">
            Terms of Service
          </h1>

          <div className="space-y-6 font-body text-base text-[#1A1A18]/70 leading-relaxed">
            <p>
              By using this website, you agree to provide accurate information when submitting forms or contacting us.
            </p>

            <p>
              You consent to receive communication via phone, email, or text message regarding your inquiry. Message and data rates may apply. Message frequency may vary.
            </p>

            <p>
              You can opt out of SMS communications at any time by replying STOP.
            </p>

            <p>
              Mario Manzano is not responsible for any decisions made based on information provided on this website.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E8E0D5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contact:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:** `Create English Terms of Service page`

---

## CHANGE 5: Create Terms of Service Page (Spanish)

**File:** `client/src/pages/TermsOfServiceES.tsx` (NEW FILE)

**Create new file with this content:**
```typescript
export default function TermsOfServiceES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-8">
            Términos de Servicio
          </h1>

          <div className="space-y-6 font-body text-base text-[#1A1A18]/70 leading-relaxed">
            <p>
              Al utilizar este sitio web, usted acepta proporcionar información precisa al enviar formularios o comunicarse con nosotros.
            </p>

            <p>
              Usted da su consentimiento para recibir comunicaciones por teléfono, correo electrónico o mensajes de texto relacionadas con su consulta. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar.
            </p>

            <p>
              Puede cancelar la suscripción a los mensajes de texto en cualquier momento respondiendo STOP.
            </p>

            <p>
              Mario Manzano no se hace responsable de decisiones tomadas basadas en la información proporcionada en este sitio web.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E8E0D5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contacto:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:** `Create Spanish Terms of Service page`

---

## CHANGE 6: Add Routes to App.tsx

**File:** `client/src/App.tsx`

**FIND (Look for the route imports section at the top):**
```typescript
import Home from "@/pages/Home";
import HomeES from "@/pages/HomeES";
import SellerGuide from "@/pages/SellerGuide";
import SellerGuideES from "@/pages/SellerGuideES";
import Contact from "@/pages/Contact";
import ContactES from "@/pages/ContactES";
```

**ADD these imports after the existing ones:**
```typescript
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import PrivacyPolicyES from "@/pages/PrivacyPolicyES";
import TermsOfService from "@/pages/TermsOfService";
import TermsOfServiceES from "@/pages/TermsOfServiceES";
```

**THEN FIND (Look for the routes section):**
```typescript
      <Route path="/contact" component={Contact} />
      <Route path="/es/contacto" component={ContactES} />
```

**ADD these routes after the contact routes:**
```typescript
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/es/privacy-policy" component={PrivacyPolicyES} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/es/terms-of-service" component={TermsOfServiceES} />
```

**Commit Message:** `Add privacy and terms routes to App.tsx`

---

## CHANGE 7: Add Chat Widget to index.html

**File:** `client/index.html`

**FIND (Look for the closing `</body>` tag near the end of the file):**
```html
  </body>
</html>
```

**REPLACE WITH:**
```html
    <script src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="69cc1af2f10632131670f57c">
    </script>
  </body>
</html>
```

**Commit Message:** `Install LeadConnector chat widget globally`

---

## Summary

**Files Created:** 4 new pages
- PrivacyPolicy.tsx
- PrivacyPolicyES.tsx
- TermsOfService.tsx
- TermsOfServiceES.tsx

**Files Updated:** 3
- Footer.tsx (add location + links)
- App.tsx (add routes)
- index.html (add chat widget)

**After all changes:**
- Footer shows: "Brokered by eXp Realty · Leander, TX" (English) and "Representado por eXp Realty · Leander, TX" (Spanish)
- Privacy Policy and Terms links appear in footer
- Chat widget loads on all pages
- Full SMS compliance ready
