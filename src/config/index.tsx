import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// Get projectId at https://cloud.walletconnect.com
/**
 * The unique identifier for the project.
 *
 * @type {string}
 */
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

/**
 * Metadata for ParallelConnect.
 *
 * @typedef {Object} Metadata
 * @property {string} name - The name of ParallelConnect.
 * @property {string} description - The description of ParallelConnect.
 * @property {string} url - The URL of ParallelConnect. The origin must match your domain and subdomain.
 * @property {string[]} icons - The URLs of icons for ParallelConnect.
 */
const metadata = {
  name: "ParallelConnect",
  description: "Web3Modal Example",
  url: "https://parallelconnect.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
/**
 * Represents an immutable array of variable chains.
 * @typedef {ReadonlyArray<string>} Chains
 */
const chains = [mainnet, sepolia] as const;
/**
 * Default Wagmi Config
 *
 * @param {Object} config - The configuration object.
 * @param {Array} config.chains - An array of chain objects.
 * @param {string} config.projectId - The ID of the project.
 * @param {Object} config.metadata - The metadata object.
 * @param {Array} config.connectors - An array of connector objects.
 * @param {boolean} config.ssr - A flag indicating whether Server Side Rendering is enabled or not.
 * @param {Object} config.storage - The storage object.
 * @param {Object} config.storage.storage - The storage implementation.
 * @return {Object} - The default Wagmi config object.
 */
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  connectors: [metaMask()],
  ssr: false,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
