import GameCard from '@/components/GameCard'

export default function Home() {
  return (
    <main className="w-full min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative w-full py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 w-full">
            {/* Ana Başlık */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black mb-6">
                <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
                  Frastoly
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl mt-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
                  Oyunları
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Eğitici ve eğlenceli oyunlarla <span className="text-primary-400 font-semibold">öğrenmeyi keşfedin</span>. 
                <br className="hidden sm:block" />
                Her oyun, yeni bir <span className="text-secondary-400 font-semibold">macera</span> ve yeni bir 
                <span className="text-primary-400 font-semibold"> öğrenme fırsatı</span> sunar.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#games"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Oyunları Keşfet
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>

              <a
                href="/hakkinda"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:border-primary-400/50 hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hakkımızda
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-400 font-heading">3+</div>
                <div className="text-sm text-gray-400 mt-1">Oyun</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-secondary-400 font-heading">∞</div>
                <div className="text-sm text-gray-400 mt-1">Eğlence</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-400 font-heading">100%</div>
                <div className="text-sm text-gray-400 mt-1">Ücretsiz</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="w-full py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Oyunlarımız
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Her biri farklı bir beceriyi geliştirmek için tasarlanmış, eğlenceli ve öğretici oyunlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GameCard
              title="Siber İz Sürücü"
              description="Siber güvenlik dünyasında macera dolu bir yolculuğa çıkın. Terminal komutları, hacking simülasyonu ve 6 farklı son ile dolu epik bir hikaye sizi bekliyor."
              image="/games/siber-iz-surucu.png"
              href="/siber-iz-surucu"
              isDevelopment={false}
            />
            <GameCard
              title="Kelime Bahçesi"
              description="Türkçe kelimelerin büyülü dünyasında gezinin. Yeni kelimeler öğrenin, kelime haznenizi geliştirin ve dil becerilerinizi ilerletin."
              image="/games/kelime-bahcesi.png"
              href="/kelime-bahcesi"
            />
            <GameCard
              title="Zeka Blokları"
              description="Mantık ve strateji becerilerinizi geliştirin. Blokları doğru şekilde yerleştirin, zorlu bulmacaları çözün ve zihinsel yeteneklerinizi test edin."
              image="/games/zeka-bloklari.png"
              href="#games"
              isDevelopment={true}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 text-white">
              Neden <span className="text-primary-400">Frastoly</span>?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Eğitim ve eğlenceyi bir araya getiren modern oyun deneyimi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div>
              <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-primary-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">Eğitici İçerik</h3>
                  <p className="text-gray-400 leading-relaxed">Her oyun, öğrenmeyi eğlenceli hale getiren özel içerikler ve interaktif deneyimlerle tasarlandı.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-secondary-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 mb-6 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-secondary-400 transition-colors">Kişiselleştirilmiş</h3>
                  <p className="text-gray-400 leading-relaxed">Her oyuncunun kendi hızında ilerlemesine olanak sağlayan adaptif öğrenme sistemi ile kişisel gelişim.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-primary-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">Güvenli Platform</h3>
                  <p className="text-gray-400 leading-relaxed">Çocuklar için tamamen güvenli, reklamsız ve kontrollü bir oyun ortamı. Gizlilik önceliğimiz.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            
            <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                Hemen Oynamaya Başla!
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Ücretsiz, eğlenceli ve öğretici oyunlarla dolu dünyamıza katıl. Kayıt gerekmez!
              </p>
              <a
                href="#games"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Oyunlara Git
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
