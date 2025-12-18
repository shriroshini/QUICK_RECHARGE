import React from 'react';
import { useTheme } from '../context/ThemeContext';


function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`mt-12 py-8 ${
      theme === 'dark' ? 'bg-[#3A0713] border-[#8B2635]' : 'bg-[#FCE7EB] border-[#E4A5B8]'
    } border-t-2`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-left">
            <p className={`font-bold text-xl ${theme === 'dark' ? 'text-[#F8D8E0]' : 'text-[#3A0713]'}`}>
              QuickRecharge
            </p>
          </div>

          <div className="flex-1 text-center">
            <p className={`${theme === 'dark' ? 'text-[#E4A5B8]' : 'text-[#8B2635]'}`}>
              © 2025 QuickRecharge. All rights reserved.
            </p>
          </div>

          <div className="flex-1 text-right flex gap-6 justify-end">
            <a href="#privacy" className={`font-semibold ${
              theme === 'dark' ? 'text-[#E4A5B8] hover:text-[#F8D8E0]' : 'text-[#8B2635] hover:text-[#C53030]'
            }`}>
              Privacy
            </a>
            <a href="#terms" className={`font-semibold ${
              theme === 'dark' ? 'text-[#E4A5B8] hover:text-[#F8D8E0]' : 'text-[#8B2635] hover:text-[#C53030]'
            }`}>
              Terms
            </a>
            <a href="#contact" className={`font-semibold ${
              theme === 'dark' ? 'text-[#E4A5B8] hover:text-[#F8D8E0]' : 'text-[#8B2635] hover:text-[#C53030]'
            }`}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
