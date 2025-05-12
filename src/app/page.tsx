import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Frastoly Oyunları
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Web tabanlı oyunlarımızı keşfet, eğlencenin ve rekabetin tadını çıkar! Her ay yeni oyunlar ekleniyor.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Oyun Kartı 1 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-gray-700 transition-colors">
            <Image src="/game1.png" alt="Siber İz Sürücü" width={80} height={80} className="mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">Siber İz Sürücü <span className="text-xs text-gray-400">(geliştirme aşamasında)</span></h2>
            <p className="text-gray-400 mb-4 text-center">Terminal tabanlı siber güvenlik simülasyonu. Komutlarla görevleri tamamla!</p>
            <a href="/siber-iz-surucu" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-bold">Oyna</a>
          </div>
          {/* Oyun Kartı 2 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-gray-700 transition-colors">
            <Image src="/game2.png" alt="Kelime Bahçesi" width={80} height={80} className="mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">Kelime Bahçesi <span className="text-xs text-gray-400">(geliştirme aşamasında)</span></h2>
            <p className="text-gray-400 mb-4 text-center">Kelime bulmacalarını çöz, kelime dağarcığını geliştir!</p>
            <a href="/KelimeBahcesi/index.html" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-bold">Oyna</a>
          </div>
          {/* Oyun Kartı 3 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-gray-700 transition-colors">
            <Image src="/game3.png" alt="Oyun 3" width={80} height={80} className="mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">Zeka Blokları</h2>
            <p className="text-gray-400 mb-4 text-center">Blokları doğru sırayla yerleştir, bölümleri geç!</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">Oyna</button>
          </div>
        </div>
      </div>
    </main>
  );
}
