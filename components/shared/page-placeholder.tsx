interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <main className="container-shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="card-base max-w-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-4 text-base leading-8 text-textSoft">{description}</p>
      </div>
    </main>
  );
}
