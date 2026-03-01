# 🏛️ Janamat Rewards - Design System Documentation# Janamat Rewards - Design System & Component Documentation

_Version: 1.0.0\*\*Last Updated: March 2026_---See individual component files in `/fe/components/` for implementation details and props documentation.## 📦 Component Usage Examples---7. **Accessibility** - Include proper ARIA labels and keyboard navigation6. **Error States** - Use error colors and clear messaging5. **Loading States** - Always provide feedback for async actions4. **Touch Targets** - Minimum 44x44px for mobile buttons3. **Proper Contrast** - Ensure text meets WCAG AA standards2. **Maintain Consistent Spacing** - Use the spacing scale (8px base)1. **Always use the Design Tokens** - Never hardcode colors outside the design system## 🎯 Best Practices---`grid-cols-1/* Tablet & Mobile */lg:grid-cols-2 gap-6/* Desktop */`css**Leaderboard Lists**`grid-cols-1/* Mobile */sm:grid-cols-2/* Tablet */lg:grid-cols-4/* Desktop */`css**Stats Cards**`grid-cols-1/* Tablet & Mobile */lg:grid-cols-2/* Desktop */`css**Mission Grid**### Grid Patterns`2xl: 1536pxxl:  1280pxlg:  1024pxmd:  768pxsm:  640px`### Breakpoints## 📱 Responsive Design---`<div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin" />/* Spinner */`css### Loading States`hover:bg-gray-50/* Pills */hover:bg-[#BE123C] active:scale-95/* Buttons */hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1/* Cards */`css### Hover Effects`transition-all duration-200 ease-out`css### Standard Transitions## ✨ Animation & Transitions---`</div>  </div>    </button>      <svg className="w-5 h-5" />      <span>View Missions</span>    <button className="bg-white text-[#E11D48] border-2 border-white hover:bg-white/90 px-6 py-3 rounded-full font-semibold text-base flex items-center gap-2">    {/* CTA Button */}        </div>      </div>        </div>          <span className="font-semibold">@Aayush</span>          <span className="text-white/80">Top Contributor: </span>        <div>        <span className="text-white/60">•</span>        </div>          <span className="font-semibold">5,842 points this week</span>          <svg className="w-5 h-5" />        <div className="flex items-center gap-2">      <div className="flex items-center gap-4 text-sm flex-wrap">      {/* Stats */}            </h2>        KATHMANDU-3      <h2 className="text-5xl font-bold leading-tight">      {/* Constituency Name */}            </div>        Constituency Spotlight      <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">      {/* Label */}    <div className="flex-1 space-y-4">  <div className="flex items-start justify-between gap-8"><div className="bg-gradient-to-br from-[#E11D48] to-[#BE123C] text-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(225,29,72,0.2)]">`jsx### Constituency Spotlight (Hero Card)---``</div>  </div>    </div>      2,450 pts    <div className="shrink-0 bg-[#6366F1] text-white px-4 py-2 rounded-full text-sm font-medium">    {/* Points Pill - Secondary/Indigo */}        </div>      </div>        </p>          @aayush        <p className="text-xs text-[#94A3B8]">        </h4>          Aayush Sharma        <h4 className="text-base font-bold text-[#0F172A] truncate">      <div className="flex-1 min-w-0">      {/* Name & Handle */}            </div>        A      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white font-bold ring-2 ring-white">      {/* Avatar */}            <div className="text-2xl min-w-[3rem]">🥇</div>      {/* Rank */}    <div className="flex items-center gap-4 flex-1 min-w-0">  <div className="relative flex items-center justify-between gap-4">  {/* Content */}    />    style={{ width: `${progress}%` }}    className="absolute left-0 top-0 bottom-0 bg-[#EEF2FF] transition-all duration-300 group-hover:bg-[#E0E7FF]"  <div   {/* Progress Bar - Indigo tint */}<div className="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">``jsx#### Citizen Leaderboard Row``</div>  </div>    </div>      5,842 pts    <div className="shrink-0 bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium">    {/* Points Pill */}        </div>      </div>        </p>          8 active missions        <p className="text-xs text-[#94A3B8]">        </h4>          Kathmandu-3        <h4 className="text-base font-bold text-[#0F172A] truncate">      <div className="flex-1 min-w-0">      {/* Name */}            </div>        #1      <div className="flex items-center justify-center font-bold text-lg min-w-[3rem] text-[#475569]">      {/* Rank */}    <div className="flex items-center gap-4 flex-1 min-w-0">  <div className="relative flex items-center justify-between gap-4">  {/* Content */}    />    style={{ width: `${progress}%` }}    className="absolute left-0 top-0 bottom-0 bg-[#FFF1F2] transition-all duration-300 group-hover:bg-[#FFE4E6]"  <div   {/* Progress Bar Background */}<div className="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">``jsx#### Constituency Leaderboard Row### Leaderboard Row (Detailed Spec)---`</div>  </div>    </div>      </button>        View Details      <button className="flex-1 bg-white border-2 border-[#ECE7E4] text-[#0F172A] px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:bg-gray-50 active:scale-95">      </button>        Start      <button className="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">    <div className="flex items-center gap-3 pt-2">    {/* Buttons */}        </div>      </div>        <span className="text-sm font-bold text-[#E11D48]">+150 pts</span>        </div>          <span className="text-sm font-medium text-[#475569]">Vote</span>          <span className="text-lg">🗳️</span>        <div className="flex items-center gap-2">      <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">    <div className="space-y-2 py-2">    {/* Actions */}        </p>      {description}    <p className="text-sm text-[#475569] line-clamp-2">    {/* Description */}        </h3>      {title}    <h3 className="text-xl font-bold text-[#0F172A] leading-tight">    {/* Title */}        </div>      </div>        Category      <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: categoryBg, color: categoryText }}>      </div>        Nepal      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">      </div>        Active        <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>      <div className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">    <div className="flex items-center gap-2 flex-wrap">    {/* Badges */}  <div className="p-6 space-y-4">  {/* Content */}    </div>    </div>      {constituency}    <div className="bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">  <div className="h-32 rounded-t-2xl flex items-start p-4" style={{ backgroundColor: bannerColor }}>  {/* Banner */}<div className="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1 transition-all duration-200 overflow-hidden">`jsx#### Tailwind Classes Recipe`  └─ Participants Count (text-xs text-[#94A3B8])  │   └─ View Details Button (outline, flex-1)  │   ├─ Start Button (primary, flex-1)  ├─ Button Row (flex gap-3)  │       └─ Points (text-sm font-bold text-[#E11D48])  │       ├─ Icon (text-lg) + Label (text-sm font-medium)  │   └─ Action Row (for each action)  ├─ Actions List (space-y-2)  ├─ Description (text-sm text-[#475569] line-clamp-2)  ├─ Title (text-xl font-bold text-[#0F172A])  │   └─ Category Pill (colored)  │   ├─ Country Pill (neutral)  │   ├─ Active Pill (green with dot)  ├─ Badge Row (flex gap-2)Content Section (p-6)  └─ Constituency Pill (overlay, top-left, p-4)  ├─ Background: mission.bannerColor (pastel tint)Banner Section (height: 128px = h-32)Card Container: bg-white rounded-2xl border border-[#ECE7E4] shadow-card`#### Layout Structure### Mission Card (Detailed Spec)---`Footer  └─ Load More Button  │   └─ Top Citizens (right)  │   ├─ Top Constituencies (left)  ├─ Leaderboard Lists (2 columns)  ├─ Constituency Spotlight (hero card)  │   └─ Search + Filter Pills (right)  │   ├─ Time Filter Pills (Weekly, Monthly, All-time)  ├─ Controls Row  │   └─ Subtitle (text-lg text-[#475569])  │   ├─ Title (text-5xl font-bold)  ├─ Page HeaderMain Container (max-w-[1280px] mx-auto px-6 py-8)  └─ Notification + Wallet buttons (right)  ├─ Nav: Missions, Leaderboard, Rewards, Profile (center)  ├─ Logo + Title (left)Header (with navigation links)`#### Structure### Leaderboard Page---`Mobile (sm):   stack everything, single columnTablet (md):   grid-cols-1 for missions, grid-cols-2 for statsDesktop (lg):  grid-cols-2 for missions, grid-cols-4 for stats`#### Responsive Breakpoints`Footer  └─ Load More Button  │   └─ Mission Grid  │   ├─ Section Header  ├─ All Missions Section  │   └─ Mission Grid (2 columns on desktop)  │   ├─ Section Header (with icon)  ├─ Featured Missions Section  ├─ Stats Cards Grid (4 columns on desktop)  ├─ Tabs (filter)  ├─ Search Bar RowMain Container (max-w-[1280px] mx-auto px-6 py-8)  └─ Connect Wallet + Verify Citizen buttons (right)  ├─ Logo + Title + Subtitle (left)Header (sticky, 80px height)`#### Structure### Dashboard Page## 📄 Page Layouts---`Value:  text-3xl font-bold text-[#0F172A] (or text-[#E11D48] for highlight)Label:  text-xs uppercase text-[#94A3B8] font-semibold tracking-widerContainer: bg-white rounded-2xl border border-[#ECE7E4] shadow-card p-6`css#### Small Metric Card### Stat Card---`Large:  w-12 h-12Medium: w-10 h-10Small:  w-8 h-8Sizes:bg-[#E11D48] text-white shadow-smActive State:          flex items-center justify-center hover:bg-gray-50Tailwind: w-10 h-10 rounded-full bg-white border border-[#ECE7E4] `css#### Circular Icon Button### Icon Button---`Input: pl-12 pr-4 py-3Icon: absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]Container: relativeWith Icon (left):          placeholder:text-[#94A3B8]          focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20Tailwind: bg-white border border-[#ECE7E4] rounded-xl px-4 py-3 text-base`css#### Text Input### Input---`Large:  px-5 py-2.5 text-baseMedium: px-4 py-2 text-smSmall:  px-3 py-1 text-xs`#### Sizes`Tailwind: bg-white border border-[#ECE7E4] text-gray-700 px-4 py-2 rounded-full text-sm font-medium`css**Outline Pill**`Tailwind: bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium`css**Neutral Pill**`Tailwind: bg-[#FFF1F2] text-[#E11D48] px-3 py-1 rounded-full text-xs font-medium`css**Category Pill** (Pink/Red)`Includes: green dot (w-2 h-2 rounded-full bg-[#22C55E])Tailwind: bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium`css**Active Pill** (Green with dot)`Tailwind: bg-[#6366F1] text-white px-4 py-2 rounded-full text-sm font-medium`css**Secondary Pill** (Indigo)`Tailwind: bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium`css**Primary Pill** (Red)#### Variants### Pill (Badge/Tag)---`Large:  p-8Medium: p-6Small:  p-4`#### Padding Options`hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1 transition-all duration-200With Hover Effect:Tailwind: bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)]`css#### Base Card### Card---`Large:  px-8 py-4 text-lgMedium: px-6 py-3 text-baseSmall:  px-4 py-2 text-sm`#### Sizes`Tailwind: bg-transparent text-[#475569] hover:bg-gray-100 rounded-full`css**Ghost Button**`Tailwind: bg-white border-2 border-[#ECE7E4] text-[#0F172A] hover:bg-gray-50 hover:border-[#CBD5E1] rounded-full`css**Outline Button**`Tailwind: bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-sm hover:shadow-md rounded-full`css**Secondary Button** (Solid Indigo)`- Disabled: opacity-50, cursor-not-allowed- Active: scale-95 (subtle press effect)- Hover: bg-[#BE123C], slight shadow increase- Default: bg-[#E11D48], white textStates:Tailwind: bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-sm hover:shadow-md rounded-full`css**Primary Button** (Solid Red)#### Variants### Button## 🧱 Component Specifications---`Bold: 700Semibold: 600Medium: 500Normal: 400`### Font Weights`6xl:  60px  (3.75rem)  - line-height: 60px5xl:  48px  (3rem)     - line-height: 48px4xl:  36px  (2.25rem)  - line-height: 40px3xl:  30px  (1.875rem) - line-height: 36px2xl:  24px  (1.5rem)   - line-height: 32pxxl:   20px  (1.25rem)  - line-height: 28pxlg:   18px  (1.125rem) - line-height: 28pxbase: 16px  (1rem)     - line-height: 24pxsm:   14px  (0.875rem) - line-height: 20pxxs:   12px  (0.75rem)  - line-height: 16px`### Font Sizes`Import: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');Primary: 'Inter', system-ui, -apple-system, sans-serif`### Font Family## 🔤 Typography---`Header Height: 80pxSidebar Width: 280pxContent Width: 1120pxMax Container Width: 1280px`### Layout Constraints`Large: 0 10px 15px rgba(16, 24, 40, 0.1)Medium: 0 4px 6px rgba(16, 24, 40, 0.07)Small: 0 1px 2px rgba(16, 24, 40, 0.05)Card Hover: 0 20px 40px rgba(16, 24, 40, 0.12)Card: 0 10px 30px rgba(16, 24, 40, 0.08)`### Shadows`Badge: 8px (rounded-lg)Input: 12px (rounded-xl)Pill: 9999px (rounded-full)Button: 9999px (rounded-full)Card: 16px (rounded-2xl)`### Border Radius`4xl: 64px  (4rem)3xl: 48px  (3rem)2xl: 40px  (2.5rem)xl:  32px  (2rem)lg:  24px  (1.5rem)md:  16px  (1rem)sm:  12px  (0.75rem)xs:  8px   (0.5rem)`### Spacing Scale## 📐 Spacing & Layout---`Governance: { bg: #F3E8FF, text: #7C3AED }Environment: { bg: #DCFCE7, text: #166534 }Infrastructure: { bg: #FEF3C7, text: #92400E }Education: { bg: #EEF2FF, text: #6366F1 }Health: { bg: #FFF1F2, text: #E11D48 }`#### Category Colors (for pills)`Dark: #CBD5E1Light: #F1F5F9Default: #ECE7E4 (subtle warm gray)`#### Border Colors`White: #FFFFFFMuted: #94A3B8 (slate 400)Secondary: #475569 (slate 600)Primary: #0F172A (slate 900)`#### Text Colors`  - Text: #991B1B  - Background: #FEE2E2Error:  - Text: #92400E  - Background: #FEF3C7Warning:  - Dot: #22C55E (green)  - Text: #166534 (dark green)  - Background: #DCFCE7 (light green)Active:`#### Status Colors`Secondary Text: #FFFFFFSecondary Light: #EEF2FFSecondary Hover: #4F46E5Secondary: #6366F1 (indigo)`#### Secondary - Soft Blue/Purple`Primary Text: #FFFFFFPrimary Light: #FFF1F2Primary Hover: #BE123CPrimary: #E11D48`#### Primary Brand - Deep Red`Muted Background: #F9FAFBCard Surface: #FFFFFF (pure white)Primary Background: #F7F4F2 (warm light gray)`#### Background Colors### Color Palette## 🎨 Design Tokens---This document contains the complete design system for Janamat Rewards, a Solana-based civic engagement platform. The design follows a modern civic-tech aesthetic with clean, trustworthy UI elements.## Overview

