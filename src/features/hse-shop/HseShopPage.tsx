import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HSE_PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  MapPin,
  ExternalLink,
  Truck
} from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';

export const HseShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const actionParam = searchParams.get('action');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [storeRequestOpen, setStoreRequestOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(actionParam === 'checkout');

  // Follow the ?category= link (e.g. from the navbar) even when already on the shop page
  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  const { addToCart, setIsCartOpen } = useCart();

  // Filter products
  const filteredProducts = HSE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.standards.some((std) => std.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Banner with Official Safety Store & On-site Store Request */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                ● STATUTORY INDUSTRIAL SAFETY
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Official Chasehorse HSE Shop
              </h1>
              <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed font-light">
                Certified Personal Protective Equipment (PPE), heavy-duty lashing gear, and ergonomic worker apparel engineered for Indian warehouse docks and freight corridors.
              </p>

              {/* Two Mandated Action Buttons in Prominent Header */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setStoreRequestOpen(true)}
                  className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center space-x-2 shadow-lg"
                >
                  <Warehouse className="w-4 h-4" />
                  <span>Request On-Site Managed Store</span>
                </button>

                <Link
                  to="/locations#hse-stores"
                  className="px-5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm flex items-center space-x-2"
                >
                  <MapPin className="w-4 h-4 text-[#FF4D16]" />
                  <span>Find Offline Stores</span>
                </Link>
              </div>
            </div>

            {/* Turnkey On-site Store Value Banner */}
            <div className="lg:col-span-5 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#FF4D16]">
                <ShieldCheck className="w-4 h-4" />
                <span>TURNKEY FACILITY DEPLOYMENT</span>
              </div>
              <h4 className="font-bold text-base text-white">
                We Deploy Our Store & Manage Compliance
              </h4>
              <p className="text-xs text-[#E2DED5]/80 leading-relaxed">
                Chasehorse installs and stocks a managed safety dispensing depot directly inside your manufacturing plant or distribution center. Zero inventory carrying cost for the client; workers access approved PPE with biometric/ID allocation.
              </p>
              <div className="pt-2 text-[11px] text-[#FF4D16] font-mono font-bold">
                OSHA • IS 2925 • DGMS Standard Compliance
              </div>
            </div>

          </div>
        </div>

        {/* Search, Filter & Sort Toolbar */}
        <div className="bg-white rounded-2xl border border-[#E2DED5] p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PPE, helmets, S3 boots, lashing belts..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <span className="text-xs text-[#625E58] whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
              >
                <option value="featured">Featured Standards</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-[#E2DED5]/60 text-xs">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'ppe-kits', label: 'Complete PPE Kits' },
              { id: 'helmets', label: 'Safety Helmets' },
              { id: 'footwear', label: 'Safety Footwear' },
              { id: 'jackets', label: 'Hi-Vis Reflective' },
              { id: 'protection', label: 'Hand & Eye' },
              { id: 'spill-lashing', label: 'Cargo Lashing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#FAF8F5] text-[#625E58] hover:text-[#171717]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E2DED5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-56 w-full bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-lg text-[10px] font-bold text-[#171717] shadow-sm border border-[#E2DED5]">
                    {product.categoryLabel}
                  </div>

                  {/* Standards Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {product.standards.map((std, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[#171717]/80 text-white font-mono"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[11px] text-[#8C877D] font-normal">
                      ({product.reviewsCount} verified reviews)
                    </span>
                  </div>

                  <Link to={`/hse-shop/products/${product.slug}`}>
                    <h3 className="font-bold text-sm sm:text-base text-[#171717] group-hover:text-[#FF4D16] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#625E58] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="p-5 pt-0 border-t border-[#E2DED5]/60 mt-3 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-lg font-extrabold text-[#171717] font-mono">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#8C877D] line-through font-mono">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-green-600 font-semibold block">
                    In Stock • Dispatches in 24h
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/hse-shop/products/${product.slug}`}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#E2DED5] text-[#171717] rounded-xl text-xs font-bold transition-colors"
                    title="View Product Specs"
                  >
                    Specs
                  </Link>
                  <button
                    onClick={() => {
                      const defaultSize = product.variants?.sizes ? product.variants.sizes[0] : undefined;
                      const defaultColor = product.variants?.colors ? product.variants.colors[0].name : undefined;
                      addToCart(product, 1, defaultSize, defaultColor);
                    }}
                    className="px-4 py-2.5 bg-[#FF4D16] hover:bg-[#E53E0B] text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center space-x-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Tracking Bar */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Truck className="w-6 h-6 text-[#FF4D16]" />
            <div>
              <h4 className="font-bold text-sm text-[#171717]">Track Your HSE Equipment Consignment</h4>
              <p className="text-xs text-[#625E58]">Enter your Order ID (e.g. ORD-7741) to check live courier milestone delivery.</p>
            </div>
          </div>

          <Link
            to="/account"
            className="px-5 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] text-[#171717] hover:border-[#171717] rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
          >
            Track in Client Dashboard →
          </Link>
        </div>

      </div>

      {/* On-Site Managed Store Request Modal */}
      <EnquiryModal
        isOpen={storeRequestOpen}
        onClose={() => setStoreRequestOpen(false)}
        title="Request On-Site Managed HSE Store"
        defaultService="On-Site Managed HSE Store & Compliance Ledger"
      />
    </div>
  );
};

