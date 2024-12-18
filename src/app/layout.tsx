import React, { ReactElement } from "react";
import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";

import { ConfigProvider } from "antd";

import "@/app/globals.css";

import Web3ModalProvider from "@/context";

/**
 * Represents a Chakra_Petch object.
 *
 * @constructor
 * @param {Object} options - The options for the Chakra_Petch object.
 * @param {Array} options.subsets - The array of subsets for the Chakra_Petch object.
 * @param {string} options.weight - The weight for the Chakra_Petch object.
 */
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: "300" });

/**
 * Represents metadata of an application.
 *
 * @typedef {object} Metadata
 * @property {string} title - The title of the application.
 * @property {string} description - The description of the application.
 */
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/**
 * This method creates the root layout for the application.
 *
 * @param {Object} props - The properties for the root layout.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the root layout.
 *
 * @returns {React.ReactElement} - The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body className={chakraPetch.className}>
        <ConfigProvider>
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
