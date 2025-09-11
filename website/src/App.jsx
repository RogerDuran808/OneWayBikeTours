import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { User, Shield, Clock, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import './App.css'

// Import images
import heroBackground from './assets/hero-bg.jpg'
import bikeTourImage from './assets/bike-tour-image.jpg'
import sevilleImage from './assets/seville.jpg'
import berlinImage from './assets/berlin.jpg'
import osloImage from './assets/oslo.jpg'
import amsterdamImage from './assets/amsterdam.jpg'
import hamburgImage from './assets/hamburg.jpg'
import Logo from './assets/Logo.svg'

function App() {
  const [selectedCity, setSelectedCity] = useState('Copenhagen')

  const destinations = [
    { name: 'Seville', description: 'Historic charm', image: sevilleImage },
    { name: 'Berlin', description: 'Urban adventure', image: berlinImage },
    { name: 'Oslo', description: 'Nordic beauty', image: osloImage },
    { name: 'Amsterdam', description: 'Canal views', image: amsterdamImage },
    { name: 'Hamburg', description: 'Maritime culture', image: hamburgImage }
  ]

  const features = [
    { icon: User, title: 'Eco Friendly', color: 'text-green-500' },
    { icon: Shield, title: 'Expert led', color: 'text-green-500' },
    { icon: Clock, title: 'All levels', color: 'text-green-500' },
    { icon: MapPin, title: 'Amazing locations', color: 'text-green-500' }
  ]

  const bookingSteps = [
    { number: 1, title: 'Choose tour', description: 'Select your preferred destination' },
    { number: 2, title: 'Choose bike', description: 'Pick the perfect bike for your journey' },
    { number: 3, title: 'Add your details', description: 'Fill in your information' },
    { number: 4, title: 'Experience the adventure', description: 'Enjoy your bike tour' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <img src={Logo} alt="ONE WAY BIKE TOURS" className="h-8 w-auto" />
        <div className="hidden md:flex space-x-6">
          <a href="#tours" className="text-gray-700 hover:text-green-600">Tours</a>
          <a href="#bikes" className="text-gray-700 hover:text-green-600">Bikes</a>
          <a href="#about" className="text-gray-700 hover:text-green-600">About us</a>
          <a href="#reviews" className="text-gray-700 hover:text-green-600">Reviews</a>
          <a href="#faq" className="text-gray-700 hover:text-green-600">FAQ</a>
        </div>
        <Button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 bg-green-600 hover:bg-green-700 text-white">
          Book Now
        </Button>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            ONE WAY<br />
            BIKE TOURS
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-6">
            RIDE INTO<br />
            NATURE
          </h2>
          <p className="text-xl mb-8">Discover the adventure</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
            Discover more
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Join us on unforgettable guided bike tours through some of the most stunning landscapes
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're seeking scenic routes through rolling hills and coastal breezes, 
                One Way Bike Tours takes you closer to nature - one ride at a time.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <feature.icon className={`w-12 h-12 mx-auto mb-3 ${feature.color}`} />
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src={bikeTourImage} 
                alt="Bike Tour" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">4 STEPS BOOKING</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Where would you like to start?
          </h2>
          
          <div className="flex justify-center mb-12">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-48 bg-green-100 border-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Copenhagen">Copenhagen</SelectItem>
                <SelectItem value="Berlin">Berlin</SelectItem>
                <SelectItem value="Amsterdam">Amsterdam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-8">Suggest journeys</h3>
          
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {destinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{destination.name}</h4>
                  <p className="text-gray-600 text-sm">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              View more
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-600">ONE WAY BIKE TOURS</h3>
              <p className="text-gray-600">Discover the world on two wheels</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-700 hover:text-green-600">About us</a>
                <a href="#tours" className="block text-gray-700 hover:text-green-600">Tours</a>
                <a href="#bikes" className="block text-gray-700 hover:text-green-600">Bikes</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Follow us</h4>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
