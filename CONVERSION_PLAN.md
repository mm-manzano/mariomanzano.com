# Mario Manzano Website — Conversion Plan

**Goal:** Transform the website into a clean conversion system that pushes qualified visitors into the GoHighLevel funnel while maintaining direct contact options.

**Current State:** Website is well-designed but has weak conversion mechanics. CTAs exist but don't clearly guide visitors toward the primary offer (Homeowner Guide funnel).

---

## 1. WEBSITE STRUCTURE PLAN

### Current Structure (Good Foundation)
- **Hero**: Strong positioning, clear value prop ✓
- **Intro Strip**: Establishes credibility ✓
- **Advisor Intro**: Personal connection ✓
- **Services Grid**: Shows 4 options (Sell, Remodel, Rent, Hold) — links to Homeowner Guide ✓
- **Market Insight**: Establishes expertise ✓
- **Testimonials**: Social proof ✓
- **Process Strip**: Shows 3-step process ✓
- **CTA Band**: Bottom conversion push ✓
- **Contact Page**: Direct contact options ✓

### What's Missing (Conversion Gaps)
1. **No clear primary funnel entry point** — Homeowner Guide should be the main conversion target, not a secondary link
2. **Services Grid links to guide but no call-to-action language** — Users don't know they're entering a funnel
3. **Contact page is a dead-end** — Visitors land there but no clear next step to the guide
4. **No "lead magnet" positioning** — Guide should feel like a valuable resource they want to claim, not just a page to read

### Recommended Structure (No Major Changes Needed)
Keep the current structure but **reframe the purpose of each section**:

| Section | Current Purpose | New Purpose | CTA |
|---------|-----------------|-------------|-----|
| Hero | Brand intro | Establish problem & position guide as solution | "Get the Homeowner Guide" |
| Services Grid | Show 4 options | Demonstrate guide value | Links to guide funnel entry |
| Process Strip | Show process | Build confidence in approach | Subtle link to guide |
| CTA Band | Generic conversation | **Primary funnel entry** | "Get the Homeowner Guide" |
| Contact Page | Direct contact | **Fallback for those not ready** | Keep as is |

---

## 2. CTA STRATEGY

### Current CTA Wording Problem
- **"Start a conversation"** — Vague, doesn't communicate value
- **"Get a plan"** — Better, but inconsistent
- **Issue**: No mention of the Homeowner Guide, which is your actual conversion vehicle

### Recommended CTA Strategy

#### **PRIMARY CTA: "Get the Homeowner Guide"**
- **Where**: Hero (top), CTA Band (bottom), Services Grid (cards)
- **Purpose**: Direct entry into GoHighLevel funnel
- **Message**: "Download the guide" or "Get your copy" (implies lead magnet)
- **Action**: Redirect to GoHighLevel funnel URL

#### **SECONDARY CTA: "Start a Conversation"**
- **Where**: Contact page, About page, bottom of guide pages
- **Purpose**: For visitors who want direct contact instead of guide
- **Message**: "Talk to me directly" or "Schedule a consultation"
- **Action**: SMS on mobile, Contact form on desktop

#### **TERTIARY CTA: "Learn More"**
- **Where**: Homeowner Guide page (if you host it), individual sections
- **Purpose**: Micro-conversions within content
- **Message**: "See how this applies to you"
- **Action**: Link to relevant guide section or contact

### CTA Hierarchy by Page

| Page | Primary CTA | Secondary CTA | Purpose |
|------|-------------|---------------|---------|
| Home (Hero) | "Get the Homeowner Guide" | — | Immediate funnel entry |
| Home (Services Grid) | "Explore in the Guide" | — | Funnel entry from context |
| Home (CTA Band) | "Get the Homeowner Guide" | "Talk to me" | Final conversion push |
| Homeowner Guide | "Get Your Copy" | "Questions?" | Funnel entry or contact |
| About | "Start a Conversation" | — | Personal connection → contact |
| Contact | "Start a Conversation" | Phone/Email | Direct contact methods |
| Selling Process | "Get the Homeowner Guide" | "Talk to me" | Funnel or direct contact |

---

## 3. MOBILE VS DESKTOP BEHAVIOR

### Current Behavior
- **Mobile**: SMS opens (512) 695-9255
- **Desktop**: Redirects to Contact page
- **Problem**: Inconsistent experience, doesn't push to funnel

### Recommended Behavior

#### **Mobile CTA Behavior**
| CTA Type | Mobile Action | Why |
|----------|---------------|-----|
| "Get the Homeowner Guide" | **Redirect to GoHighLevel funnel** | Same as desktop; funnel is mobile-optimized |
| "Start a Conversation" | SMS to (512) 695-9255 | Low friction, immediate contact |
| "Schedule a Consultation" | SMS or calendar link | Mobile users prefer SMS |