## 🎨 Design System Overview

Janamat Rewards is a civic-tech platform for engaging citizens in meaningful participation. The design system follows a clean, trustworthy aesthetic with careful attention to accessibility and usability.

---

## 📐 Design Tokens

### Color Palette

#### Backgrounds

```css
Background Primary: #F7F4F2  /* Warm light gray page background */
Card Surface: #FFFFFF        /* Pure white for cards */
Muted: #F9FAFB              /* Very light gray */
```

#### Primary Brand - Deep Red

```css
PRIMARY: #E11D48             /* Main brand color */
PRIMARY_HOVER: #BE123C       /* Hover state */
PRIMARY_LIGHT: #FFF1F2       /* Light backgrounds */
```

#### Secondary - Soft Blue/Purple

```css
SECONDARY: #6366F1           /* Indigo */
SECONDARY_HOVER: #4F46E5     /* Darker indigo */
SECONDARY_LIGHT: #EEF2FF     /* Light indigo background */
```

#### Status Colors

```css
/* Active Status */
Active BG: #DCFCE7           /* Light green */
Active Text: #166534         /* Dark green */
Active Dot: #22C55E          /* Green indicator */

/* Borders */
Border: #ECE7E4              /* Subtle warm gray */
Border Light: #F1F5F9
Border Dark: #CBD5E1
```

