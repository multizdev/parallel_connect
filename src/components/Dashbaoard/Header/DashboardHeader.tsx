import React, { ReactElement, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Chakra_Petch } from "next/font/google";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useDisconnect } from "wagmi";
import { Button } from "antd";
import {
  createClient,
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";

import useAppStore, { CurrentUser } from "@/store/useAppStore";

/**
 * Represents the Chakra_Petch font variant.
 * @typedef {Object} Chakra_Petch
 * @property {string[]} subsets - The subsets of the font.
 * @property {string} weight - The weight of the font.
 */
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: "500" });

/**
 * Renders the header component for the dashboard.
 *
 * @returns {ReactElement} The JSX element representing the dashboard header.
 */
function DashboardHeader(): ReactElement {
  const { disconnect } = useDisconnect();
  const { setCurrentUser, currentUser } = useAppStore();

  const router: AppRouterInstance = useRouter();

  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_ANON_KEY || "",
  );

  useEffect(() => {
    const echelonID: string | null = sessionStorage.getItem("echelon_id");
    if (!echelonID) {
      router.replace("/");
    } else {
      (async (): Promise<void> => {
        await supabase.auth.signInAnonymously();
        const { data, error }: PostgrestSingleResponse<CurrentUser[]> =
          await supabase
            .from("parallel_users")
            .select()
            .eq("echelon_id", echelonID);

        if (data && !error) {
          setCurrentUser(data[0]);
        }
      })();
    }
  }, []);

  return (
    <div className="flex flex-row gap- items-center px-4 h-[100px] bg-gray-700 backdrop-blur bg-opacity-30 shadow-md z-20">
      <div className="h-[70px] mt-[20px] flex flex-[5] items-center text-white border-t-[1px] py-4 border-gray-300">
        <div className="w-full flex flex-row justify-between items-center text-sm text-[#a2a2a2]">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Echelon ID: </span>
            <span className="text-[#def141]">{currentUser?.echelon_id}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Name: </span>
            <span className="text-[#def141]">{currentUser?.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Email: </span>
            <span className="text-[#def141]">{currentUser?.email}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Wallet Address: </span>
            <span className="text-[#def141]">
              {currentUser?.wallet_address}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-[1] justify-center items-center">
        <Image
          src="/echelon_logo.svg"
          alt="echelon-logo"
          width={80}
          height={80}
        />
      </div>
      <div className="h-[70px] mt-[20px] flex flex-[5] justify-end border-t-[1px] py-4 border-gray-300">
        <Button
          className="w-[100px] h-[40px] bg-black border-2 border-[#def141] text-white"
          onClick={() => {
            sessionStorage.clear();
            disconnect();
            router.replace("/");
          }}
        >
          <span className={`${chakraPetch.className} text-[#def141]`}>
            Sign Out
          </span>
        </Button>
      </div>
    </div>
  );
}

export default DashboardHeader;
