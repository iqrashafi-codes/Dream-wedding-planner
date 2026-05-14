export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-lg text-gray-400">{subtitle}</p>
    </div>
  );
}
