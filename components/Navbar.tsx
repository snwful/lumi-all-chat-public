
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME, SparklesIcon, Bars3Icon, XMarkIcon } from '../constants';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Inbox', path: '/inbox' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
        return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  }

  return (
    <nav className="bg-brand-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-2xl font-bold text-brand-accent">
              <SparklesIcon className="h-7 w-7 mr-2" />
              {APP_NAME}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-accent-soft text-brand-accent'
                    : 'text-brand-secondary hover:text-brand-primary hover:bg-slate-100'
                } transition-colors`}
              >
                {link.name}
              </Link>
            ))}
             <Button variant="outline" size="sm" onClick={() => alert('Login clicked!')}>Login</Button>
            <Button variant="primary" size="sm" onClick={() => alert('Sign Up clicked!')}>Sign Up</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-secondary hover:text-brand-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-surface shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-accent-soft text-brand-accent'
                    : 'text-brand-secondary hover:text-brand-primary hover:bg-slate-100'
                } transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full mb-2" onClick={() => {alert('Login clicked!'); setIsMobileMenuOpen(false);}}>Login</Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => {alert('Sign Up clicked!'); setIsMobileMenuOpen(false);}}>Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
