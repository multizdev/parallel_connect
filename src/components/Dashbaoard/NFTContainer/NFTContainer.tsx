import React, { ReactElement } from "react";

import { Spin } from "antd";

import useNFTs from "@/hooks/useNFTs";
import NFTList from "@/components/Lists/NFTList";

/**
 * Creates a container component for displaying NFTs.
 *
 * @returns {ReactElement} The rendered NftContainer component.
 */
function NftContainer(): ReactElement {
  const { loadingNFTs } = useNFTs();

  return <div className="p-8">{loadingNFTs ? <Spin /> : <NFTList />}</div>;
}

export default NftContainer;
