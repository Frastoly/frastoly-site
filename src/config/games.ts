export interface GameConfig {
  id: string;
  title: string;
  description: string;
  category: 'logic' | 'memory' | 'word' | 'reflex';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any; // Will load dynamically
  icon?: string;
  isNew?: boolean;
}

export const gamesList: GameConfig[] = [
  // Logic
  {
    id: 'sorting',
    title: 'Sayı Sıralama',
    description: 'Blokları küçükten büyüğe doğru sırala.',
    category: 'logic',
    icon: '123'
  },
  {
    id: 'logic-grid',
    title: 'Mantık Karesi',
    description: 'Satır ve sütunlarda tekrar etmeyen sayıları bul.',
    category: 'logic',
    icon: 'Grid'
  },
  {
    id: 'merge-2048',
    title: '2048 Birleştir',
    description: 'Aynı sayıları birleştirerek 2048\'e ulaş.',
    category: 'logic',
    icon: '2048'
  },
  {
    id: 'circuit',
    title: 'Devre Tamamlayıcı',
    description: 'Parçaları döndürerek enerji akışını sağla.',
    category: 'logic',
    icon: '⚡',
    isNew: true
  },
  {
    id: 'minesweeper',
    title: 'Siber Mayınlar',
    description: 'Güvenli alanları bul, virüslerden kaçın.',
    category: 'logic',
    icon: '💣',
    isNew: true
  },
  
  // Memory
  {
    id: 'pattern',
    title: 'Desen Hafızası',
    description: 'Gösterilen deseni hafızana at ve tekrarla.',
    category: 'memory',
    icon: '🧠'
  },
  {
    id: 'memory-matrix',
    title: 'Neon Hafıza',
    description: 'Kartları eşleştir, sistemi hackle.',
    category: 'memory',
    icon: '🎴',
    isNew: true
  },
  {
    id: 'simon-says',
    title: 'Sıralı Frekans',
    description: 'Yanan ışıkların sırasını takip et.',
    category: 'memory',
    icon: '🔔',
    isNew: true
  },

  // Word
  {
    id: 'wordle',
    title: 'Terminal Şifresi',
    description: 'Gizli şifreyi 6 denemede bul.',
    category: 'word',
    icon: '⌨️',
    isNew: true
  },
  
  // Reflex
  {
    id: 'pixel-hunt',
    title: 'Piksel Avı',
    description: 'Hedeflere en hızlı şekilde tıkla.',
    category: 'reflex',
    icon: '🎯',
    isNew: true
  }
];

