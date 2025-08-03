'use client'
import Image from 'next/image';

export default function AboutMe() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-2xl blur-xl"></div>
                <Image
                    src="/working.JPG"
                    alt="Hamza working"
                    width={500}
                    height={375}
                    className="relative rounded-2xl shadow-2xl border-2 border-gold/30 hover:border-gold/50 transition-all duration-300 hover:scale-105"
                    priority
                />
            </div>
            <p className="text-lg text-gray-500">
                
            </p>
        </div>
    )
}