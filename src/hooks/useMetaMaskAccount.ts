import { useConnectors } from "wagmi";
import { config } from "@/config";
import { GetConnectorsReturnType } from "@wagmi/core";
import { useRouter } from "next/navigation";

/**
 * Connects the MetaMask account.
 *
 * @return {object} An object with `connectAccount` method.
 */
function useMetaMaskAccount(): { connectAccount: () => void } {
  const connectors: GetConnectorsReturnType = useConnectors({ config });
  const router = useRouter();

  /**
   * Connects the MetaMask account and refreshes the router if the connection is successful.
   *
   * @returns {Promise<void>} Promise that resolves when the connection is complete.
   */
  const connectAccount = async (): Promise<void> => {
    const connector = connectors.filter((conn) => conn.name === "MetaMask");
    const test = await connector[0].connect();

    if (test.accounts.length !== 0) {
      router.refresh();
    }
  };

  return { connectAccount };
}

export default useMetaMaskAccount;
