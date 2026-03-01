# 🎨 Component Recipes - Quick Implementation Guide

This document provides **exact Tailwind class recipes** for implementing Janamat Rewards components. Copy and paste these class combinations for 1:1 implementation.

---

## 🔘 Buttons

### Primary Button (Solid Red)

```html
<button
  class="bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-sm hover:shadow-md rounded-full px-6 py-3 font-semibold text-base transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Start Mission
</button>
```

### Secondary Button (Solid Indigo)

```html
<button
  class="bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-sm hover:shadow-md rounded-full px-6 py-3 font-semibold text-base transition-all duration-200 active:scale-95"
>
  View Details
</button>
```

### Outline Button (White with Border)

```html
<button
  class="bg-white border-2 border-[#ECE7E4] text-[#0F172A] hover:bg-gray-50 hover:border-[#CBD5E1] rounded-full px-6 py-3 font-semibold text-base transition-all duration-200 active:scale-95"
>
  Connect Wallet
</button>
```

### Ghost Button

```html
<button
  class="bg-transparent text-[#475569] hover:bg-gray-100 rounded-full px-4 py-2 font-semibold text-sm transition-all duration-200 active:scale-95"
>
  Cancel
</button>
```

### Button with Loading State

```html
<button
  class="bg-[#E11D48] text-white rounded-full px-6 py-3 font-semibold inline-flex items-center gap-2"
  disabled
>
  <svg
    class="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
  Processing...
</button>
```

---

## 🃏 Cards

### Basic Card

```html
<div
  class="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] p-6"
>
  <!-- Content here -->
</div>
```

### Card with Hover Effect

```html
<div
  class="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1 transition-all duration-200 p-6"
>
  <!-- Content here -->
</div>
```

### Card with Banner

```html
<div
  class="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] overflow-hidden"
>
  <!-- Banner -->
  <div class="h-32 rounded-t-2xl" style="background-color: #FFE4E6;">
    <!-- Banner content -->
  </div>
  <!-- Content -->
  <div class="p-6">
    <!-- Card content -->
  </div>
</div>
```

---

## 🏷️ Pills (Badges/Tags)

### Primary Pill (Red)

```html
<div
  class="bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
>
  KATHMANDU-3
</div>
```

### Secondary Pill (Indigo)

```html
<div
  class="bg-[#6366F1] text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
>
  2,450 pts
</div>
```

### Active Pill (Green with Dot)

```html
<div
  class="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
>
  <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
  Active
</div>
```

### Category Pill (Pink/Red)

```html
<div
  class="bg-[#FFF1F2] text-[#E11D48] px-3 py-1 rounded-full text-xs font-medium inline-flex items-center"
>
  Health
</div>
```

### Neutral Pill (Gray)

```html
<div
  class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center"
>
  Nepal
</div>
```

### Outline Pill

```html
<div
  class="bg-white border border-[#ECE7E4] text-gray-700 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center hover:bg-gray-50"
>
  By Constituency ▾
</div>
```

---

## 📝 Inputs

### Text Input

```html
<input
  type="text"
  placeholder="Enter text..."
  class="bg-white border border-[#ECE7E4] rounded-xl px-4 py-3 text-base text-[#0F172A] placeholder:text-[#94A3B8] w-full focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20 focus:border-[#E11D48] transition-all duration-200"
/>
```

### Search Input with Icon

```html
<div class="relative w-full">
  <svg
    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
  <input
    type="search"
    placeholder="Search missions..."
    class="bg-white border border-[#ECE7E4] rounded-xl pl-12 pr-4 py-3 text-base text-[#0F172A] placeholder:text-[#94A3B8] w-full focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20 focus:border-[#E11D48]"
  />
</div>
```

---

## 🔵 Icon Buttons

### Default Icon Button

```html
<button
  class="w-10 h-10 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center text-[#475569] hover:bg-gray-50 hover:border-[#CBD5E1] transition-all duration-200 active:scale-95"
>
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
</button>
```

### Active Icon Button

```html
<button
  class="w-10 h-10 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95"
>
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
    />
  </svg>
</button>
```

---

## 📊 Stat Card

```html
<div
  class="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] p-6 transition-all duration-200 hover:shadow-[0_10px_30px_rgba(16,24,40,0.12)]"
>
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <p
        class="text-xs uppercase text-[#94A3B8] font-semibold tracking-wider mb-2"
      >
        YOUR POINTS
      </p>
      <p class="text-3xl font-bold text-[#E11D48]">2,450</p>
    </div>
    <div class="text-[#94A3B8]">
      <!-- Icon here -->
      <svg
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    </div>
  </div>
</div>
```

---

