import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        screen: "100vh",
      },
    },
  },
} satisfies Config;
