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
    <div className="group relative fade-in-up opacity-0">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
      
      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20">
        {/* Görsel Alanı */}
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Geliştirme Badge'i */}
          {isDevelopment && (
            <div className="absolute top-3 right-3">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 rounded-full blur-md animate-pulse"></div>
                <span className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                  Geliştiriliyor
                </span>
              </div>
            </div>
          )}

          {/* Hover Icon */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <div className="bg-primary-500/20 backdrop-blur-md p-2 rounded-lg border border-primary-400/30">
              <svg className="w-5 h-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-5">
          <h3 className="text-xl font-heading font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-5 line-clamp-2 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          {/* Aksiyon Butonu */}
          <Link
            href={href}
            className="relative inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl overflow-hidden group/btn transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Oyuna Başla
            </span>
          </Link>
        </div>

        {/* Alt gölge efekti */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  )
}
