export default function shortenName(fullName) {
  if (!fullName) return "";
  const parts = fullName.trim().split(" ");
  if (parts.length < 2) return parts[0];
  const [firstName, lastName] = parts;
  return `${firstName} ${lastName[0]}.`;
}
