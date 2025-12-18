import React, { useEffect } from 'react';

function Notification({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-bounce`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{type === 'success' ? '✓' : '✗'}</span>
        <p className="font-bold">{message}</p>
        <button onClick={onClose} className="ml-4 text-xl hover:scale-125 transition-transform">
          ×
        </button>
      </div>
    </div>
  );
}

export default Notification;
