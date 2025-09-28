import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Car, MapPin, Shield, Clock, CreditCard, Users, Star } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-6">
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Getting started with WheelsOnRent is simple. Whether you want to rent a vehicle or list your own, we've made the process easy and secure.
          </p>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">For Renters</h2>
            <p className="text-lg text-muted-foreground">Find and book your perfect ride in 3 easy steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">1. Search & Browse</h3>
              <p className="text-muted-foreground mb-4">
                Use our search filters to find vehicles by location, type, price, and availability. Browse detailed photos, descriptions, and reviews.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Search by location
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Car className="h-4 w-4" />
                  Filter by vehicle type
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4" />
                  Check ratings & reviews
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">2. Book Securely</h3>
              <p className="text-muted-foreground mb-4">
                Select your dates, review the terms, and book with secure payment processing. All transactions are protected.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Choose pickup & return dates
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Secure payment processing
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" />
                  Protected transactions
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">3. Pick Up & Drive</h3>
              <p className="text-muted-foreground mb-4">
                Meet the owner at the agreed location, inspect the vehicle, and start your journey. Return it as agreed upon.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Meet at pickup location
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Car className="h-4 w-4" />
                  Vehicle inspection
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  Return on time
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/browse">Start Renting Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">For Vehicle Owners</h2>
            <p className="text-lg text-muted-foreground">Turn your vehicle into a source of income</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">1. List Your Vehicle</h3>
              <p className="text-muted-foreground mb-4">
                Create a detailed listing with photos, description, pricing, and availability. Set your own terms and conditions.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Car className="h-4 w-4" />
                  Upload vehicle photos
                </li>
                <li className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Set pickup location
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Set your pricing
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">2. Get Bookings</h3>
              <p className="text-muted-foreground mb-4">
                Receive booking requests from verified renters. Review their profiles and approve bookings that work for you.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  Verified renter profiles
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4" />
                  Review renter ratings
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Manage availability
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-4">3. Earn Money</h3>
              <p className="text-muted-foreground mb-4">
                Get paid securely after each rental. Track your earnings and manage your listings from your dashboard.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Secure payments
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  Track earnings
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" />
                  Insurance coverage
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/owner/add">List Your Vehicle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety & Security Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Safety & Security</h2>
            <p className="text-lg text-muted-foreground">Your safety is our priority</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Verified Users</h3>
                <p className="text-muted-foreground text-sm">All users go through identity verification</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <CreditCard className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
                <p className="text-muted-foreground text-sm">Protected transactions with escrow</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Review System</h3>
                <p className="text-muted-foreground text-sm">Rate and review for community trust</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-muted-foreground text-sm">Round-the-clock customer assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How do I get started?</h3>
                <p className="text-muted-foreground text-sm">
                  Simply create an account, verify your identity, and start browsing vehicles or listing your own.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What documents do I need?</h3>
                <p className="text-muted-foreground text-sm">
                  A valid driver's license and government-issued ID for verification. Vehicle owners need registration documents.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How are payments handled?</h3>
                <p className="text-muted-foreground text-sm">
                  All payments are processed securely through our platform with escrow protection until rental completion.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What if there's damage?</h3>
                <p className="text-muted-foreground text-sm">
                  Our platform includes insurance coverage and dispute resolution to handle any issues fairly.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who trust WheelsOnRent for their vehicle rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/browse">Start Renting</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/owner/add">Start Earning</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
