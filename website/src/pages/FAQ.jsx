import { useState } from 'react'

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: "What's included in the tour price?",
      answer: "Our tour price includes bike rental, helmet, guided tours, accommodation, breakfast, route maps, and 24/7 support. Lunch and dinner are not included to give you flexibility to explore local cuisine."
    },
    {
      question: "What type of bikes do you provide?",
      answer: "We offer touring bikes, gravel bikes, e-bikes, and mountain bikes. All bikes are professionally maintained and equipped with necessary accessories like lights, locks, and repair kits."
    },
    {
      question: "Do I need to be an experienced cyclist?",
      answer: "Our tours cater to different skill levels. We have beginner-friendly routes and more challenging options for experienced cyclists. Each tour description includes difficulty level and distance information."
    },
    {
      question: "What happens if it rains?",
      answer: "We provide rain gear and have indoor alternatives for severe weather. Our guides are experienced in all weather conditions and will ensure your safety and comfort throughout the tour."
    },
    {
      question: "Can I bring my own bike?",
      answer: "Yes! You can bring your own bike. We offer a discount on the tour price if you use your own equipment. We also provide bike shipping services to your starting location."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Free cancellation up to 14 days before departure. Cancellations within 14 days are subject to a 50% fee. We also offer travel insurance options to protect your investment."
    },
    {
      question: "Are meals included?",
      answer: "Breakfast is included in all tours. For lunch and dinner, we provide recommendations for local restaurants and can arrange group meals upon request."
    },
    {
      question: "What should I pack?",
      answer: "We provide a detailed packing list upon booking. Essential items include comfortable cycling clothes, personal items, and weather-appropriate gear. We provide panniers for your belongings."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#0e3d4d] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-xl">
              Find answers to common questions about our bike tours. 
              Can't find what you're looking for? Contact us directly!
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-[#2e7d32] text-xl">
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center bg-[#eff4ff] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our friendly team is here to help you plan the perfect cycling adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#2e7d32] text-white px-6 py-3 rounded-lg hover:bg-[#1b5e20] transition-colors">
                Contact Us
              </button>
              <button className="border border-[#2e7d32] text-[#2e7d32] px-6 py-3 rounded-lg hover:bg-[#2e7d32] hover:text-white transition-colors">
                Live Chat
              </button>
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

export default FAQ

