import React from "react";
import {
  Briefcase,
  Building2,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";
import AddJob from "@/components/card/AddJob";

export default function page() {
  return (
    <div className="min-h-screen ">
      <section className="pt-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold  mb-8">
              Find Your
              <span className="text-blue-600 block">Dream Career</span>
            </h1>
            <p className="text-xl  mb-12 max-w-3xl mx-auto">
              Connect with top companies and discover opportunities that match
              your skills and ambitions. Your next career move starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                href="/jobs"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-4 text-xl font-semibold min-w-64"
              >
                <Briefcase className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span>Browse Jobs</span>
              </Link>
              <Link
                href="/company"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-4 text-xl font-semibold min-w-64"
              >
                <Building2 className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span>Explore Companies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className=" font-medium">Active Jobs</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                10K+
              </div>
              <div className="font-medium">Companies</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="font-medium">Job Seekers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold  mb-4">
              Why Choose JobHub?
            </h2>
            <p className="text-xl  max-w-2xl mx-auto">
              We connect talented professionals with amazing opportunities
              through our innovative platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-400 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Matching
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered algorithm matches you with the most relevant job
                opportunities based on your skills and preferences.
              </p>
            </div>

            <div className="bg-slate-400 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Top Companies
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with leading companies across industries, from startups
                to Fortune 500 enterprises.
              </p>
            </div>

            <div className="bg-slate-400 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Applications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Apply to multiple jobs with just one click using your saved
                profile and tailored resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of professionals who have found their dream jobs
            through JobHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/learn-more"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">JobHub</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting talent with opportunity. Your career journey starts
                here.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs" className="hover:text-blue-400 transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Salary Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li>
                  <AddJob />
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Find Talent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Employer Branding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 JobHub. All rights reserved. Built with ❤️ for job seekers
              everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
