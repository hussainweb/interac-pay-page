import React from 'react';
import { Copy, Check, Smartphone, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import { useClipboard } from './hooks/useClipboard';
import { useDeepLink } from './hooks/useDeepLink';

// Bank Data with colors for visual distinction
const BANKS = [
  { name: 'Scotiabank', color: 'bg-red-600', text: 'text-white' },
  { name: 'TD', color: 'bg-green-600', text: 'text-white' },
  { name: 'RBC', color: 'bg-blue-700', text: 'text-white' },
  { name: 'CIBC', color: 'bg-red-800', text: 'text-white' },
  { name: 'BMO', color: 'bg-blue-600', text: 'text-white' },
];

function App() {
  const { hasCopied, copyToClipboard } = useClipboard();
  // We use openBank from the hook directly in the click handler
  // But wait, the hook returns { openBank }
  // I need to instantiate the hook.
  // Wait, I didn't export useDeepLink correctly?
  // I did export const useDeepLink = ...
  // Wait, inside the component:
  const { openBank } = useDeepLink();

  const handleCopy = () => {
    const email = window.APP_CONFIG?.INTERAC_EMAIL || '';
    if (email) copyToClipboard(email);
  };

  const email = window.APP_CONFIG?.INTERAC_EMAIL || 'Loading...';

  return (
    <div className="min-h-screen bg-pearl-white text-charcoal font-sans selection:bg-baking-gold selection:text-white pb-20 pt-10 px-6">
      <main className="max-w-md mx-auto space-y-8">
        
        {/* Hero Section: Centered Logo & Title */}
        <div className="text-center space-y-4 animate-fade-in-up">
            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-1">
               <img src="/logo.png" alt="AL JUMAN TREATS" className="w-full h-full object-cover rounded-full" />
            </div>
            
            <div className="space-y-1">
                <h1 className="font-serif text-2xl font-bold tracking-wide text-charcoal">
                    AL JUMAN TREATS
                </h1>
                <p className="font-serif text-lg text-gray-600">Complete Your Payment</p>
            </div>
            
             {/* Visual Guide - Immediate Context */}
             <div className="flex justify-center items-center space-x-6 pt-2 pb-4">
                {[
                    { icon: Copy, label: 'Copy' },
                    { icon: Smartphone, label: 'Open App' },
                    { icon: CreditCard, label: 'Pay' }
                ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-baking-gold group-hover:-translate-y-1 transition-transform">
                            <step.icon size={20} />
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Step 1: Copy Email */}
        <div className="space-y-4">
            <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-baking-gold text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                 <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Copy Email</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1 relative overflow-hidden">
                <div className="flex items-center justify-between pl-5 pr-2 py-3">
                    <span className="font-medium text-gray-700 truncate mr-3 select-all text-lg">{email}</span>
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md ${
                            hasCopied 
                            ? 'bg-green-500 text-white shadow-green-200' 
                            : 'bg-baking-gold text-white shadow-orange-100 hover:bg-yellow-600'
                        }`}
                    >
                        {hasCopied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                </div>
            </div>
            {/* Context Toast */}
             <div className={`h-6 flex items-center justify-center transition-all duration-300 ${hasCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    Email copied to clipboard!
                </span>
            </div>
        </div>

        {/* Step 2: Open Bank App */}
        <div className="space-y-4">
            <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-baking-gold text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                 <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Select Bank</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {BANKS.map((bank) => (
                    <button
                        key={bank.name}
                        onClick={() => openBank(bank.name)}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-32 flex flex-col items-center justify-center p-4 space-y-3"
                    >
                        <div className="w-16 h-16 relative flex items-center justify-center">
                             {/* Use logos from public/banks/ */}
                             <img 
                                src={`/banks/${bank.name.toLowerCase().split(' ')[0]}.png`} 
                                alt={`${bank.name} logo`} 
                                className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                             />
                             {/* Fallback if image fails */}
                             <div className="hidden absolute inset-0 w-full h-full rounded-full bg-gray-50 items-center justify-center text-gray-400 font-bold text-xl">
                                {bank.name[0]}
                             </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-600 text-sm group-hover:text-baking-gold transition-colors">{bank.name}</span>
                            <ArrowRight size={14} className="text-baking-gold opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                        </div>
                    </button>
                ))}
            </div>
            
            <div className="text-center pt-6 pb-10">
                <button 
                    onClick={() => window.location.href = 'https://interac.ca'} 
                    className="inline-flex items-center space-x-2 text-gray-400 text-xs hover:text-baking-gold transition-colors border-b border-transparent hover:border-baking-gold pb-0.5"
                >
                    <span>Bank not listed? Open Interac site</span>
                    <ExternalLink size={12} />
                </button>
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;
