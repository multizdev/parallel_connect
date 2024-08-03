import useSWR, { SWRResponse } from "swr";
import { useAccount } from "wagmi";
import axios, { AxiosResponse } from "axios";
import useAppStore, { NFT, NFTToken } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { message } from "antd";

/**
 * Represents a hook for handling loading state of NFTs.
 *
 * @typedef {Object} NFTsHook
 * @property {boolean} loadingNFTs - Indicates whether NFTs are currently loading.
 */
type NFTsHook = {
  loadingNFTs: boolean;
};

/**
 * Retrieves and sets user NFTs data.
 *
 * @returns {NFTsHook} The loading status of NFTs.
 */
function useNFTs(): NFTsHook {
  const { address } = useAccount();
  const { setUserNFTList } = useAppStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: tokenData }: SWRResponse<NFTToken[]> = useSWR(
    `/api/collection`,
    () =>
      axios
        .post("/api/collection", {
          userAddress: address,
        })
        .then((response) => response.data),
  );

  useEffect(() => {
    setIsLoading(true);
    if (tokenData) {
      (async (): Promise<void> => {
        try {
          const list = await Promise.all([
            ...tokenData.map(async ({ token_uri }: NFTToken) => {
              const { data }: AxiosResponse<NFT> = await axios.get(token_uri);
              return data;
            }),
          ]);
          setUserNFTList(list);
        } catch (e) {
          if (e instanceof Error) message.error(e.message);
        } finally {
          setIsLoading(false);
        }
      })();
    } else setIsLoading(false);
  }, [tokenData]);

  return {
    loadingNFTs: isLoading,
  };
}

export default useNFTs;
