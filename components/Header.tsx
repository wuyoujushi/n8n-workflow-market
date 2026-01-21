import React, { useState } from 'react';
import { Search, Zap, Menu, X, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { geminiService } from '../services/geminiService';

interface HeaderProps {
  onSearch?: (term: string, isAi: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, isAiSearch);
    } else {
        // If not on home page, go home with search param
       navigate(`/?q=${encodeURIComponent(searchTerm)}&ai=${isAiSearch}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-600">
              <Zap className="h-8 w-8 fill-current" />
              <span className="font-bold text-xl tracking-tight text-gray-900">WorkflowMarket</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSubmit} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 {isAiSearch ? <Zap className="h-4 w-4 text-primary-500 animate-pulse" /> : <Search className="h-4 w-4 text-gray-400" />}
              </div>
              <input
                type="text"
                className={`block w-full pl-10 pr-12 py-2 border ${isAiSearch ? 'border-primary-300 ring-primary-200' : 'border-gray-300'} rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-300`}
                placeholder={isAiSearch ? "Describe what you want to automate..." : "Search workflows..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setIsAiSearch(!isAiSearch)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${isAiSearch ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Toggle AI Smart Search"
              >
                <span className="text-xs font-semibold mr-1">AI</span>
              </button>
            </form>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Explore</Link>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Sell</a>
            <div className="h-6 w-px bg-gray-200"></div>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Log in</a>
            <a href="#" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
              Sign up
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <form onSubmit={handleSubmit} className="p-2">
                <input
                  type="text"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Explore</Link>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sell</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
