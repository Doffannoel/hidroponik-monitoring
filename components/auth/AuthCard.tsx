export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[520px] rounded-[36px] bg-[#f8f8f6] px-7 py-8 shadow-[0_20px_60px_rgba(24,53,18,0.08)] ring-1 ring-[#ecefe8] sm:px-10 sm:py-10">
      <h2 className="text-4xl font-extrabold tracking-tight text-[#1e2b1c]">
        {title}
      </h2>
      <p className="mt-3 text-base text-[#727c70]">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
