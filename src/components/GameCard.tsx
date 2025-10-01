'use client'

import Image from 'next/image'
import Link from 'next/link'

interface GameCardProps {
  title: string
  description: string
  image: string
  href: string
  isDevelopment?: boolean
}

export default function GameCard({
  title,
  description,
  image,
  href,
  isDevelopment = false,
}: GameCardProps) {
  return (
    <div className="group relative bg-dark-200/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isDevelopment && (
          <div className="absolute top-2 right-2 bg-primary-500/90 text-white text-xs px-2 py-1 rounded-full">
            Geliştirme Aşamasında
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-heading font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
        >
          Oyna
        </Link>
      </div>
    </div>
  )
} 