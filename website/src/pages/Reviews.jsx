function Reviews() {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing experience! The Berlin tour was perfectly organized and our guide was incredibly knowledgeable. Highly recommend!",
      tour: "Berlin Adventure",
      date: "August 2024"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "The Hamburg route was scenic and well-planned. Great bikes and excellent support throughout the journey.",
      tour: "Hamburg Explorer",
      date: "July 2024"
    },
    {
      name: "Emma Wilson",
      rating: 4,
      comment: "Wonderful tour through Copenhagen to Malmö. The only minor issue was weather, but that's not their fault!",
      tour: "Copenhagen-Malmö",
      date: "June 2024"
    },
    {
      name: "David Rodriguez",
      rating: 5,
      comment: "Eco-friendly approach and professional service. The e-bikes made the hills much more enjoyable!",
      tour: "Oslo Mountain Trail",
      date: "September 2024"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[#0e3d4d] text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-8">
              What Our Riders Say
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Read reviews from fellow adventurers who have experienced the joy of cycling 
              through Europe's most beautiful landscapes with us.
            </p>
          </div>

          {/* Rating Summary */}
          <div className="bg-[#eff4ff] rounded-lg p-8 mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl font-bold text-[#2e7d32] mr-4">4.8</div>
              <div>
                <div className="flex text-yellow-400 text-2xl mb-2">
                  ★★★★★
                </div>
                <div className="text-gray-600">Based on 273 reviews</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-2xl font-bold text-[#2e7d32]">98%</div>
                <div className="text-gray-600">Recommended</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2e7d32]">4.9</div>
                <div className="text-gray-600">Guide Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2e7d32]">4.7</div>
                <div className="text-gray-600">Value for Money</div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#2e7d32] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-600">{review.date}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="text-sm text-[#2e7d32] font-medium">
                  Tour: {review.tour}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your Own Adventure?</h3>
            <button className="bg-[#2e7d32] text-white px-8 py-3 rounded-lg hover:bg-[#1b5e20] transition-colors">
              Book Your Tour Today
            </button>
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

export default Reviews

