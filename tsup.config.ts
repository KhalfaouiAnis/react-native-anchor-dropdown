import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // outputs dist/index.js and dist/index.mjs
  dts: true, // generates dist/index.d.ts
  splitting: false,
  sourcemap: true,
  clean: true, // wipes dist/ before each build
  external: [
    // never bundle peer deps
    "react",
    "react-native",
    "react-native-safe-area-context",
  ],
});
