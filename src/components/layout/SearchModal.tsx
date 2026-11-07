import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Layers, ShoppingBag, Truck, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALL_SERVICES } from '../../data/services';
import { HSE_PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredServices = query.trim()
    ? ALL_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
          s.subservices.some((sub) => sub.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : ALL_SERVICES.slice(0, 4);

  const filteredProducts = query.trim()
    ? HSE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : HSE_PRODUCTS.slice(0, 3);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#E2DED5] overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-[#E2DED5] flex items-center space-x-3 bg-[#FAF8F5]">
            <Search className="w-5 h-5 text-[#FF4D16] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services (TMS, CH Deploy, Lashing), products, freight tools..."
              className="w-full bg-transparent text-base text-[#171717] placeholder-[#8C877D] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#625E58] hover:text-[#171717] hover:bg-[#E2DED5]/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            
            {/* Services Section */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FF4D16] mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Services & Solutions ({filteredServices.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelect(`/services/${service.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F4F1EA] transition-colors text-left group border border-transparent hover:border-[#E2DED5]"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#171717] group-hover:text-[#FF4D16]">
                          {service.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#625E58] border border-[#E2DED5]">
                          Tier {service.tier}
                        </span>
                      </div>
                      <p className="text-xs text-[#625E58] line-clamp-1 mt-0.5">
                        {service.shortDesc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C877D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* HSE Shop Products Section */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FF4D16] mb-3">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>HSE Shop Products ({filteredProducts.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {filteredProducts.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelect(`/hse-shop/products/${prod.slug}`)}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-[#F4F1EA] transition-colors text-left group border border-transparent hover:border-[#E2DED5]"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <span className="text-xs font-bold text-[#171717] line-clamp-1 group-hover:text-[#FF4D16]">
                      {prod.name}
                    </span>
                    <span className="text-xs font-bold text-[#FF4D16] mt-1">₹{prod.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Market Quick Navigation */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FF4D16] mb-3">
                <Truck className="w-3.5 h-3.5" />
                <span>Quick Actions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleSelect('/live-market/book-truck')}
                  className="p-2 text-xs font-semibold bg-[#F4F1EA] hover:bg-[#FF4D16] hover:text-white rounded-lg text-center transition-colors"
                >
                  Book Truck Now
                </button>
                <button
                  onClick={() => handleSelect('/live-market/terminal-space')}
                  className="p-2 text-xs font-semibold bg-[#F4F1EA] hover:bg-[#FF4D16] hover:text-white rounded-lg text-center transition-colors"
                >
                  Terminal Space
                </button>
                <button
                  onClick={() => handleSelect('/design-your-solution')}
                  className="p-2 text-xs font-semibold bg-[#F4F1EA] hover:bg-[#FF4D16] hover:text-white rounded-lg text-center transition-colors"
                >
                  DIY Solution
                </button>
                <button
                  onClick={() => handleSelect('/locations')}
                  className="p-2 text-xs font-semibold bg-[#F4F1EA] hover:bg-[#FF4D16] hover:text-white rounded-lg text-center transition-colors"
                >
                  Find Hubs
                </button>
              </div>
            </div>

          </div>

          {/* Footer Help */}
          <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#E2DED5] flex items-center justify-between text-[11px] text-[#8C877D]">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E2DED5] rounded font-mono text-[10px]">ESC</kbd> to close</span>
            <span>Chasehorse Logiworkx Directory</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

