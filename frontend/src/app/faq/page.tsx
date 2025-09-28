'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, ChevronDown } from 'lucide-react';

const faqCategories = [
  {
    title: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your personal details, verify your email address, and you\'re ready to start renting or listing vehicles.'
      },
      {
        question: 'What documents do I need to get started?',
        answer: 'You\'ll need a valid driver\'s license and a government-issued photo ID for verification. If you\'re listing a vehicle, you\'ll also need the vehicle\'s registration documents and proof of insurance.'
      },
      {
        question: 'Is there a fee to join WheelsOnRent?',
        answer: 'Creating an account and browsing vehicles is completely free! We only charge fees when you successfully complete a rental transaction.'
      },
      {
        question: 'How do I verify my identity?',
        answer: 'After creating your account, you\'ll receive an email with verification instructions. You\'ll need to upload a clear photo of your driver\'s license and a selfie for identity verification.'
      }
    ]
  },
  {
    title: 'Renting Vehicles',
    icon: '🚗',
    questions: [
      {
        question: 'How do I search for vehicles?',
        answer: 'Use our search filters to find vehicles by location, type, price range, and availability dates. You can also browse by vehicle type (car, bike, van, truck) and see ratings from other renters.'
      },
      {
        question: 'How do I book a vehicle?',
        answer: 'Select your desired vehicle, choose your pickup and return dates, review the rental terms, provide payment information, and confirm your booking. You\'ll receive a confirmation email with all details.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and digital wallets. All payments are processed securely through our platform with fraud protection.'
      },
      {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking, but cancellation policies vary by owner. Most bookings can be cancelled up to 24 hours before pickup for a full refund.'
      },
      {
        question: 'What if the vehicle isn\'t available when I arrive?',
        answer: 'If the vehicle isn\'t available due to owner issues, we\'ll help you find an alternative or provide a full refund. Contact our support team immediately if this happens.'
      }
    ]
  },
  {
    title: 'Listing Vehicles',
    icon: '💰',
    questions: [
      {
        question: 'How do I list my vehicle?',
        answer: 'Go to "List Your Vehicle" in the navigation, fill in your vehicle details including photos, description, pricing, and availability. Set your pickup location and terms, then submit for review.'
      },
      {
        question: 'How much can I earn?',
        answer: 'Earnings depend on your vehicle type, condition, location, and pricing. Popular vehicles in high-demand areas can earn owners ₹500-5000+ per day. Set competitive rates to maximize bookings.'
      },
      {
        question: 'What are the requirements to list a vehicle?',
        answer: 'Your vehicle must be legally registered, insured, in good working condition, and less than 10 years old. You must own the vehicle or have permission from the owner to rent it out.'
      },
      {
        question: 'How do I set my pricing?',
        answer: 'Research similar vehicles in your area to set competitive rates. Consider factors like vehicle age, condition, features, and demand. You can adjust pricing anytime through your dashboard.'
      },
      {
        question: 'What if my vehicle gets damaged?',
        answer: 'Our platform includes comprehensive insurance coverage for vehicle damage. Report any damage immediately, and we\'ll handle the claims process and repairs.'
      }
    ]
  },
  {
    title: 'Safety & Security',
    icon: '🛡️',
    questions: [
      {
        question: 'How do you verify users?',
        answer: 'All users must verify their identity with a valid driver\'s license and photo ID. We also check driving records and use advanced fraud detection systems.'
      },
      {
        question: 'What insurance coverage is provided?',
        answer: 'We provide comprehensive insurance coverage for both renters and vehicle owners, including liability, collision, and comprehensive coverage up to the vehicle\'s value.'
      },
      {
        question: 'How do you handle disputes?',
        answer: 'Our dedicated support team mediates all disputes fairly. We review evidence from both parties and make decisions based on our terms of service and applicable laws.'
      },
      {
        question: 'What if someone steals my vehicle?',
        answer: 'Vehicle theft is extremely rare on our platform due to our verification process. If it does occur, we have comprehensive insurance coverage and work with law enforcement.'
      }
    ]
  },
  {
    title: 'Billing & Payments',
    icon: '💳',
    questions: [
      {
        question: 'When do I get paid as a vehicle owner?',
        answer: 'You receive payment within 24 hours after the rental period ends, minus our platform fee. Payments are deposited directly to your registered bank account.'
      },
      {
        question: 'What fees does WheelsOnRent charge?',
        answer: 'We charge a 10-15% platform fee to vehicle owners for each successful rental. Renters pay the rental cost plus any applicable taxes and fees.'
      },
      {
        question: 'Can I get a refund if I\'m not satisfied?',
        answer: 'Refunds are handled case-by-case. If you\'re not satisfied with your rental experience, contact our support team within 24 hours of returning the vehicle.'
      },
      {
        question: 'Do you offer any discounts?',
        answer: 'Yes! We offer discounts for long-term rentals (7+ days), first-time users, and frequent renters. Check our promotions page for current offers.'
      }
    ]
  },
  {
    title: 'Technical Support',
    icon: '🔧',
    questions: [
      {
        question: 'The app isn\'t working properly. What should I do?',
        answer: 'Try refreshing the page or updating your browser. If issues persist, clear your browser cache or try using a different browser. Contact support if problems continue.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to your account settings, click "Edit Profile," make your changes, and save. Some changes like email address may require re-verification.'
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the email we send you.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact our support team to request account deletion. We\'ll help you close any active rentals and process the deletion within 30 days.'
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const allQuestions = faqCategories.flatMap(category =>
    category.questions.map(q => ({
      ...q,
      category: category.title,
      icon: category.icon
    }))
  );

  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about renting and listing vehicles on WheelsOnRent.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {searchQuery ? (
            /* Search Results */
            <div>
              <h2 className="font-headline text-2xl font-bold mb-8">
                Search Results ({filteredQuestions.length} found)
              </h2>
              <div className="space-y-4">
                {filteredQuestions.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{item.question}</h3>
                            <span className="text-xs bg-muted px-2 py-1 rounded">{item.category}</span>
                          </div>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            /* Category-based FAQ */
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="font-headline text-3xl font-bold">{category.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem key={questionIndex} value={`${categoryIndex}-${questionIndex}`}>
                        <Card>
                          <AccordionTrigger className="hover:no-underline">
                            <CardContent className="p-6 text-left">
                              <h3 className="font-semibold text-lg">{item.question}</h3>
                            </CardContent>
                          </AccordionTrigger>
                          <AccordionContent>
                            <CardContent className="pt-0 pb-6">
                              <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                            </CardContent>
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="/contact">Contact Support</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:support@wheelsonrent.com">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