#### Text Colors

```css
Primary Text: #0F172A        /* Slate 900 - main content */
Secondary Text: #475569      /* Slate 600 - descriptions */
Muted Text: #94A3B8          /* Slate 400 - metadata */
```

### Spacing Scale

```
xs:  8px   (0.5rem)
sm:  12px  (0.75rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 40px  (2.5rem)
3xl: 48px  (3rem)
4xl: 64px  (4rem)
```

### Border Radius

```
Card: 16px (rounded-2xl)
Button: 9999px (rounded-full)
Pill: 9999px (rounded-full)
Input: 12px (rounded-xl)
Badge: 8px (rounded-lg)
```

### Shadows

```css
Card: 0 10px 30px rgba(16, 24, 40, 0.08)
Card Hover: 0 20px 40px rgba(16, 24, 40, 0.12)
Small: 0 1px 2px rgba(16, 24, 40, 0.05)
Medium: 0 4px 6px rgba(16, 24, 40, 0.07)
Large: 0 10px 15px rgba(16, 24, 40, 0.1)
```

### Typography

```
Font Family: 'Inter', system-ui, -apple-system, sans-serif

Sizes:
xs:   12px / 16px line height
sm:   14px / 20px line height
base: 16px / 24px line height
lg:   18px / 28px line height
xl:   20px / 28px line height
2xl:  24px / 32px line height
3xl:  30px / 36px line height
4xl:  36px / 40px line height
5xl:  48px / 1 line height
6xl:  60px / 1 line height

Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
```

