const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Extended blue family for hover, etc. if needed directly in Tailwind
          // (though primarily driven by CSS vars in globals.css)
          // Example: hover: 'hsl(var(--primary-hover))' could be an option
        },
        secondary: {
          // Mapping 'accent' from the doc to 'secondary' for broader use, or add 'accent'
          DEFAULT: "hsl(var(--accent))", // Orangeade
          foreground: "hsl(var(--accent-foreground))",
        },
        accent: {
          // Explicitly adding accent as per the doc's semantic token
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Adding semantic colors from the document
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))", // Note: 'destructive' often serves as error
        info: "hsl(var(--info))",

        // Direct mapping of the new palette for utility classes if needed
        // These will be primarily driven by CSS variables in globals.css
        "deja-vu-blue": "hsl(var(--deja-vu-blue))", // #3B5998
        orangeade: "hsl(var(--orangeade))", // #D85A3A

        "blue-900": "hsl(var(--blue-900))",
        "blue-700": "hsl(var(--blue-700))",
        "blue-500": "hsl(var(--blue-500))",
        "blue-300": "hsl(var(--blue-300))",
        "blue-100": "hsl(var(--blue-100))",

        "orange-700": "hsl(var(--orange-700))",
        "orange-500": "hsl(var(--orange-500))",
        "orange-300": "hsl(var(--orange-300))",
        "orange-100": "hsl(var(--orange-100))",

        "gray-900": "hsl(var(--gray-900))",
        "gray-700": "hsl(var(--gray-700))",
        "gray-500": "hsl(var(--gray-500))",
        "gray-300": "hsl(var(--gray-300))",
        "gray-100": "hsl(var(--gray-100))",
        
        // Government colors
        "old-glory-blue": "#002868",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
}
