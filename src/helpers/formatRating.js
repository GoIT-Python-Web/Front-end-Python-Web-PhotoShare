export default function formatRating(count) {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return "оцінок";
  if (n1 > 1 && n1 < 5) return "оцінки";
  if (n1 === 1) return "оцінка";
  return "оцінок";
}
