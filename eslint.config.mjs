import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ✅ разрешаем any
      "@typescript-eslint/no-unused-vars": "warn", // ⚠️ просто предупреждение
      "react-hooks/exhaustive-deps": "off", // убираем лишние ворнинги
      "no-console": "off", // можно использовать console.log
    },
  },
];

export default eslintConfig;
