import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to <span className="text-blue-600">Care</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your health, simplified. Book appointments, track records, and
              connect with doctors — all in one place.
            </p>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md">
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="px-6 py-3 rounded-2xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1706267701238-b4d69fc8f640?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare illustration"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Our <span className="text-blue-600">Services</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Patient Management
                </h3>
                <p className="text-gray-600">
                  Keep track of medical history, allergies, and medications in
                  one secure place.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Appointments</h3>
                <p className="text-gray-600">
                  Schedule visits with doctors and manage your health seamlessly
                  online.
                </p>
                <div>
                  <Link href="/booking" className="mt-4 inline-block">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow-md">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Health Records</h3>
                <p className="text-gray-600">
                  Access your records anytime and get valuable insights from
                  your health data.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md flex items-center gap-2">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why <span className="text-blue-600">Choose Care?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">24/7 Appointments</h3>
              <p className="text-gray-600">
                Book appointments anytime, anywhere.
              </p>
            </Card>
            <Card className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">Secure Records</h3>
              <p className="text-gray-600">
                All patient data is safely stored and private.
              </p>
            </Card>
            <Card className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">Expert Doctors</h3>
              <p className="text-gray-600">
                Access qualified medical professionals easily.
              </p>
            </Card>
            <Card className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">Easy Billing</h3>
              <p className="text-gray-600">
                Simplify payments and insurance processing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg rounded-2xl p-6">
              <p className="text-gray-600 mb-4">
                "The appointment system is so easy to use! I can book with my
                doctor in seconds."
              </p>
              <h3 className="font-semibold">Jane Mwangi</h3>
              <span className="text-gray-500 text-sm">Patient</span>
            </Card>
            <Card className="shadow-lg rounded-2xl p-6">
              <p className="text-gray-600 mb-4">
                "Managing my health records online has saved me so much time."
              </p>
              <h3 className="font-semibold">John Ochieng</h3>
              <span className="text-gray-500 text-sm">Patient</span>
            </Card>
            <Card className="shadow-lg rounded-2xl p-6">
              <p className="text-gray-600 mb-4">
                "Care makes it easy to connect with doctors and track my
                appointments."
              </p>
              <h3 className="font-semibold">Mary Atieno</h3>
              <span className="text-gray-500 text-sm">Patient</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to simplify your healthcare?
        </h2>
        <p className="mb-6">
          Sign up today and take control of your health journey.
        </p>
        <Link href="/sign-in">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-2xl">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-700 mb-6 md:mb-0">
            <h4 className="font-bold text-lg">Care Hospital</h4>
            <p>123 Health St, Nairobi, Kenya</p>
            <p>Phone: +254 712 345 678</p>
            <p>Email: info@carehospital.com</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-blue-600"
            >
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
