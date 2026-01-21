import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Marketplace</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Browse</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Categories</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Authors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Documentation</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">API</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
            </ul>
          </div>
          <div>
             <p className="text-base text-gray-500">
               &copy; 2024 WorkflowMarket. Powered by Payload CMS.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
