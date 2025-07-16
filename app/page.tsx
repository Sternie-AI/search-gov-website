"use client"

import Link from "next/link"
import {
  ArrowRight,
  Zap,
  UserCheck,
  ShieldCheck,
  Settings2,
  Users,
  CheckCircle,
  MessageSquare,
  BarChartHorizontalBig,
  Building,
  Users2,
  ShieldAlert,
  Lock,
  BookOpen,
  Layers,
  Mail,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { EnhancedContactForm } from "@/components/contact-form"

export default function Home() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [formSubmittedData, setFormSubmittedData] = useState<any>(null)

  const handleFormSuccess = (data: any) => {
    setFormSubmittedData(data)
  }

  const closeDialogAndReset = () => {
    setIsContactDialogOpen(false)
    setTimeout(() => setFormSubmittedData(null), 300)
  }

  return (
    <>
      <Dialog
        open={isContactDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeDialogAndReset()
          } else {
            setIsContactDialogOpen(true)
          }
        }}
      >
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                          <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                  <Image src="/images/searchgov-logo.png" alt="SearchGov.ai Logo" width={38} height={38} />
                  <span className="text-xl font-bold text-old-glory-blue tracking-tight">SearchGov AI</span>
                </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="#use-cases" className="transition-colors hover:text-primary">
                  Use Cases
                </Link>
                <Link href="#trust" className="transition-colors hover:text-primary">
                  Trust
                </Link>
                <Link href="#implementation" className="transition-colors hover:text-primary">
                  Implementation
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      setFormSubmittedData(null)
                      setIsContactDialogOpen(true)
                    }}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden sm:block"
                  >
                    Contact
                  </button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setFormSubmittedData(null)
                      setIsContactDialogOpen(true)
                    }}
                  >
                    Schedule Demo
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {/* ... Hero Section ... */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              </div>
              <div className="container relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-24">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        Transform your government website's search experience with{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                          AI-powered responses
                        </span>
                      </h1>
                      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Focus on understanding citizen queries and providing instant, contextual information.
                        SearchGov AI helps you deliver accurate answers and enhance user satisfaction.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <DialogTrigger asChild>
                        <Button 
                          size="lg" 
                          className="gap-2"
                          onClick={() => {
                            setFormSubmittedData(null)
                            setIsContactDialogOpen(true)
                          }}
                        >
                          Schedule Demo <ArrowRight className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </div>
                    <div id="benefits" className="grid grid-cols-2 sm:grid-cols-2 gap-6 pt-8">
                      <div className="space-y-2">
                        <Zap className="h-8 w-8 text-primary mb-1" />
                        <h4 className="text-2xl font-bold">Instant, Accurate Answers</h4>
                        <p className="text-sm text-muted-foreground">
                          Real-time responses to citizen inquiries, ensuring they find what they need quickly.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <UserCheck className="h-8 w-8 text-primary mb-1" />
                        <h4 className="text-2xl font-bold">Reduced Support Burden</h4>
                        <p className="text-sm text-muted-foreground">
                          Automate responses to common questions, freeing up staff for complex issues.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Users className="h-8 w-8 text-primary mb-1" />
                        <h4 className="text-2xl font-bold">Enhanced Citizen Experience</h4>
                        <p className="text-sm text-muted-foreground">
                          Provide 24/7 access to information with a user-friendly, intelligent search.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <BarChartHorizontalBig className="h-8 w-8 text-primary mb-1" />
                        <h4 className="text-2xl font-bold">Data-Driven Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Understand citizen needs better through analytics on search queries and trends.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
                    <div className="relative bg-card rounded-2xl border p-6 shadow-2xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold">SearchGov AI Preview</h3>
                            <p className="text-sm text-muted-foreground">AI-powered search in action</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href="#use-cases">Learn More</Link>
                          </Button>
                        </div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden">
                          <video 
                            className="w-full h-full object-cover rounded-lg"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                          >
                            <source src="/demo.mov" type="video/quicktime" />
                            <source src="/demo.mov" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Imagine citizens asking: "How do I apply for a building permit?" and getting instant, accurate
                          answers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="use-cases" className="bg-background py-24">
              <div className="container space-y-12">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                  Empowering Every Level of Government
                </h2>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <Users2 className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-xl font-bold">For Citizens</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>24/7 Information Access</li>
                        <li>Simplified Navigation</li>
                        <li>Personalized Responses</li>
                        <li>Multi-language Support</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <Building className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-xl font-bold">For Administrators</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Knowledge Base Management</li>
                        <li>Analytics Dashboard</li>
                        <li>Content Optimization</li>
                        <li>Streamlined Workflows</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-xl font-bold">For Agencies</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Department Integration</li>
                        <li>Compliance Management</li>
                        <li>Enhanced Public Trust</li>
                        <li>Secure Data Handling</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section id="trust" className="bg-muted/50 py-24">
              <div className="container space-y-12">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                  Trust & Compliance You Can Rely On
                </h2>
                <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto text-center">
                  We are committed to the highest standards of security, privacy, and transparency for government
                  applications.
                </p>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-6 space-y-2">
                      <Lock className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-lg font-semibold">Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Encryption badges, regular security audits, and adherence to stringent compliance standards.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-2">
                      <ShieldAlert className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-lg font-semibold">Privacy</h3>
                      <p className="text-sm text-muted-foreground">
                        No personal data collection, anonymous processing, and strict privacy policies.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-2">
                      <CheckCircle className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-lg font-semibold">Compliance</h3>
                      <p className="text-sm text-muted-foreground">
                        Meets Section 508 standards and accessibility compliance guidelines.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-2">
                      <BookOpen className="h-10 w-10 text-primary mb-2" />
                      <h3 className="text-lg font-semibold">Transparency</h3>
                      <p className="text-sm text-muted-foreground">
                        Clear source citations for AI-generated answers, commitment to AI ethics, and comprehensive
                        audit trails.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section id="implementation" className="py-24">
              <div className="container space-y-12">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                  Seamless Implementation Process
                </h2>
                <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto text-center">
                  Getting started with SearchGov AI is straightforward and designed for minimal disruption.
                </p>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Settings2 className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Simple Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      No infrastructure changes required. Automatic indexing of your content.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Layers className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Customization</h3>
                    <p className="text-sm text-muted-foreground">
                      Tailor SearchGov.ai to match your branding and specific requirements. Customize the look and feel,
                      knowledge sources, and response styles.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Mail className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Ongoing Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Dedicated support team, regular updates, and performance monitoring. We ensure your search
                      solution remains effective and up-to-date.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-between space-y-4 py-6 md:flex-row">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center font-bold">
                  <Image src="/images/searchgov-logo.png" alt="SearchGov.ai Logo" width={50} height={50} />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">© 2025 SearchGov.ai. All rights reserved.</p>
            </div>
          </footer>
        </div>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0">
          {/* Header: Fixed at top, never scrolls */}
          <div className="px-6 pt-6 pb-4 border-b bg-background">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">
                Let's Transform Your Agency's Search Experience
                
              </DialogTitle>
              <DialogDescription>Connect with our government solutions team in under 60 seconds.</DialogDescription>
            </DialogHeader>
          </div>

          {/* Body: Scrollable region */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-6 py-6">
              {formSubmittedData ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank you, {formSubmittedData.firstName}!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your request has been received. We'll be in touch within 2 business hours.
                  </p>
                  <DialogFooter className="sm:justify-center">
                    <Button onClick={closeDialogAndReset}>Close</Button>
                  </DialogFooter>
                </div>
              ) : (
                <EnhancedContactForm setOpen={setIsContactDialogOpen} onFormSuccess={handleFormSuccess} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
