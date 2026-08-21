import React from 'react';
import { Link } from 'react-router-dom';
import { Film, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0b0d] border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E50914] flex items-center justify-center shadow-lg shadow-[#E50914]/30">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider text-white uppercase">
                CINEMA<span className="text-[#E50914]">TIQUE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Experience the pinnacle of cinema. IMAX, 3D Laser, and Dolby Atmos audio with premium VIP reclining suites.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E50914]" /> Grand Avenue, Metropolis
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Movies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Now Showing
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  IMAX Experiences
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Exclusive Premieres
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Cinemas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Grand Hall IMAX
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Downtown Dolby Screen
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  VIP Dine-In Lounge
                </span>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  Ticket Booking History
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe for early movie access and discounts.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E50914]"
              />
              <button className="px-3 py-2 bg-[#E50914] text-white text-xs font-bold rounded-lg hover:bg-[#ff1f2d] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Cinematique Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#E50914] fill-[#E50914]" />
            <span>for movie lovers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
