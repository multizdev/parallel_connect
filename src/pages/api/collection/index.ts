import { NextApiRequest, NextApiResponse } from "next";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

/**
 * Handler function for API endpoint.
 *
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {NextApiResponse} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the handler is complete.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === "POST") {
    const { userAddress } = req.body;

    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
        buidEnvironment: "node",
      });
    }

    const chain = EvmChain.ETHEREUM;

    const userNFTsResponse = await Moralis.EvmApi.nft.getWalletNFTs({
      address: userAddress,
      chain,
    });

    const userNFTs = [...userNFTsResponse.toJSON().result];

    const address = (process.env.PARALLEL_CONTRACT_ADDRESS || "").toLowerCase();

    const userOwnedNFTsInCollection = userNFTs.filter(
      (nft) => nft.token_address === address.toLowerCase(),
    );

    res.status(200).json(userOwnedNFTsInCollection);
  } else {
    res.status(400).json({ error: "Invalid Request Method" });
  }
}
