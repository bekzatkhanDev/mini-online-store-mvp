import { setCustomClaims } from "../src/features/auth/utils/setCustomClaims";

async function main() {
  const uid = "sy4xHZ8FejbACjnPJ4vDQagANLI3"; // UID из Firebase Authentication
  await setCustomClaims(uid, "admin");
  console.log(`✅ Роль admin установлена для пользователя: ${uid}`);
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
  process.exit(1);
});
