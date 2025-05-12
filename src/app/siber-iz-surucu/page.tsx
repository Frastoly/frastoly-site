'use client';

export default function SiberIzSurucu() {
  return (
    <main style={{ minHeight: '100vh', background: '#111' }} className="flex items-center justify-center">
      <iframe
        src="/oyun-index.html"
        title="Siber İz Sürücü"
        width="1200"
        height="700"
        style={{ border: 'none', boxShadow: '0 0 32px #0f0' }}
        allowFullScreen
      />
    </main>
  );
} 