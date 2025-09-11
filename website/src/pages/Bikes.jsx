import bikeImage1 from '../assets/298-1189.webp'
import bikeImage2 from '../assets/283-1190.webp'
import bikeImage3 from '../assets/283-1192.webp'
import bikeImage4 from '../assets/283-1194.webp'
import bikeImage5 from '../assets/283-1196.webp'
import bikeImage6 from '../assets/283-1198.webp'

function Bikes() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#0e3d4d] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              Our Bike Collection
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Choose from our premium selection of touring bikes, gravel bikes, and e-bikes. 
              All bikes are professionally maintained and equipped for your adventure.
            </p>
          </div>

          {/* Bikes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage1} className="w-full h-64 object-cover" alt="Touring Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Touring Bike</h3>
                <p className="text-gray-600 mb-4">Perfect for long-distance comfort and stability on various terrains.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€45/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage2} className="w-full h-64 object-cover" alt="Gravel Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gravel Bike</h3>
                <p className="text-gray-600 mb-4">Versatile bikes designed for both road and off-road adventures.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€55/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage3} className="w-full h-64 object-cover" alt="E-Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">E-Bike</h3>
                <p className="text-gray-600 mb-4">Electric assistance for easier climbs and longer distances.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€75/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage4} className="w-full h-64 object-cover" alt="Mountain Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mountain Bike</h3>
                <p className="text-gray-600 mb-4">Rugged bikes built for challenging terrain and trails.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€50/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage5} className="w-full h-64 object-cover" alt="City Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">City Bike</h3>
                <p className="text-gray-600 mb-4">Comfortable urban bikes for city exploration and short tours.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€35/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={bikeImage6} className="w-full h-64 object-cover" alt="Hybrid Bike" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hybrid Bike</h3>
                <p className="text-gray-600 mb-4">The perfect blend of comfort and performance for mixed terrain.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2e7d32] font-bold text-lg">€40/day</span>
                  <button className="bg-[#2e7d32] text-white px-4 py-2 rounded hover:bg-[#1b5e20] transition-colors">
                    Select
                  </button>
                </div>
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

export default Bikes

