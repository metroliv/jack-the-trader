import React from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";
import RegistrationForm from "./components/RegistrationForm";

const RegistrationScreen = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-text-primary">Deriv Trader</h1>
          </div>
          <div>
            <Link 
              to="/login-screen" className="text-primary hover:text-primary-hover font-medium flex items-center"
            >
              <Icon name="LogIn" size={18} className="mr-2" />
              Sign In
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Create Your Trading Account</h1>
            <p className="text-text-secondary">Join thousands of traders worldwide and start your trading journey today.</p>
          </div>
          
          <div className="bg-surface rounded-xl shadow-sm border border-border p-6 md:p-8">
            <RegistrationForm />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              Already have an account?{" "}
              <Link to="/login-screen" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="bg-primary-light bg-opacity-30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-8">Why Choose Deriv Trader</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Secure Trading</h3>
              <p className="text-text-secondary text-sm">
                Advanced encryption and security protocols to keep your funds and personal information safe.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <Icon name="BarChart2" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Advanced Analytics</h3>
              <p className="text-text-secondary text-sm">
                Powerful charting tools and technical indicators to help you make informed trading decisions.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Fast Execution</h3>
              <p className="text-text-secondary text-sm">
                Lightning-fast trade execution and real-time market data updates for optimal trading performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-8">What Our Traders Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/men/54.jpg" 
                    alt="User" className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">David Chen</h3>
                  <p className="text-xs text-text-tertiary">Professional Trader</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={14} className="text-warning" />
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                "The platform's intuitive interface and powerful analytics tools have significantly improved my trading performance. The customer support team is also incredibly responsive and helpful."
              </p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/67.jpg" 
                    alt="User" className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">Sarah Johnson</h3>
                  <p className="text-xs text-text-tertiary">Retail Investor</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={14} className={star === 5 ? "text-text-tertiary" : "text-warning"} />
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                "As a beginner, I found Deriv Trader extremely user-friendly. The educational resources and demo account helped me learn the ropes before trading with real money. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3">
                  <Icon name="TrendingUp" size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-text-primary">Deriv Trader</h1>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                A powerful platform for binary options trading with advanced tools and features.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full bg-primary-light bg-opacity-30 flex items-center justify-center text-primary hover:bg-opacity-50 transition-colors">
                  <Icon name="Facebook" size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary-light bg-opacity-30 flex items-center justify-center text-primary hover:bg-opacity-50 transition-colors">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary-light bg-opacity-30 flex items-center justify-center text-primary hover:bg-opacity-50 transition-colors">
                  <Icon name="Linkedin" size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">About Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">Contact</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">Blog</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">Risk Disclosure</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary text-sm">AML Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-text-secondary text-sm">
                  <Icon name="Mail" size={14} className="mr-2" />
                  support@derivtrader.com
                </li>
                <li className="flex items-center text-text-secondary text-sm">
                  <Icon name="Phone" size={14} className="mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-text-secondary text-sm">
                  <Icon name="MapPin" size={14} className="mr-2" />
                  New York, NY 10001, USA
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-tertiary text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Deriv Trader. All rights reserved.
            </p>
            <div className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-6 mr-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 mr-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationScreen;