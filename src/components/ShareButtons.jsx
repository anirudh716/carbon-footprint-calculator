import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Copy, Check } from 'lucide-react';

const ShareButtons = ({ footprint = 0 }) => {
  const [isCopied, setIsCopied] = useState(false);

  const footprintValue = typeof footprint === 'number' ? footprint.toFixed(1) : '0.0';
  const text = `I just tracked my carbon footprint: ${footprintValue} kg CO₂ today 🌍✨. Try the calculator and see yours! #CarbonFootprint #EcoFriendly`;
  const url = window.location.href;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=My%20Carbon%20Footprint&summary=${encodeURIComponent(text)}`,
  };
  
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard.'); // Fallback for errors
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <span className="text-sm font-medium">Share My Footprint:</span>
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </a>
      <a 
        href={shareLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <button 
        onClick={copyToClipboard} 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
        title="Copy to clipboard"
        aria-label="Copy share text to clipboard"
      >
        {isCopied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
      </button>
    </div>
  );
};

export default React.memo(ShareButtons);