#### **Desktop CTA Behavior**
| CTA Type | Desktop Action | Why |
|----------|----------------|-----|
| "Get the Homeowner Guide" | Redirect to GoHighLevel funnel | Funnel captures email, qualifies lead |
| "Start a Conversation" | Contact page or form | Allows detailed message |
| "Schedule a Consultation" | Calendar link (Calendly) or form | Desktop users expect scheduling tools |

#### **Key Mobile Optimization**
1. **Buttons should be full-width on mobile** (already done ✓)
2. **Funnel URL should be mobile-responsive** (verify with GoHighLevel)
3. **SMS should still work as fallback** for those who prefer texting
4. **No forms on mobile** — too much friction

---

## 4. FORM STRATEGY

### Current Approach
- **No forms on website** ✓
- **Direct contact methods only** ✓
- **Contact page has phone, email, text options** ✓

### Recommended Approach: Keep It Simple

**Rule: Forms live in the funnel, not on the website.**

| Scenario | Where Form Lives | Why |
|----------|------------------|-----|
| Lead magnet (guide) | GoHighLevel funnel | Captures email, qualifies, nurtures |
| Direct contact | Contact page (no form) | SMS or phone call |
| Consultation booking | Calendly or GoHighLevel | Funnel handles scheduling |

**Why no forms on the website:**
- Funnel is already built in GoHighLevel
- Funnel has email capture, qualification, automation
- Website forms create duplicate data entry
- Funnel has better conversion tracking

---

## 5. FUNNEL INTEGRATION

### Current State
- Website mentions guide but doesn't funnel to it
- No clear entry point to GoHighLevel funnel
- Visitors can read about the guide but can't claim it

### Recommended Integration

#### **Step 1: Identify Funnel URL**
Get your GoHighLevel funnel URL. It should look like:
- `https://yourname.gohighlevel.com/...` or
- `https://yourdomain.com/guide` (if custom domain)

#### **Step 2: Update CTA Links**
Replace current CTA behavior:

**Current (ctaLinks.ts):**
```typescript
// Mobile: SMS
// Desktop: /contact page
```

**New (ctaLinks.ts):**
```typescript
// BOTH mobile & desktop: Redirect to GoHighLevel funnel
// Fallback: Contact page for those who skip funnel
```

#### **Step 3: Placement Strategy**

| Placement | CTA Text | Funnel Entry |
|-----------|----------|--------------|
| Hero button | "Get the Homeowner Guide" | → Funnel |
| Services Grid cards | "Explore in the Guide" | → Funnel |
| CTA Band (bottom) | "Get the Homeowner Guide" | → Funnel |
| Homeowner Guide page | "Get Your Copy" | → Funnel |
| Contact page | "Start a Conversation" | → SMS or form |

#### **Step 4: Tracking & Attribution**
Add UTM parameters to funnel links:
```
https://[funnel-url]?utm_source=website&utm_medium=cta&utm_campaign=hero
https://[funnel-url]?utm_source=website&utm_medium=cta&utm_campaign=services-grid
https://[funnel-url]?utm_source=website&utm_medium=cta&utm_campaign=cta-band
```

This lets you see which CTAs convert best.

---

## 6. WHAT TO REMOVE (CONVERSION KILLERS)

### Remove These Elements

| Element | Current Location | Why Remove | Alternative |
|---------|-----------------|-----------|-------------|
| "My Story" button (About link) | Home page, Advisor Intro section | Distracts from guide CTA | Keep as subtle text link |
| Generic "Start a conversation" on hero | Home hero | Too vague, doesn't mention guide | Replace with "Get the Homeowner Guide" |
| Contact page as primary CTA | CTA Band | Dead-end, no funnel | Replace with funnel link |
| Multiple CTAs on same section | Services Grid | Confuses visitors | One CTA per card: "Explore in the Guide" |
| "Talk to me" secondary buttons | Most pages | Competes with primary CTA | Keep only on Contact page |

### Keep These Elements
- ✓ Phone number (secondary contact)
- ✓ Email address (secondary contact)
- ✓ Social links (Instagram, Facebook)
- ✓ Testimonials (social proof)
- ✓ Process section (builds confidence)
- ✓ About section (personal connection)

---

## 7. IMPLEMENTATION PLAN (PRIORITY ORDER)

### Phase 1: Setup (Day 1)
**Goal**: Get funnel URL and update CTA utility

1. **Get GoHighLevel funnel URL**
   - Ask: What's your funnel URL?
   - Format: `https://[funnel-url]`
   - Add UTM parameters for tracking

