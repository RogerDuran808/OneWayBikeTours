import tourImage1 from '../assets/I151-591;59-1075.webp'
import tourImage2 from '../assets/151-601.webp'
import tourImage3 from '../assets/I151-614;59-1075.webp'
import tourImage4 from '../assets/I151-628;59-1075.webp'
import tourImage5 from '../assets/151-650.webp'
import berlinImage from '../assets/151-652.webp'
import hamburgImage from '../assets/151-657.webp'
import malmoImage from '../assets/151-659.webp'
import calendarIcon from '../assets/187-612.svg'

function Tours() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#6366f1] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-12">
              Pick your ideal destination
            </h1>
            
            {/* Tour Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="relative">
                <img src={tourImage1} className="w-full h-64 object-cover rounded-lg" alt="Mountain biking" />
              </div>
              <div className="relative">
                <img src={tourImage2} className="w-full h-64 object-cover rounded-lg" alt="Road cycling" />
              </div>
              <div className="relative">
                <img src={tourImage3} className="w-full h-64 object-cover rounded-lg" alt="Forest trail" />
              </div>
              <div className="relative md:col-start-2">
                <img src={tourImage4} className="w-full h-64 object-cover rounded-lg" alt="Scenic route" />
              </div>
              <div className="relative">
                <img src={tourImage5} className="w-full h-64 object-cover rounded-lg" alt="Group cycling" />
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-full px-6 py-4">
                <input 
                  type="text" 
                  placeholder="Leaving from" 
                  className="w-full bg-transparent text-gray-600 text-lg outline-none"
                />
              </div>
              <div className="bg-gray-100 rounded-full px-6 py-4 flex items-center gap-2">
                <img src={calendarIcon} className="w-5 h-5" alt="Calendar" />
                <input 
                  type="text" 
                  placeholder="Leaving date" 
                  className="w-full bg-transparent text-gray-600 text-lg outline-none"
                />
              </div>
              <button className="bg-[#2e7d32] text-white px-8 py-4 rounded-full hover:bg-[#1b5e20] transition-colors">
                <span className="text-lg font-medium">Search</span>
              </button>
            </div>
          </div>

          {/* Journeys Section */}
          <div>
            <h2 className="text-[#0e3d4d] text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-8">
              Journeys we offer from Copenhagen
            </h2>
            
            <div className="space-y-6">
              {/* Berlin Journey */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <img src={berlinImage} className="w-24 h-24 object-cover rounded-lg" alt="Berlin" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Intermediate</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">BERLIN</h3>
                    <p className="text-gray-600 mb-1">448 km, 12 Hot spots.</p>
                    <p className="text-gray-600">Touring Bike, Gravel Bike, E-Bike</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book this Journey
                </button>
              </div>

              {/* Hamburg Journey */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <img src={hamburgImage} className="w-24 h-24 object-cover rounded-lg" alt="Hamburg" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Beginner</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">HAMBURG</h3>
                    <p className="text-gray-600 mb-1">256 km, 8 Hot spots.</p>
                    <p className="text-gray-600">Touring Bike, Gravel Bike, E-Bike</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book this Journey
                </button>
              </div>

              {/* Malmo Journey */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <img src={malmoImage} className="w-24 h-24 object-cover rounded-lg" alt="Malmo" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Intermediate</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">MALMO</h3>
                    <p className="text-gray-600 mb-1">359 km, 11 Hot spots.</p>
                    <p className="text-gray-600">Touring Bike, Gravel Bike, E-Bike</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book this Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e7d32] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-2xl font-bold font-['Poppins'] mb-4">ONE WAY BIKE TOURS.</h3>
            </div>
            <div>
              <h4 className="text-white text-xl font-bold font-['Poppins'] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">About us</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Contact us</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">News & Press</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Library</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Career</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xl font-bold font-['Poppins'] mb-4">Essentials</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Pricing</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Services</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Privacy policy</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">User Agreement</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xl font-bold font-['Poppins'] mb-4">Follow us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Facebook</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Instagram</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">Newsletter</a></li>
                <li><a href="#" className="text-white text-base font-normal font-['Poppins'] hover:text-gray-300">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 mt-12 pt-8 text-center">
            <p className="text-white text-sm font-normal font-['Poppins']">ONE WAY BIKE TOURS - Copyright 2024 - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Tours

