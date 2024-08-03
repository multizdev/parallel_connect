import React, { ReactElement } from "react";

import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";

import { Button } from "antd";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import useMetaMaskAccount from "@/hooks/useMetaMaskAccount";

/**
 * Represents a Chakra Petch object.
 *
 * @constructor
 * @param {Object} options - The options for the Chakra Petch object.
 * @param {string[]} options.subsets - The subsets of the font.
 * @param {string} options.weight - The weight of the font.
 */
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
/**
 * Represents the Chakra Petch Heading font.
 *
 * @constructor
 * @param {object} options - The font options.
 * @param {string[]} options.subsets - The subsets of the font.
 * @param {string} options.weight - The weight of the font.
 */
const chakraPetchHeading = Chakra_Petch({ subsets: ["latin"], weight: "700" });

/**
 * Renders a modal component with sign up options.
 *
 * @returns {ReactElement} The rendered ActionsModal component.
 */
function ActionsModal(): ReactElement {
  const { open } = useWeb3Modal();
  const { connectAccount } = useMetaMaskAccount();

  const checkConnection = async () => {
    await open({ view: "Connect" });
  };

  return (
    <div className=" flex flex-col gap-6 justify-center px-16 border-2 border-[#def141] rounded-2xl md:w-[500px] w-[400px] h-[50%] min-w-[400px]  bg-[#def141] bg-opacity-30">
      <h1
        className={`text-3xl font-bold text-center text-white ${chakraPetchHeading}`}
      >
        Sign Up
      </h1>
      <Button
        className="bg-white h-[50px] rounded-2xl"
        type="primary"
        onClick={connectAccount}
      >
        <div
          className={`${chakraPetch.className} text-[#f5841f] text-lg flex flex-row gap-4 justify-center`}
        >
          <Image
            src="/wallets/metamask.png"
            alt="metamask"
            width={30}
            height={30}
          />
          <span>Sign Up with MetaMask</span>
        </div>
      </Button>
      <Button
        className="bg-[#6946de] h-[50px] rounded-2xl"
        type="primary"
        onClick={checkConnection}
      >
        <div
          className={`${chakraPetch.className} text-white text-lg flex flex-row gap-4 justify-center`}
        >
          <Image src="/wallets/web3.png" alt="ether" width={30} height={30} />
          <span>Sign Up with Web3</span>
        </div>
      </Button>
      <Button className="bg-[#4183f3] h-[50px] rounded-2xl" type="primary">
        <div
          className={`${chakraPetch.className} text-white text-lg flex flex-row gap-4 justify-center`}
        >
          <Image
            src="/wallets/google.png"
            alt="google"
            width={35}
            height={30}
          />
          <span>Sign Up with Google</span>
        </div>
      </Button>
      <Link className="" href="/sign-in">
        <span
          className={`${chakraPetch.className} font-bold text-lg text-white hover:text-[#def141] underline`}
        >
          Already have an account? Sign In
        </span>
      </Link>
    </div>
  );
}

export default ActionsModal;
