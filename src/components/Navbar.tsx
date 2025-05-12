import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 shadow-lg py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        <Link href="/">Frastoly Oyunları</Link>
      </div>
      <div className="flex gap-6">
        <Link href="/" className="text-gray-200 hover:text-pink-400 font-medium transition-colors">Ana Sayfa</Link>
        <Link href="#oyunlar" className="text-gray-200 hover:text-pink-400 font-medium transition-colors">Oyunlar</Link>
        <Link href="#hakkinda" className="text-gray-200 hover:text-pink-400 font-medium transition-colors">Hakkında</Link>
      </div>
    </nav>
  );
} 