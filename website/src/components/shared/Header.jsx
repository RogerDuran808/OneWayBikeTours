import { Link, useLocation } from 'react-router-dom'
import asset14 from '../../assets/40-544.svg'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="relative z-10 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full border-[3px] border-[#2e7d32] relative">
                <div className="w-6 h-6 bg-white absolute top-3 left-3"></div>
              </div>
              <div className="text-[#2e7d32] text-xl md:text-2xl font-bold font-['Cabin']">ONE WAY BIKE TOURS</div>
              <div className="w-1 h-1 bg-[#2e7d32] rounded-full"></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/tours" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/tours') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              Tours
            </Link>
            <Link 
              to="/bikes" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/bikes') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              Bikes
            </Link>
            <Link 
              to="/about" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/about') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              About us
            </Link>
            <Link 
              to="/reviews" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/reviews') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              Reviews
            </Link>
            <Link 
              to="/faq" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/faq') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className={`text-xl font-bold font-['Cabin'] transition-colors ${
                isActive('/contact') ? 'text-[#2e7d32]' : 'text-black hover:text-[#2e7d32]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Book Now Button */}
          <button className="bg-[#2e7d32] text-white px-8 py-4 rounded-[10px] flex items-center gap-2 hover:bg-[#1b5e20] transition-colors">
            <img src={asset14} className="w-8 h-8" alt="Book" />
            <span className="text-xl font-bold font-['Cabin']">Book Now</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