## 📋 Mission Card (Complete)

```html
<div
  class="bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1 transition-all duration-200 overflow-hidden"
>
  <!-- Banner -->
  <div
    class="h-32 rounded-t-2xl flex items-start justify-start p-4"
    style="background-color: #FFE4E6;"
  >
    <div
      class="bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
    >
      KATHMANDU-3
    </div>
  </div>

  <!-- Content -->
  <div class="p-6 space-y-4">
    <!-- Badge Row -->
    <div class="flex items-center gap-2 flex-wrap">
      <div
        class="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
      >
        <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
        Active
      </div>
      <div
        class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
      >
        Nepal
      </div>
      <div
        class="bg-[#FFF1F2] text-[#E11D48] px-3 py-1 rounded-full text-xs font-medium"
      >
        Health
      </div>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold text-[#0F172A] leading-tight">
      Healthcare Accessibility Survey
    </h3>

    <!-- Description -->
    <p class="text-sm text-[#475569] line-clamp-2">
      Help us understand healthcare access in your area. Share your experience
      with local health facilities.
    </p>

    <!-- Actions List -->
    <div class="space-y-2 py-2">
      <div
        class="flex items-center justify-between py-2 border-b border-[#F1F5F9]"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">🗳️</span>
          <span class="text-sm font-medium text-[#475569]"
            >Vote on Priority Areas</span
          >
        </div>
        <span class="text-sm font-bold text-[#E11D48]">+150 pts</span>
      </div>
      <div
        class="flex items-center justify-between py-2 border-b border-[#F1F5F9]"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">💬</span>
          <span class="text-sm font-medium text-[#475569]"
            >Share Your Experience</span
          >
        </div>
        <span class="text-sm font-bold text-[#E11D48]">+50 pts</span>
      </div>
      <div
        class="flex items-center justify-between py-2 border-b border-[#F1F5F9]"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">📝</span>
          <span class="text-sm font-medium text-[#475569]"
            >Submit Proposal</span
          >
        </div>
        <span class="text-sm font-bold text-[#E11D48]">+100 pts</span>
      </div>
      <div class="flex items-center justify-between py-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">📸</span>
          <span class="text-sm font-medium text-[#475569]">Upload Photo</span>
        </div>
        <span class="text-sm font-bold text-[#E11D48]">+75 pts</span>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex items-center gap-3 pt-2">
      <button
        class="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      >
        Start
      </button>
      <button
        class="flex-1 bg-white border-2 border-[#ECE7E4] text-[#0F172A] px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:bg-gray-50 active:scale-95"
      >
        View Details
      </button>
    </div>

    <!-- Participants -->
    <div class="text-xs text-[#94A3B8] text-center pt-2">342 participants</div>
  </div>
</div>
```

---

## 🏆 Constituency Spotlight (Hero Card)

```html
<div
  class="bg-gradient-to-br from-[#E11D48] to-[#BE123C] text-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(225,29,72,0.2)]"
>
  <div class="flex items-start justify-between gap-8">
    <div class="flex-1 space-y-4">
      <!-- Label -->
      <div
        class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
      >
        Constituency Spotlight
      </div>

      <!-- Constituency Name -->
      <h2 class="text-5xl font-bold leading-tight">KATHMANDU-3</h2>

      <!-- Stats Row -->
      <div class="flex items-center gap-4 text-sm flex-wrap">
        <div class="flex items-center gap-2">
          <svg
            class="w-5 h-5 text-white/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span class="font-semibold">5,842 points this week</span>
        </div>
        <span class="text-white/60">•</span>
        <div>
          <span class="text-white/80">Top Contributor: </span>
          <span class="font-semibold">@Aayush</span>
        </div>
      </div>
    </div>

    <!-- CTA Button -->
    <button
      class="bg-white text-[#E11D48] border-2 border-white hover:bg-white/90 px-6 py-3 rounded-full font-semibold text-base inline-flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all duration-200"
    >
      <span>View Missions</span>
      <svg
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  </div>
</div>
```

---

## 📊 Leaderboard Row (Constituency)

```html
<div
  class="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
>
  <!-- Progress Bar Background -->
  <div
    class="absolute left-0 top-0 bottom-0 bg-[#FFF1F2] transition-all duration-300 group-hover:bg-[#FFE4E6]"
    style="width: 100%"
  ></div>

  <!-- Content -->
  <div class="relative flex items-center justify-between gap-4">
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Rank -->
      <div
        class="flex items-center justify-center font-bold text-2xl min-w-[3rem]"
      >
        🥇
      </div>

      <!-- Name -->
      <div class="flex-1 min-w-0">
        <h4 class="text-base font-bold text-[#0F172A] truncate">Kathmandu-3</h4>
        <p class="text-xs text-[#94A3B8]">8 active missions</p>
      </div>
    </div>

    <!-- Points Pill -->
    <div
      class="shrink-0 bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium"
    >
      5,842 pts
    </div>
  </div>
</div>
```

