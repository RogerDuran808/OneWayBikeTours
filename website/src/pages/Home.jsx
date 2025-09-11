import asset1 from '../assets/33-5.webp'
import asset2 from '../assets/55-1282.webp'
import asset3 from '../assets/55-1288.webp'
import asset4 from '../assets/55-1294.webp'
import asset5 from '../assets/55-1300.webp'
import asset6 from '../assets/55-1306.webp'
import asset7 from '../assets/250-1945.webp'
import asset8 from '../assets/55-952.svg'
import asset9 from '../assets/55-1419.svg'
import asset10 from '../assets/55-1422.svg'
import asset11 from '../assets/55-1062.svg'
import asset12 from '../assets/55-1064.svg'
import asset13 from '../assets/55-1066.svg'
import asset15 from '../assets/55-1409.svg'
import asset16 from '../assets/65-410.svg'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[580px] overflow-hidden">
        <img src={asset1} className="w-full h-full object-cover" alt="Bike tour hero" />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-white text-4xl md:text-6xl font-bold font-['DM_Sans'] text-shadow-lg mb-4">
                  ONE WAY<br/>BIKE TOURS
                </h1>
              </div>
              <div className="text-right">
                <h2 className="text-[#fafffb] text-3xl md:text-5xl font-normal font-['Faster_One'] text-shadow-lg mb-4">
                  "Ride into nature,
                </h2>
                <p className="text-white text-2xl md:text-4xl font-normal font-['Chau_Philomene_One'] text-shadow-lg">
                  discover the adventure"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Tours Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button className="bg-[#d9d9d9] px-12 py-4 rounded-[10px] flex items-center gap-2 hover:bg-gray-300 transition-colors">
            <img src={asset8} className="w-8 h-8" alt="Explore" />
            <span className="text-black text-2xl font-bold font-['Cabin']">Explore Tours</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-black text-2xl md:text-3xl font-normal font-['Castoro'] leading-relaxed">
                Join us on unforgettable guided bike tours through some of the most stunning landscapes. Whether you're chasing mountain views, forest trails, or coastal breezes, One Way Bike Tour takes you closer to nature — one ride at a time
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden">
                  <img src={asset11} className="w-full h-full object-contain" alt="Eco Friendly" />
                </div>
                <h3 className="text-[#102e38] text-xl font-extrabold font-['Playfair_Display']">Eco Friendly</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden">
                  <img src={asset12} className="w-full h-full object-contain" alt="Expert-led" />
                </div>
                <h3 className="text-[#102e38] text-xl font-extrabold font-['Playfair_Display']">Expert-led</h3>
              </div>
              <div className="text-center sm:col-span-2">
                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden">
                  <img src={asset13} className="w-full h-full object-contain" alt="Easy to book" />
                </div>
                <h3 className="text-[#102e38] text-xl font-extrabold font-['Playfair_Display']">Easy to book</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 bg-[#eff4ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#0e3d4d] text-3xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              Where would you like to start?
            </h2>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-neutral-100 rounded-full shadow-lg p-4 flex items-center">
                <input 
                  type="text" 
                  placeholder="Copenhagen" 
                  className="flex-1 bg-transparent text-[#4b4b4b] text-2xl md:text-4xl font-bold font-['Playfair_Display'] outline-none px-4"
                />
                <div className="w-12 h-12 overflow-hidden">
                  <img src={asset15} className="w-full h-full object-contain" alt="Search" />
                </div>
              </div>
            </div>

            <h3 className="text-[#0e3d4d] text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-8">
              Suggest Journeys
            </h3>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Gothenburg */}
            <div className="relative rounded-[20px] overflow-hidden h-96">
              <img src={asset2} className="w-full h-full object-cover" alt="Gothenburg" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] mb-1">Gothenburg</h4>
                <p className="text-white text-lg font-medium font-['Inter']">Sweden, 14 Days</p>
              </div>
            </div>

            {/* Berlin - spans 2 columns on larger screens */}
            <div className="relative rounded-[20px] overflow-hidden h-96 md:col-span-2">
              <img src={asset3} className="w-full h-full object-cover" alt="Berlin" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] mb-1">Berlin</h4>
                <p className="text-white text-lg font-medium font-['Inter']">Germany, 14 Days</p>
              </div>
            </div>

            {/* Oslo */}
            <div className="relative rounded-[20px] overflow-hidden h-96">
              <img src={asset4} className="w-full h-full object-cover" alt="Oslo" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] mb-1">Oslo</h4>
                <p className="text-white text-lg font-medium font-['Inter']">Norway, 12 Days</p>
              </div>
            </div>

            {/* Amsterdam */}
            <div className="relative rounded-[20px] overflow-hidden h-96">
              <img src={asset5} className="w-full h-full object-cover" alt="Amsterdam" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] mb-1">Amsterdam</h4>
                <p className="text-white text-lg font-medium font-['Inter']">Netherland, 20 Days</p>
              </div>
            </div>

            {/* Hamburg */}
            <div className="relative rounded-[20px] overflow-hidden h-96">
              <img src={asset6} className="w-full h-full object-cover" alt="Hamburg" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] mb-1">Hamburg</h4>
                <p className="text-white text-lg font-medium font-['Inter']">Germany, 14 Days</p>
              </div>
            </div>
          </div>

          {/* See All Journeys Button */}
          <div className="text-center">
            <button className="bg-[#2e7d32] text-white px-8 py-3 rounded-full border-2 border-[#2e7d32] flex items-center gap-2 mx-auto hover:bg-[#1b5e20] transition-colors">
              <span className="text-base font-medium font-['Inter']">See all journeys</span>
              <img src={asset16} className="w-4 h-4" alt="Arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* Group Discounts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={asset7} className="w-full h-auto rounded-lg" alt="Group bike tour" />
            </div>
            <div>
              <h2 className="text-black text-2xl md:text-3xl font-bold mb-4">
                Planning a trip with friends?<br/>
                Ask about our group discounts!
              </h2>
              <p className="text-black text-lg mb-6">
                We've made our tours more accessible with student and group packages.
              </p>
              <p className="text-black text-lg">
                When booking your journey, just add the number of people in your group. If you're 5 or more, the discount is applied automatically — no extra steps needed!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#102e38] relative overflow-hidden">
        <img src={asset10} className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-auto h-48" alt="Decorative" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
            Ready to go?<br/>Give us a quick call
          </h2>
          <button className="bg-[#2e7d32] text-white px-8 py-3 rounded-full border-2 border-[#2e7d32] flex items-center gap-2 mx-auto hover:bg-[#1b5e20] transition-colors">
            <span className="text-base font-medium font-['Inter']">Contact us</span>
            <img src={asset9} className="w-4 h-4" alt="Arrow" />
          </button>
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

export default Home

