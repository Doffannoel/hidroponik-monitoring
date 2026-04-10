export default function AuthDivider({ text = "ATAU DAFTAR DENGAN" }) {
  return (
    <div className="relative my-7">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#e4e8e0]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[#f8f8f6] px-4 text-[11px] font-bold tracking-[0.18em] text-[#8b9587]">
          {text}
        </span>
      </div>
    </div>
  );
}
