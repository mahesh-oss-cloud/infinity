import React from 'react';

export const BrandIcon = ({ type, className = "w-10 h-10", imageUrl, alt = "Sender profile photo" }) => {
  switch (type) {
    case 'yc':
      return (
        <div className={`${className} rounded-xl bg-[#ff6600] flex items-center justify-center p-2 shadow-xs flex-shrink-0`}>
          <svg viewBox="0 0 256 256" className="w-full h-full" preserveAspectRatio="xMidYMid">
            <path 
              d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z" 
              fill="#FFFFFF" 
            />
          </svg>
        </div>
      );
    case 'person':
      return imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`${className} rounded-full object-cover border border-gray-200 flex-shrink-0`}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div className={`${className} rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-700 flex-shrink-0`} aria-label="Sender initials">
          AM
        </div>
      );
    case 'india':
      return (
        <div className={`${className} rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0 text-gray-900`}>
          🇮🇳
        </div>
      );
    default:
      return (
        <div className={`${className} rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs flex-shrink-0`}>
          $
        </div>
      );
  }
};
