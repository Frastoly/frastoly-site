'use client'

import Image from 'next/image'
import Link from 'next/link'

interface GameCardProps {
  title: string
  description: string
  image: string
  href: string
  category?: string
  categoryColorClass?: string
  buttonHoverClass?: string
  isDevelopment?: boolean
}

export default function GameCard({
  title,
  description,
  image,
  href,
  category = "Oyun",
  categoryColorClass = "bg-primary text-on-primary-container",
  buttonHoverClass = "group-hover:bg-primary group-hover:text-on-primary",
  isDevelopment = false,
}: GameCardProps) {
  return (
    <div className="group relative bg-[#11192e] rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-outline-variant/20 hover:shadow-[0_0_30px_rgba(83,221,252,0.1)]">
      <div className="h-64 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute top-4 left-4 ${categoryColorClass} px-3 py-1 rounded-full text-xs font-bold uppercase z-10 shadow-lg`}>
          {category}
        </div>
        
        {isDevelopment && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-amber-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
              Geliştiriliyor
            </span>
          </div>
        )}
      </div>
      <div className="p-8 space-y-4 relative bg-[#11192e]">
        <h3 className="text-2xl font-black font-headline text-white">{title}</h3>
        <p className="text-on-surface-variant leading-relaxed font-body min-h-[80px]">
          {description}
        </p>
        
        <Link href={href} className="block mt-4">
          <button className={`w-full py-3 rounded-lg border border-outline-variant/40 transition-all font-bold text-white ${buttonHoverClass} font-body`}>
            {isDevelopment ? "Yakında" : "Hemen Oyna"}
          </button>
        </Link>
      </div>
    </div>
  )
}