2. **Update `client/src/lib/ctaLinks.ts`**
   - Change `getCTALink()` to redirect to funnel for "get-guide" button type
   - Keep SMS fallback for "start-conversation"
   - Add funnel URL as environment variable

3. **Test locally**
   - Run `pnpm run dev`
   - Click CTAs, verify redirects work
   - Test on mobile and desktop

### Phase 2: Homepage Updates (Day 1-2)
**Goal**: Make guide the primary conversion target

4. **Update Hero CTA**
   - Change: "Start a conversation" → "Get the Homeowner Guide"
   - Add: ArrowRight icon (already styled)
   - Test on mobile/desktop

5. **Update Services Grid**
   - Change: "More in the Homeowner Guide" → "Explore in the Guide"
   - Make cards clickable to funnel (not just guide page)
   - Test hover states

6. **Update CTA Band (bottom)**
   - Change: "Start a conversation" → "Get the Homeowner Guide"
   - Keep copy: "Understanding your situation" (good context)
   - Test button styling

### Phase 3: Secondary Pages (Day 2)
**Goal**: Consistent CTAs across all pages

7. **Update Homeowner Guide page**
   - Change: "Get a plan" → "Get Your Copy" (if it has a CTA)
   - Link to funnel, not just page

8. **Update Selling Process page**
   - Primary: "Get the Homeowner Guide"
   - Secondary: "Start a Conversation"

9. **Update Contact page**
   - Keep as is (fallback for direct contact)
   - Add note: "Or get the Homeowner Guide first"

### Phase 4: Spanish Pages (Day 2-3)
**Goal**: Same funnel entry for Spanish visitors

10. **Update Spanish CTAs**
    - HomeES: "Obtén la Guía para Propietarios"
    - GuiaParaPropietarios: "Obtén tu Copia"
    - SellerGuideES: "Obtén la Guía para Propietarios"

### Phase 5: Testing & Deployment (Day 3)
**Goal**: Verify everything works, deploy

11. **QA Testing**
    - Click every CTA on every page
    - Verify funnel URL loads
    - Test mobile and desktop
    - Check Meta Pixel fires on funnel entry
    - Verify GTM tracking works

12. **Build & Deploy**
    - `pnpm run build`
    - Verify dist/ has correct links
    - Push to GitHub
    - Verify live site works

13. **Monitor & Optimize**
    - Check GoHighLevel for lead volume
    - Monitor funnel conversion rate
    - A/B test CTA wording if needed

---

## 8. QUICK REFERENCE: CTA CHANGES

### Before (Current)
```
Hero: "Start a conversation" → SMS or Contact page
Services Grid: "More in the Homeowner Guide" → Guide page
CTA Band: "Start a conversation" → SMS or Contact page
```

### After (Recommended)
```
Hero: "Get the Homeowner Guide" → GoHighLevel funnel
Services Grid: "Explore in the Guide" → GoHighLevel funnel
CTA Band: "Get the Homeowner Guide" → GoHighLevel funnel
Contact page: "Start a Conversation" → SMS (mobile) or form (desktop)
```

---

## 9. EXPECTED OUTCOMES

### What Will Improve
- **Clarity**: Visitors know exactly what to do (get the guide)
- **Conversion**: Funnel captures email, qualifies leads, sends to GoHighLevel
- **Tracking**: UTM parameters show which CTAs drive most leads
- **Mobile**: Consistent experience across devices
- **Funnel Integration**: Seamless handoff from website to GoHighLevel

### What Stays the Same
- Design and layout (no major changes)
- Brand voice and messaging
- Direct contact options (phone, email, SMS)
- About and testimonial sections

### What Gets Better
- **Lead quality**: Funnel qualifies visitors before they reach you
- **Lead volume**: Clear CTAs drive more funnel entries
- **Automation**: GoHighLevel nurtures leads while you focus on clients
- **Attribution**: UTM tracking shows ROI of each CTA placement

---

## 10. NEXT STEPS

1. **Provide funnel URL** — What's your GoHighLevel funnel URL?
2. **Confirm CTA wording** — Do you like "Get the Homeowner Guide" or prefer different wording?
3. **Approve implementation plan** — Should I proceed with Phase 1 updates?
4. **Deploy and monitor** — After launch, track lead volume and conversion rate

---

**Summary**: Your website is well-built. The main issue is weak conversion mechanics. By making the Homeowner Guide the primary CTA and routing all qualified visitors to your GoHighLevel funnel, you'll see immediate improvements in lead volume and quality. The changes are simple, non-disruptive, and can be implemented in 2-3 days.
