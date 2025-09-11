import contactImage from '../assets/225-1782.webp'

function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#0e3d4d] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Ready to start your cycling adventure? Have questions about our tours? 
              We're here to help you plan the perfect bike tour experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none"
                    placeholder="+45 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tour Interest
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none">
                    <option>Select a tour</option>
                    <option>Berlin Adventure</option>
                    <option>Hamburg Explorer</option>
                    <option>Copenhagen-Malmö</option>
                    <option>Oslo Mountain Trail</option>
                    <option>Amsterdam Canals</option>
                    <option>Custom Tour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent outline-none"
                    placeholder="Tell us about your cycling experience, group size, preferred dates, or any questions you have..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2e7d32] text-white py-3 px-6 rounded-lg hover:bg-[#1b5e20] transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <img src={contactImage} className="w-full h-64 object-cover rounded-lg" alt="Contact us" />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#2e7d32] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">📍</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Address</div>
                        <div className="text-gray-600">
                          Nyhavn 12, 1051 Copenhagen K<br/>
                          Denmark
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#2e7d32] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">📞</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Phone</div>
                        <div className="text-gray-600">+45 33 12 34 56</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#2e7d32] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">✉️</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <div className="text-gray-600">info@onewaybiketours.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contact</h3>
                  <p className="text-gray-600 mb-2">
                    24/7 support during tours:
                  </p>
                  <p className="text-[#2e7d32] font-bold text-lg">+45 70 12 34 56</p>
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

export default Contact