---

## 👤 Leaderboard Row (Citizen)

```html
<div
  class="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
>
  <!-- Progress Bar Background (Indigo tint) -->
  <div
    class="absolute left-0 top-0 bottom-0 bg-[#EEF2FF] transition-all duration-300 group-hover:bg-[#E0E7FF]"
    style="width: 100%"
  ></div>

  <!-- Content -->
  <div class="relative flex items-center justify-between gap-4">
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Rank -->
      <div class="text-2xl min-w-[3rem]">🥇</div>

      <!-- Avatar -->
      <div
        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white font-bold ring-2 ring-white"
      >
        A
      </div>

      <!-- Name & Handle -->
      <div class="flex-1 min-w-0">
        <h4 class="text-base font-bold text-[#0F172A] truncate">
          Aayush Sharma
        </h4>
        <p class="text-xs text-[#94A3B8]">@aayush</p>
      </div>
    </div>

    <!-- Points Pill (Indigo) -->
    <div
      class="shrink-0 bg-[#6366F1] text-white px-4 py-2 rounded-full text-sm font-medium"
    >
      2,450 pts
    </div>
  </div>
</div>
```

---

## 🔍 Search Bar Row

```html
<div class="flex items-center gap-3 w-full">
  <!-- Search Input -->
  <div class="relative flex-1">
    <svg
      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      type="search"
      placeholder="Search missions, constituencies, categories…"
      class="w-full bg-white border border-[#ECE7E4] rounded-xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20"
    />
  </div>

  <!-- Filter Button -->
  <button
    class="w-12 h-12 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
  >
    <svg
      class="w-5 h-5 text-[#475569]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  </button>

  <!-- Sort Button -->
  <button
    class="w-12 h-12 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
  >
    <svg
      class="w-5 h-5 text-[#475569]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  </button>
</div>
```

---

## 🎛️ Pill Tabs

```html
<div class="flex items-center gap-2 flex-wrap">
  <!-- Active Tab -->
  <button
    class="bg-[#E11D48] text-white px-4 py-2 rounded-full font-medium text-sm shadow-sm transition-all duration-200"
  >
    Trending
  </button>

  <!-- Inactive Tabs -->
  <button
    class="bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-[#CBD5E1] transition-all duration-200"
  >
    New Missions
  </button>
  <button
    class="bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-[#CBD5E1] transition-all duration-200"
  >
    Constituencies
  </button>
  <button
    class="bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-[#CBD5E1] transition-all duration-200"
  >
    Categories
  </button>
  <button
    class="bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-50 hover:border-[#CBD5E1] transition-all duration-200"
  >
    All
  </button>
</div>
```

---

## 📐 Layout Containers

### Page Container

```html
<div class="min-h-screen bg-[#F7F4F2]">
  <!-- Content -->
</div>
```

### Max Width Container

```html
<div class="max-w-[1280px] mx-auto px-6 py-8">
  <!-- Content -->
</div>
```

### Grid Layouts

**Mission Grid (2 columns on desktop)**

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Mission cards -->
</div>
```

**Stats Cards (4 columns on desktop)**

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Stat cards -->
</div>
```

**Leaderboard Lists (2 columns)**

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Leaderboard lists -->
</div>
```

---

## 🎨 Common Utilities

### Vertical Spacing

```html
<div class="space-y-4">
  <!-- 16px gaps -->
  <div class="space-y-6">
    <!-- 24px gaps -->
    <div class="space-y-8"><!-- 32px gaps --></div>
  </div>
</div>
```

### Flex Row with Gap

```html
<div class="flex items-center gap-3">
  <div class="flex items-center justify-between gap-4"></div>
</div>
```

### Text Truncation

```html
<p class="truncate"><!-- Single line --></p>
<p class="line-clamp-2"><!-- 2 lines --></p>
```

### Hover Lift Effect

```html
<div
  class="hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
></div>
```

---

## 🎯 Copy-Paste Checklist

When implementing components:

- ✅ Copy complete class string
- ✅ Ensure all custom colors are bracketed: `[#E11D48]`
- ✅ Check hover states are included
- ✅ Verify transition classes
- ✅ Test responsive breakpoints (lg:, sm:)
- ✅ Add appropriate ARIA labels for accessibility

---

**Pro Tip**: Use the browser's DevTools to inspect and copy these classes directly for quick prototyping!
