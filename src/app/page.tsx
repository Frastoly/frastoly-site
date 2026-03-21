import GameCard from '@/components/GameCard'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full pb-12 overflow-x-hidden pt-16">
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-headline tracking-tight leading-[0.9] bg-gradient-to-br from-primary via-primary-container to-secondary bg-clip-text text-transparent">
              Frastoly Oyunları
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-body">
              Geleceğin eğitim platformuna hoş geldiniz. Oyun oynayarak <span className="text-primary font-bold">öğrenin</span>, sınırları <span className="text-secondary font-bold">zorlayın</span> ve kendinizi bir <span className="text-tertiary font-bold">kozmik sınıfta</span> keşfedin.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Link 
                href="#games"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Oyunları Keşfet
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/hakkinda"
                className="glass-card text-on-surface px-8 py-4 rounded-xl font-bold text-lg border border-outline-variant/20 hover:bg-surface-variant/60 transition-all font-body"
              >
                Hakkımızda
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12 pt-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black font-headline text-white">3+ Oyun</div>
                  <div className="text-sm text-on-surface-variant uppercase tracking-widest">Katalog</div>
                </div>
              </div>
              <div className="w-px h-12 bg-outline-variant/20"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1.12 1.2-1.2-1.1-1.1C8.15 7.54 6.81 7 5.4 7 3.01 7 1 8.97 1 11.33c0 2.37 1.95 4.29 4.34 4.29 1.44 0 2.8-.56 3.77-1.53L12 11.34l1.53-1.34.01-.01 2.68-2.36c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.12-1.2 1.2 1.11 1.1c.92.93 2.26 1.47 3.67 1.47 2.39 0 4.34-1.97 4.34-4.33C23 10.32 21.05 8.4 18.6 8.4c-1.44 0-2.8.56-3.77 1.53L12 12.66l-1.53 1.34-.01.01-2.68 2.36c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38s1.52-3.38 3.39-3.38c.9 0 1.76.35 2.44 1.03l1.14 1.12 1.2-1.2-1.11-1.1C8.85 7.54 7.51 7 6.1 7c-2.39 0-4.34 1.97-4.34 4.33C1.76 13.68 3.71 15.6 6.1 15.6c1.44 0 2.8-.56 3.77-1.53L12.66 11.34l1.53-1.34.01-.01 2.68-2.36c.64-.64 1.49-.99 2.4-.99z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black font-headline text-white">∞ Eğlence</div>
                  <div className="text-sm text-on-surface-variant uppercase tracking-widest">Deneyim</div>
                </div>
              </div>
              <div className="w-px h-12 bg-outline-variant/20 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black font-headline text-white">100% Ücretsiz</div>
                  <div className="text-sm text-on-surface-variant uppercase tracking-widest">Erişim</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Overlay */}
          <div className="lg:col-span-5 relative group mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-secondary/20 transition-all duration-700"></div>
            <div className="relative rounded-xl overflow-hidden glass-card border border-outline-variant/30 transform rotate-3 group-hover:rotate-0 transition-transform duration-500 aspect-video lg:aspect-[4/3]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY4lyEQZ3WE1inApKQf1uLRBvTad2I1vIEJqLHGmz6tnYbD9b_jDbwUeZ6tKI7u_Yaqz4VnRkAXGs7H0Hfvme3qk_xmrmsVmKvC4mUCPq7bomywaxcB4u429Caay8M4UQyuy30wam7i0rpIaq3DVERaHRefcaRqXfLL-qKHZWr_LL_WIeEOmZ-ZESw6K44EQXzRgUdfrRgDZfdD0g5lJfEX6EvxTlsiIVJrgq79xqodb5P-wWJqMOc16sxWXo9EENy_zf81ob-kOg7"
                alt="Frastoly Gaming Universe"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Oyunlarımız Grid */}
      <section id="games" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-4">
            <div className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Popüler Maceralar</div>
            <h2 className="text-5xl font-black font-headline text-white">Oyunlarımız</h2>
          </div>
          <Link href="#games" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-2 font-medium">
            Tümünü Gör 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameCard
            title="Siber İz Sürücü"
            description="Dijital dünyada güvenliğin anahtarını bulun. Hackerlara karşı sistemlerinizi koruyun ve siber ağların efendisi olun."
            image="/games/siber-iz-surucu.png"
            href="/siber-iz-surucu"
            category="Siber Güvenlik"
            categoryColorClass="bg-primary text-on-primary-container"
            buttonHoverClass="group-hover:bg-primary group-hover:text-on-primary"
            isDevelopment={false}
          />
          <GameCard
            title="Kelime Bahçesi"
            description="Kelimelerin gizemli dünyasında bir yolculuğa çıkın. Bahçenizi doğru harflerle büyütün ve söz dağarcığınızı genişletin."
            image="/games/kelime-bahcesi.png"
            href="/kelime-bahcesi"
            category="Dil Bilgisi"
            categoryColorClass="bg-secondary text-on-secondary-container"
            buttonHoverClass="group-hover:bg-secondary group-hover:text-on-secondary"
          />
          <GameCard
            title="Zeka Blokları"
            description="Strateji ve hızın buluştuğu nokta. Blokları doğru yerleştirin, seviyeleri aşın ve en yüksek puanı toplayın."
            image="/games/zeka-bloklari.png"
            href="/zeka-bloklari"
            category="Mantık"
            categoryColorClass="bg-tertiary text-on-tertiary-container"
            buttonHoverClass="group-hover:bg-tertiary group-hover:text-on-tertiary"
          />
        </div>
      </section>

      {/* Feature Section: Neden Frastoly? */}
      <section className="py-24 px-8 bg-surface-container-low relative mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">Farkımız</div>
            <h2 className="text-5xl font-black font-headline text-white">Neden Frastoly?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="glass-card p-12 rounded-xl border border-outline-variant/20 hover:shadow-[0_0_40px_rgba(83,221,252,0.1)] transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-headline text-white">Eğitici İçerik</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Her oyun, pedagojik uzmanlar tarafından onaylanmış öğrenme hedefleri ile tasarlanmıştır.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-12 rounded-xl border border-outline-variant/20 hover:shadow-[0_0_40px_rgba(236,99,255,0.1)] transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8 text-on-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-headline text-white">Kişiselleştirilmiş</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Yapay zeka algoritmalarımız öğrenme hızınıza uyum sağlar ve size özel bir deneyim sunar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-12 rounded-xl border border-outline-variant/20 hover:shadow-[0_0_40px_rgba(172,138,255,0.1)] transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tertiary to-tertiary-container flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8 text-on-tertiary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-headline text-white">Güvenli Platform</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Reklamsız ve veri gizliliği odaklı yapımızla çocuklar ve yetişkinler için en güvenli liman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-primary-container via-secondary-container to-tertiary-container rounded-3xl p-16 overflow-hidden text-center group cursor-pointer hover:scale-[1.01] transition-transform duration-500 shadow-2xl shadow-secondary/10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black font-headline text-white drop-shadow-lg">
              Hemen Oynamaya Başla!
            </h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Dünyanın dört bir yanından binlerce öğrenciye katılın ve öğrenmenin en eğlenceli halini keşfedin.
            </p>
            <div className="pt-4">
              <Link href="#games">
                <button className="bg-white text-[#070d1f] font-black px-12 py-5 rounded-full text-xl hover:scale-110 active:scale-95 transition-all shadow-2xl">
                  Oyunlara Git
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-outline-variant/20 mt-12 bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black italic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-headline">Frastoly Oyunları</div>
            <p className="font-body text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Eğitimi oyunlaştıran, geleceği tasarlayan yeni nesil kozmik sınıf platformu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-white font-bold text-sm uppercase tracking-widest font-headline">Platform</div>
              <ul className="space-y-2">
                <li><Link href="#" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Topluluk</Link></li>
                <li><Link href="#" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Destek</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-white font-bold text-sm uppercase tracking-widest font-headline">Yasal</div>
              <ul className="space-y-2">
                <li><Link href="#" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Kullanım Şartları</Link></li>
                <li><Link href="#" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:items-end space-y-6">
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 12A10 10 0 1112 2a10 10 0 0110 10zM12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20"/>
                </svg>
              </Link>
            </div>
            <div className="font-body text-sm text-on-surface-variant">© 2024 Frastoly Oyunları. The Cosmic Classroom.</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
