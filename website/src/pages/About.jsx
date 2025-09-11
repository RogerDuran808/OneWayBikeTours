import aboutImage from '../assets/77-1899.webp'

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#0e3d4d] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              About One Way Bike Tours
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              We're passionate about creating unforgettable cycling experiences that connect you with nature, 
              culture, and adventure across Europe's most beautiful landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img src={aboutImage} className="w-full h-auto rounded-lg shadow-lg" alt="About us" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2018, One Way Bike Tours began with a simple mission: to make cycling adventures 
                accessible to everyone. Our founders, avid cyclists themselves, recognized the need for 
                well-organized, eco-friendly tours that showcase Europe's hidden gems.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Today, we've guided thousands of adventurers through scenic routes across Scandinavia and 
                Northern Europe, creating memories that last a lifetime while promoting sustainable tourism.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2e7d32] mb-2">500+</div>
                  <div className="text-gray-600">Tours Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2e7d32] mb-2">15</div>
                  <div className="text-gray-600">Destinations</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                We're committed to sustainable tourism and minimizing our environmental impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Guides</h3>
              <p className="text-gray-600">
                Our experienced guides know every route and are passionate about sharing local culture.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-600">
                From booking to the end of your journey, we ensure every detail is perfect.
              </p>
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

export default About

