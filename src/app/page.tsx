import GameCard from '@/components/GameCard'

export default function Home() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Frastoly Oyunları
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Eğitici ve eğlenceli oyunlarla öğrenmeyi keşfedin. Her oyun, yeni bir macera ve yeni bir öğrenme fırsatı sunar.
            </p>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center text-white">
            Oyunlarımız
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GameCard
              title="Siber İz Sürücü"
              description="Siber güvenlik dünyasında macera dolu bir yolculuğa çıkın. Güvenlik açıklarını bulun ve sistemleri koruyun."
              image="/games/siber-iz-surucu.png"
              href="/oyunlar/siber-iz-surucu"
              isDevelopment={true}
            />
            <GameCard
              title="Kelime Bahçesi"
              description="Türkçe kelimelerin büyülü dünyasında gezinin. Yeni kelimeler öğrenin ve kelime haznenizi geliştirin."
              image="/games/kelime-bahcesi.png"
              href="/oyunlar/kelime-bahcesi"
              isDevelopment={true}
            />
            <GameCard
              title="Zeka Blokları"
              description="Mantık ve strateji becerilerinizi geliştirin. Blokları doğru şekilde yerleştirin ve zorlukları aşın."
              image="/games/zeka-bloklari.png"
              href="/oyunlar/zeka-bloklari"
              isDevelopment={true}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center text-white">
            Neden Frastoly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-dark-300/50 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-white">Eğitici İçerik</h3>
              <p className="text-gray-300">Her oyun, öğrenmeyi eğlenceli hale getiren özel içeriklerle tasarlandı.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-dark-300/50 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-white">Kişiselleştirilmiş Deneyim</h3>
              <p className="text-gray-300">Her oyuncunun kendi hızında ilerlemesine olanak sağlayan adaptif sistem.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-dark-300/50 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-white">Güvenli Platform</h3>
              <p className="text-gray-300">Çocuklar için güvenli ve kontrollü bir oyun ortamı.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
