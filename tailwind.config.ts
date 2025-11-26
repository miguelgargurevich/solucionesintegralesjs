import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Colores corporativos SOLUCIONES INTEGRALES
        industrial: {
          blue: '#0056A6',
          'blue-dark': '#003d75',
          'blue-light': '#0070d4',
        },
        metal: {
          gray: '#D7D8DA',
          'gray-dark': '#9a9b9d',
          'gray-light': '#e8e9eb',
        },
        graphite: {
          DEFAULT: '#0F1115',
          light: '#1a1d23',
          dark: '#080a0c',
        },
        safety: {
          yellow: '#FFC300',
          'yellow-dark': '#cc9c00',
          'yellow-light': '#ffd44d',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse3d: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        spark: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        pulse3d: "pulse3d 4s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        spark: "spark 2s ease-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-industrial': 'linear-gradient(135deg, #0F1115 0%, #1a1d23 50%, #0F1115 100%)',
        'gradient-metal': 'linear-gradient(180deg, #D7D8DA 0%, #9a9b9d 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0056A6 0%, #003d75 100%)',
        'noise': "url('/noise.png')",
      },
      boxShadow: {
        'industrial': '0 25px 50px -12px rgba(0, 86, 166, 0.25)',
        'metal': '0 10px 40px -10px rgba(215, 216, 218, 0.3)',
        'glow-blue': '0 0 40px rgba(0, 86, 166, 0.4)',
        'glow-yellow': '0 0 40px rgba(255, 195, 0, 0.4)',
        'inner-metal': 'inset 0 2px 4px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add 'light' variant that applies when .light class is on html
    plugin(function({ addVariant }) {
      addVariant('light', '.light &')
    }),
  ],
}
export default config
