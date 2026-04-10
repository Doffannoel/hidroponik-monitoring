export default function PasswordStrength({ password = "" }) {
  const getStrength = () => {
    if (!password) return { label: "", width: "0%", color: "bg-transparent" };
    if (password.length < 6)
      return { label: "LEMAH", width: "28%", color: "bg-red-400" };
    if (password.length < 8)
      return { label: "SEDANG", width: "55%", color: "bg-yellow-400" };
    return { label: "KUAT", width: "100%", color: "bg-[#3f7f22]" };
  };

  const strength = getStrength();

  if (!password) return null;

  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#667660]">
        <span>Kekuatan Password</span>
        <span>{strength.label}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#e3e8df]">
        <div
          className={`h-full rounded-full ${strength.color}`}
          style={{ width: strength.width }}
        />
      </div>
    </div>
  );
}
