import React from 'react';
import Image from 'next/image';

function GlassmorphismNavbar() {
  return (
    <nav className="fixed top-3  left-0 min-w-full sm:w-full z-10 flex items-center justify-center
     flex-wrap  bg-opacity-5  rounded-full backdrop-blur-md shadow-sm p-4">
      <div className="flex  items-center flex-shrink-0 mr-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={22}
          layout="responsive"
        />
      </div>
    </nav>
  );
}

export default GlassmorphismNavbar;