---

## 🧩 Component Library

### 1. Button Component

**File:** `fe/components/ui/Button.tsx`

#### Variants

**Primary (Solid Red)**

```tsx
<Button variant="primary" size="md">
  Start Mission
</Button>
```

**Tailwind Classes:**

```
bg-[#E11D48] hover:bg-[#BE123C] text-white
rounded-full px-6 py-3 font-semibold
shadow-sm hover:shadow-md active:scale-95
```

**Secondary (Solid Indigo)**

```tsx
<Button variant="secondary" size="md">
  View Details
</Button>
```

**Tailwind Classes:**

```
bg-[#6366F1] hover:bg-[#4F46E5] text-white
rounded-full px-6 py-3 font-semibold
```

**Outline (White with Border)**

```tsx
<Button variant="outline" size="md">
  Connect Wallet
</Button>
```

**Tailwind Classes:**

```
bg-white border-2 border-[#ECE7E4] text-[#0F172A]
hover:bg-gray-50 hover:border-[#CBD5E1]
rounded-full px-6 py-3 font-semibold
```

**Ghost (Transparent)**

```tsx
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

**Tailwind Classes:**

```
bg-transparent text-[#475569] hover:bg-gray-100
rounded-full px-4 py-2
```

#### Sizes

- `sm`: `px-4 py-2 text-sm`
- `md`: `px-6 py-3 text-base` (default)
- `lg`: `px-8 py-4 text-lg`

#### Props

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}
```

---

### 2. Card Component

**File:** `fe/components/ui/Card.tsx`

#### Basic Usage

```tsx
<Card padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Tailwind Classes:**

```
bg-white rounded-2xl border border-[#ECE7E4]
shadow-[0_10px_30px_rgba(16,24,40,0.08)]
hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)]
hover:-translate-y-1 transition-all duration-200
```

#### Padding Options

- `none`: No padding
- `sm`: `p-4`
- `md`: `p-6` (default)
- `lg`: `p-8`

#### With Banner

```tsx
<Card banner bannerColor="#FFE4E6">
  {/* Content */}
