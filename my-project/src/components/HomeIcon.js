import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ fontSize: 24 }}>
      <path
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        fill="url(#grad1)" // İç renk geçişi
      />
      <defs>
        {/* İç renk geçişi */}
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D5C6AA', stopOpacity: 1 }} /> {/* Açık kahverengi */}
          <stop offset="100%" style={{ stopColor: '#8D6E63', stopOpacity: 1 }} /> {/* Koyu kahverengi */}
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default HomeIcon;
