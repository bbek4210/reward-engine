/**
 * Janamat Rewards Design System Tokens
 * Civic-tech aesthetic with clean, trustworthy UI
 */

export const designTokens = {
    // Color Palette
    colors: {
        // Backgrounds
        background: {
            primary: '#F7F4F2',      // Warm light gray
            card: '#FFFFFF',          // Pure white for cards
            muted: '#F9FAFB',         // Very light gray
        },

        // Primary Brand - Deep Red
        primary: {
            DEFAULT: '#E11D48',       // Primary red
            hover: '#BE123C',         // Darker red for hover
            light: '#FFF1F2',         // Light pink background
            text: '#FFFFFF',          // White text on red
        },

        // Secondary - Soft Blue/Purple
        secondary: {
            DEFAULT: '#6366F1',       // Indigo
            hover: '#4F46E5',         // Darker indigo
            light: '#EEF2FF',         // Light indigo background
            text: '#FFFFFF',          // White text on indigo
        },

        // Status Colors
        status: {
            active: {
                bg: '#DCFCE7',          // Light green
                text: '#166534',        // Dark green
                dot: '#22C55E',         // Green dot
            },
            warning: {
                bg: '#FEF3C7',
                text: '#92400E',
            },
            error: {
                bg: '#FEE2E2',
                text: '#991B1B',
            },
        },

        // Text Colors
        text: {
            primary: '#0F172A',       // Slate 900
            secondary: '#475569',     // Slate 600
            muted: '#94A3B8',         // Slate 400
            white: '#FFFFFF',
        },

        // Border Colors
        border: {
            DEFAULT: '#ECE7E4',       // Subtle warm gray
            light: '#F1F5F9',         // Lighter border
            dark: '#CBD5E1',          // Darker border
        },

        // Category Colors (for pills)
        category: {
            health: { bg: '#FFF1F2', text: '#E11D48' },
            education: { bg: '#EEF2FF', text: '#6366F1' },
            infrastructure: { bg: '#FEF3C7', text: '#92400E' },
            environment: { bg: '#DCFCE7', text: '#166534' },
            governance: { bg: '#F3E8FF', text: '#7C3AED' },
        },
    },

    // Spacing Scale (aligned with Tailwind)
    spacing: {
        xs: '0.5rem',    // 8px
        sm: '0.75rem',   // 12px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '2.5rem', // 40px
        '3xl': '3rem',   // 48px
        '4xl': '4rem',   // 64px
    },

    // Border Radius
    radius: {
        card: '1rem',         // 16px - rounded-2xl
        button: '9999px',     // rounded-full
        pill: '9999px',       // rounded-full
        input: '0.75rem',     // 12px - rounded-xl
        badge: '0.5rem',      // 8px - rounded-lg
    },

    // Shadows
    shadows: {
        card: '0 10px 30px rgba(16, 24, 40, 0.08)',
        cardHover: '0 20px 40px rgba(16, 24, 40, 0.12)',
        sm: '0 1px 2px rgba(16, 24, 40, 0.05)',
        md: '0 4px 6px rgba(16, 24, 40, 0.07)',
        lg: '0 10px 15px rgba(16, 24, 40, 0.1)',
    },

    // Typography
    typography: {
        fontFamily: {
            sans: 'Inter, system-ui, -apple-system, sans-serif',
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
            sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
            base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
            lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
            xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
            '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
            '5xl': ['3rem', { lineHeight: '1' }],           // 48px
            '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    // Layout
    layout: {
        maxWidth: '1280px',    // Max container width
        contentWidth: '1120px', // Content area width
        sidebarWidth: '280px',
        headerHeight: '80px',
    },

    // Component-specific tokens
    components: {
        // Button sizes
        button: {
            sm: { px: '1rem', py: '0.5rem', text: 'sm' },
            md: { px: '1.5rem', py: '0.75rem', text: 'base' },
            lg: { px: '2rem', py: '1rem', text: 'lg' },
        },

        // Pill sizes
        pill: {
            sm: { px: '0.75rem', py: '0.25rem', text: 'xs' },
            md: { px: '1rem', py: '0.5rem', text: 'sm' },
            lg: { px: '1.25rem', py: '0.625rem', text: 'base' },
        },

        // Card padding
        card: {
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
        },
    },

    // Animation
    animation: {
        duration: {
            fast: '150ms',
            base: '200ms',
            slow: '300ms',
        },
        easing: {
            DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
        },
    },
} as const;

// Tailwind-compatible export
export const tailwindColors = {
    'civic-bg': designTokens.colors.background.primary,
    'civic-card': designTokens.colors.background.card,
    'civic-primary': designTokens.colors.primary.DEFAULT,
    'civic-primary-hover': designTokens.colors.primary.hover,
    'civic-primary-light': designTokens.colors.primary.light,
    'civic-secondary': designTokens.colors.secondary.DEFAULT,
    'civic-secondary-hover': designTokens.colors.secondary.hover,
    'civic-secondary-light': designTokens.colors.secondary.light,
    'civic-border': designTokens.colors.border.DEFAULT,
    'civic-text': designTokens.colors.text.primary,
    'civic-text-muted': designTokens.colors.text.muted,
};