</Card>
```

---

### 3. Pill Component (Badge/Tag)

**File:** `fe/components/ui/Pill.tsx`

#### Variants

**Primary (Red)**

```tsx
<Pill variant="primary" size="md">
  KATHMANDU-3
</Pill>
```

**Tailwind Classes:** `bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium`

**Active (Green with Dot)**

```tsx
<Pill variant="active" size="sm" dot>
  Active
</Pill>
```

**Tailwind Classes:** `bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium`

**Category (Pink)**

```tsx
<Pill variant="category" size="sm">
  Health
</Pill>
```

**Tailwind Classes:** `bg-[#FFF1F2] text-[#E11D48] px-3 py-1 rounded-full text-xs font-medium`

**Secondary (Indigo)**

```tsx
<Pill variant="secondary" size="md">
  2,450 pts
</Pill>
```

**Tailwind Classes:** `bg-[#6366F1] text-white px-4 py-2 rounded-full text-sm font-medium`

**Neutral (Gray)**

```tsx
<Pill variant="neutral" size="sm">
  Nepal
</Pill>
```

**Tailwind Classes:** `bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium`

---

### 4. Input Component

**File:** `fe/components/ui/Input.tsx`

#### Search Input with Icon

```tsx
<Input
  type="search"
  placeholder="Search missions..."
  icon={<SearchIcon />}
  iconPosition="left"
  fullWidth
/>
```

**Tailwind Classes:**

```
bg-white border border-[#ECE7E4] rounded-xl px-4 py-3 text-base
focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20
focus:border-[#E11D48]
```

---

### 5. StatCard Component

**File:** `fe/components/ui/StatCard.tsx`

#### Usage

```tsx
<StatCard label="YOUR POINTS" value="2,450" highlight icon={<StarIcon />} />
```

**Layout Structure:**

```
+------------------------+
| LABEL (xs, uppercase)  |  [Icon]
| Value (3xl, bold, red) |
+------------------------+
```

**Tailwind Classes:**

```
Container: bg-white rounded-2xl border border-[#ECE7E4] shadow-card p-6
Label: text-xs uppercase text-[#94A3B8] font-semibold tracking-wider
Value (Highlight): text-3xl font-bold text-[#E11D48]
Value (Normal): text-3xl font-bold text-[#0F172A]
```

---

### 6. Header Component

**File:** `fe/components/layout/Header.tsx`

#### Layout Structure

```
+-------------------------------------------------------------+
| [Logo] Janamat Rewards  |  [Nav Links]  |  [Wallet] [CTA]  |
|        subtitle          |              |                   |
+-------------------------------------------------------------+
```

**Tailwind Classes:**

```
Container: bg-white border-b border-[#ECE7E4] sticky top-0 z-50
Inner: max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between
Logo: text-xl font-bold text-[#0F172A] hover:text-[#E11D48]
Subtitle: text-xs text-[#94A3B8]
```

#### Variants

- `dashboard`: Simple layout with wallet + verify buttons
- `leaderboard`: Includes navigation links (Missions, Leaderboard, Rewards, Profile)

---

### 7. SearchBar Component

**File:** `fe/components/layout/SearchBar.tsx`

#### Layout

```
[ Search Input ----------------------- ] [Filter 🔽] [Sort ⬍]
```

**Tailwind Classes:**

```
Container: flex items-center gap-3 w-full
Input: flex-1 (uses Input component)
Icon Buttons: w-10 h-10 rounded-full border border-[#ECE7E4]
```

---

### 8. Tabs Component (Pill Tabs)

**File:** `fe/components/layout/Tabs.tsx`

#### Usage

```tsx
<Tabs
  tabs={[
    { id: "trending", label: "Trending", count: 12 },
    { id: "new", label: "New Missions" },
  ]}
  activeTab="trending"
  onChange={setActiveTab}
/>
```

**Tailwind Classes:**

```
Container: flex items-center gap-2 flex-wrap
Active Tab: bg-[#E11D48] text-white px-4 py-2 rounded-full font-medium shadow-sm
Inactive Tab: bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full hover:bg-gray-50
```

---

### 9. MissionCard Component

**File:** `fe/components/mission/MissionCard.tsx`

#### Layout Structure

```
+----------------------------------+
|  Banner (pastel color, ~128px)   |
|  [CONSTITUENCY pill]             |
+----------------------------------+
| [Active] [Nepal] [Category]      |
|                                  |
| Mission Title (xl, bold)         |
| Description (2 lines, muted...) |
|                                  |
| 🗳️ Vote           +150 pts      |
| 💬 Comment        +50 pts       |
| 📝 Proposal       +100 pts      |
| 📸 Upload         +75 pts       |
|                                  |
| [Start]   [View Details]         |
| 342 participants                 |
+----------------------------------+
```

**Key Tailwind Classes:**

```
Card: Uses Card component with padding="none" hover
Banner: h-32 rounded-t-2xl (with dynamic background color)
Title: text-xl font-bold text-[#0F172A] leading-tight
Description: text-sm text-[#475569] line-clamp-2
Action Row: flex items-center justify-between py-2 border-b border-[#F1F5F9]
Points: text-sm font-bold text-[#E11D48]
```

---

### 10. MissionGrid Component

**File:** `fe/components/mission/MissionGrid.tsx`

**Tailwind Classes:**

```
grid grid-cols-1 lg:grid-cols-2 gap-6
```

**Responsive:**

- Mobile: 1 column
- Desktop (lg): 2 columns
- Gap: 24px (gap-6)

---

### 11. ConstituencySpotlight Component

**File:** `fe/components/leaderboard/ConstituencySpotlight.tsx`

#### Layout Structure

```
+-----------------------------------------------------+
| [CONSTITUENCY SPOTLIGHT pill]                       |
| KATHMANDU-3 (5xl, bold)                            |
| 📈 5,842 pts • Top: @Aayush    [View Missions →]  |
+-----------------------------------------------------+
```

**Tailwind Classes:**

```
bg-gradient-to-br from-[#E11D48] to-[#BE123C] text-white
rounded-2xl p-8 shadow-[0_20px_40px_rgba(225,29,72,0.2)]
Label: px-3 py-1 bg-white/20 rounded-full text-xs uppercase backdrop-blur-sm
Title: text-5xl font-bold
Stats: text-sm with icons
```

---

### 12. ConstituencyLeaderboardList Component

**File:** `fe/components/leaderboard/ConstituencyLeaderboardList.tsx`

#### Row Layout

```
[ 🥇 ] Kathmandu-3                    [5,842 pts]
================================================== (progress bar)
```

**Tailwind Classes:**

```
Container: bg-white rounded-2xl border border-[#ECE7E4] shadow-card
Header: px-6 py-4 border-b bg-gray-50
Row: px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer relative
Progress Bar: absolute left-0 top-0 bottom-0 bg-[#FFF1F2] (width based on %)
Rank: font-bold text-lg (emoji for top 3)
Points Pill: variant="primary"
```

---

### 13. CitizenLeaderboardList Component

**File:** `fe/components/leaderboard/CitizenLeaderboardList.tsx`

#### Row Layout

```
[ 🥇 ] [Avatar] Aayush Sharma        [2,450 pts]
               @aayush
================================================== (progress bar)
```

**Tailwind Classes:**

```
Container: bg-white rounded-2xl border border-[#ECE7E4] shadow-card
Row: px-6 py-4 hover:bg-gray-50 relative
Progress Bar: bg-[#EEF2FF] (indigo tint)
Avatar: w-10 h-10 rounded-full ring-2 ring-white
Points Pill: variant="secondary" (indigo)
```

---

## 📱 Page Layouts

### Dashboard Page

**File:** `fe/app/dashboard/page.tsx`

#### Structure

```
[ Header (sticky) ]
┌─────────────────────────────────────────┐
│ Max Width Container (1280px)            │
│                                          │
│ [ Search Bar ]                           │
│                                          │
│ [ Tabs: Trending | New | ... ]          │
│                                          │
│ [ StatCard ] [ StatCard ] [ StatCard ]   │
│ [ StatCard ]                             │
│                                          │
│ 🚀 Featured Missions                     │
│ [ MissionGrid (2 col) ]                  │
│                                          │
│ 📋 All Missions                          │
│ [ MissionGrid (2 col) ]                  │
│                                          │
│ [ Load More button ]                     │
└─────────────────────────────────────────┘
[ Footer ]
```

**Key Container Classes:**

```
min-h-screen bg-[#F7F4F2]
Main: max-w-[1280px] mx-auto px-6 py-8 space-y-8
Stats Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
```

---

### Leaderboard Page

**File:** `fe/app/leaderboard/page.tsx`

#### Structure

```
[ Header with Nav (sticky) ]
┌─────────────────────────────────────────┐
│ Max Width Container (1280px)            │
│                                          │
│ Leaderboard (5xl, bold)                  │
│ Subtitle (lg, muted, 2 lines)            │
│                                          │
│ [Weekly] [Monthly] [All-time]            │
│ [Search] [By Constituency▾] [Category▾] │
│                                          │
│ [ Constituency Spotlight Card ]          │
│                                          │
│ [ Top Constituencies ] [ Top Citizens ]  │
│       (2 columns)           (2 columns)  │
│                                          │
│ [ Load More Rankings button ]            │
└─────────────────────────────────────────┘
[ Footer ]
```

**Key Container Classes:**

```
min-h-screen bg-[#F7F4F2]
Main: max-w-[1280px] mx-auto px-6 py-8 space-y-8
Leaderboard Grid: grid-cols-1 lg:grid-cols-2 gap-6
```

---

## 🎯 Responsive Breakpoints

```
Mobile:  < 640px  (Tailwind: default)
Tablet:  ≥ 640px  (Tailwind: sm:)
Desktop: ≥ 1024px (Tailwind: lg:)
Wide:    ≥ 1280px (Tailwind: xl:)
```

### Responsive Patterns

**Mission Grid:**

- Mobile: `grid-cols-1` (single column)
- Desktop: `lg:grid-cols-2` (two columns)

**Stats Cards:**

- Mobile: `grid-cols-1` (stacked)
- Tablet: `sm:grid-cols-2` (2 across)
- Desktop: `lg:grid-cols-4` (4 across)

**Leaderboard Lists:**

- Mobile: `grid-cols-1` (stacked)
- Desktop: `lg:grid-cols-2` (side-by-side)

---

## 🎨 Animation & Transitions

### Hover Effects

```css
Button: active:scale-95 transition-all duration-200
Card: hover:-translate-y-1 hover:shadow-card-hover
Tabs: hover:bg-gray-50
List Rows: hover:bg-gray-50 transition-colors
```

### Loading States

```tsx
<Button loading>Processing...</Button>
```

Shows spinning icon inside button.

---

## ♿ Accessibility

- All interactive elements have keyboard support
- Focus states with visible outlines
- ARIA labels on icon-only buttons
- Semantic HTML throughout
- Color contrast meets WCAG AA standards
- Touch targets minimum 44x44px

---

## 🔧 Utility Patterns

### Common Tailwind Combinations

**Container:**

```
max-w-[1280px] mx-auto px-6 py-8
```

**Vertical Spacing:**

```
space-y-4  (16px gaps between children)
space-y-6  (24px gaps)
space-y-8  (32px gaps)
```

**Flex Row with Gap:**

```
flex items-center gap-3
```

**Text Truncation:**

```
truncate           (single line)
line-clamp-2       (2 lines)
```

**Hover Lift Effect:**

```
hover:-translate-y-1 hover:shadow-lg transition-all duration-200
```

---

## 📦 File Structure

```
fe/
├── app/
│   ├── dashboard/page.tsx
│   ├── leaderboard/page.tsx
│   ├── page.tsx (redirects to dashboard)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Pill.tsx
│   │   ├── Input.tsx
│   │   ├── IconButton.tsx
│   │   └── StatCard.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   └── Tabs.tsx
│   ├── mission/
│   │   ├── MissionCard.tsx
│   │   ├── MissionGrid.tsx
│   │   └── SectionHeader.tsx
│   └── leaderboard/
│       ├── ConstituencySpotlight.tsx
│       ├── ConstituencyLeaderboardList.tsx
│       └── CitizenLeaderboardList.tsx
├── config/
│   └── design-tokens.ts
├── hooks/
│   └── usePhantomWallet.ts
├── lib/
│   ├── utils.ts
│   └── mockData.ts
├── types/
│   └── index.ts
└── tailwind.config.ts
```

---

## 🚀 Quick Start Guide

1. **Install dependencies:**

```bash
cd fe
npm install
```

2. **Run development server:**

```bash
npm run dev
```

3. **View the app:**
   Open http://localhost:3000

---

## 💡 Implementation Tips

1. **Always use design tokens** from `config/design-tokens.ts`
2. **Maintain consistent spacing** using the spacing scale
3. **Use cn() utility** from `lib/utils.ts` for conditional classes
4. **Follow component prop patterns** for consistency
5. **Test responsive layouts** on mobile, tablet, and desktop
6. **Ensure hover states** are implemented on interactive elements
7. **Use semantic HTML** (nav, main, section, article, etc.)

---

This design system ensures visual consistency, maintainability, and a professional civic-tech aesthetic throughout Janamat Rewards.
