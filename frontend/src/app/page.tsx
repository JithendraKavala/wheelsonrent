'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/common/star-rating';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Car, Plus, CheckCircle, Calendar, MapPin, Clock } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    testimonial: 'I rented a car for a weekend trip, and the process was so smooth. Highly recommend!',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Daniel K.',
    testimonial: 'Listing my bike has been a great side income. Easy to manage and safe.',
    avatar: 'https://placehold.co/100x100.png',
  },
];

const featuredVehicles = [
  {
    id: 2,
    name: 'Royal Enfield Classic 350',
    price: 1200,
    rating: 4.8,
    image: 'https://pub-6b7a2d4abcd347c0bf6fa580cf11b5a5.r2.dev/f9eea0b9-fb32-43c6-a964-cfc4f3106ec6_--redditch1738919737719.avif',
    type: 'Bike'
  },
  {
    id: 1,
    name: "Ather Rizta",
    price: 800,
    rating: 4.9,
    image: 'https://pub-6b7a2d4abcd347c0bf6fa580cf11b5a5.r2.dev/01dfe4d9-06e0-4385-9587-b529fb676c3c_ather-select-model-deccan-grey-1712392628151.avif',
    type: 'Bike'
  },
  {
    id: 4,
    name: 'Tesla Model Y',
    price: 1800,
    rating: 4.7,
    image: 'https://pub-6b7a2d4abcd347c0bf6fa580cf11b5a5.r2.dev/7067d312-732e-4101-bf7f-de3e4ad42177_tesla--model-y.jpg',
    type: 'Car'
  },
];

export default function Home() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: '',
    vehicleType: 'all'
  });

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchForm.location) params.set('location', searchForm.location);
    if (searchForm.pickupDate) params.set('pickupDate', searchForm.pickupDate);
    if (searchForm.dropoffDate) params.set('dropoffDate', searchForm.dropoffDate);
    if (searchForm.vehicleType && searchForm.vehicleType !== 'all') {
      params.set('type', searchForm.vehicleType);
    }
    
    // Navigate to browse page with search parameters
    const queryString = params.toString();
    router.push(`/browse${queryString ? `?${queryString}` : ''}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find the perfect ride or share yours today.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            A simple way to rent vehicles or earn money by listing your own.
          </p>
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Input 
                    placeholder="Enter location" 
                    value={searchForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Pickup Date
                  </label>
                  <Input 
                    type="date" 
                    value={searchForm.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Drop-off Date
                  </label>
                  <Input 
                    type="date" 
                    value={searchForm.dropoffDate}
                    onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type</label>
                  <Select value={searchForm.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Type</SelectItem>
                      <SelectItem value="CAR">Car</SelectItem>
                      <SelectItem value="BIKE">Bike</SelectItem>
                      <SelectItem value="VAN">Van</SelectItem>
                      <SelectItem value="TRUCK">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/browse">
                <Car className="mr-2 h-5 w-5" />
                 Rent a Vehicle
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/owner/add">
                <Plus className="mr-2 h-5 w-5" />
                 List Your Vehicle
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get started in just 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">1. Search</h3>
              <p className="text-muted-foreground">Browse available vehicles near you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">2. Book</h3>
              <p className="text-muted-foreground">Reserve securely in just a few clicks.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">3. Drive</h3>
              <p className="text-muted-foreground">Pick up and enjoy the ride.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-lg text-muted-foreground">Discover some of our most popular rides</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{vehicle.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{vehicle.type}</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={vehicle.rating} />
                      <span className="text-sm text-muted-foreground ml-1">({vehicle.rating})</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary">₹{vehicle.price}<span className="text-sm text-muted-foreground font-normal">/day</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">Browse All Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">Experience the difference with WheelsOnRent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
              <p className="text-muted-foreground text-sm">Cars, bikes, and vans for every need</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Affordable Pricing</h3>
              <p className="text-muted-foreground text-sm">Flexible and competitive rates</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">Safe transactions & verified owners</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Round-the-clock customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-lg text-muted-foreground">What our users are saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Ready to hit the road or start earning?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied users who trust WheelsOnRent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/browse">
                <Car className="mr-2 h-5 w-5" />
                Rent a Vehicle
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/owner/add">
                <Plus className="mr-2 h-5 w-5" />
                List Your Vehicle
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
