"use client";

import React, { ReactElement } from "react";

import Image from "next/image";

/**
 * Renders the layout component with a video background and logo image.
 *
 * @param {Object} options - The options for the layout component.
 * @param {ReactElement} options.children - The children elements to be rendered within the layout.
 *
 * @returns {ReactElement} The rendered layout component.
 */
function Layout({ children }: { children: ReactElement }): ReactElement {
  return (
    <div className="h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src="/video/1.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col items-center justify-center h-screen bg-[#def141] bg-opacity-10">
        <Image
          className="absolute top-6"
          src="/logo.svg"
          alt="LOGO"
          width={300}
          height={50}
        />
        {children}
        <Image
          className="lg:w-[500px] md:w-[350px] w-[200px] absolute justify-center left-0 bottom-0"
          src="/commanders/1.webp"
          alt="1"
          width={500}
          height={50}
        />
        <Image
          className="lg:w-[500px] md:w-[350px] w-[200px] absolute justify-center right-0 bottom-0"
          src="/commanders/2.png"
          alt="2"
          width={500}
          height={50}
        />
      </div>
    </div>
  );
}

export default Layout;
