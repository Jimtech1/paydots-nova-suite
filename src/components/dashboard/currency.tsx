// Currency → emoji flag mapping (ISO 4217 → ISO 3166 country)
const CURRENCY_TO_FLAG: Record<string, string> = {
  USD: "🇺🇸",
  NGN: "🇳🇬",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  GHS: "🇬🇭",
  KES: "🇰🇪",
  ZAR: "🇿🇦",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  JPY: "🇯🇵",
  CNY: "🇨🇳",
  INR: "🇮🇳",
  BRL: "🇧🇷",
  CHF: "🇨🇭",
  XOF: "🇸🇳",
  AED: "🇦🇪",
};

export function flagFor(code: string) {
  return CURRENCY_TO_FLAG[code.toUpperCase()] ?? "🌐";
}

export function CurrencyFlag({
  code,
  size = "md",
  className = "",
}: {
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" };
  return (
    <span
      role="img"
      aria-label={`${code} flag`}
      className={`inline-block leading-none ${sizes[size]} ${className}`}
    >
      {flagFor(code)}
    </span>
  );
}
