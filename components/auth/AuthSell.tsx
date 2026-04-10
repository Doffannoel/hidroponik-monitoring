export default function AuthShell({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#edf0ea]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
        <section className="relative hidden lg:block">{left}</section>
        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-10">
          {right}
        </section>
      </div>
    </main>
  );
}
