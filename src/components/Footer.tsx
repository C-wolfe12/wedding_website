import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cornflower via-cornflower-dark to-russet py-12 text-white">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-russet" />
          <span className="font-playfair text-2xl font-bold">Hugeoleen & Carl</span>
        </div>
        <p className="text-white/80 mb-2">January 7th, 2027</p>
        <p className="text-white/80 mb-6">Villa Viento</p>
        <div className="border-t border-white/20 pt-6 mt-6">
          <p className="text-white/60 text-sm">
            We can&apos;t wait to celebrate with you!
          </p>
        </div>
      </div>
    </footer>
  );
}
