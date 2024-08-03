import React, { ReactElement } from "react";

import { Switch } from "antd";

import useAppStore, { NFT } from "@/store/useAppStore";
import AnimatedCard from "@/components/Dashbaoard/Animated/AnimatedCard";
import "@/components/Dashbaoard/Animated/list.css";

/**
 * Renders a list of NFTs.
 *
 * @return {ReactElement} The rendered React element
 */
function NFTList(): ReactElement {
  const { userNFTList } = useAppStore();
  const { setRevealCards } = useAppStore();

  return (
    <div>
      <div className="h-[50px] flex flex-row gap-4 items-center">
        <span className="text-white font-bold">Reveal All</span>
        <Switch
          className="bg-gray-700"
          onChange={(val) => {
            setRevealCards(val);
          }}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4 z-20">
        {userNFTList.map(({ image, name }: NFT) => {
          return <AnimatedCard key={name} image={image} name={name} />;
        })}
      </div>
    </div>
  );
}

export default NFTList;
