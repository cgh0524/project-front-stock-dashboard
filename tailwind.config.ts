import type { Config } from "tailwindcss";

import {
  primitiveColors,
  semanticColors,
} from "./src/shared/config/design-tokens";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /** Primitive Colors */
        ...primitiveColors,
        /** Semantic Colors */
        ...semanticColors,
      },
    },
  },
  plugins: [],
};

export default config;
