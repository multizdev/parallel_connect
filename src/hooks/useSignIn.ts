import { useState } from "react";
import {
  createClient,
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";
import { message, FormInstance } from "antd";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Represents form data with an identifier and password.
 * @typedef {Object} FormData
 * @property {string} identifier - The identifier value.
 * @property {string} password - The password value.
 */
type FormData = {
  identifier: string;
  password: string;
};

/**
 * Represents a SignInHook class.
 * @typedef {Object} SignInHook
 * @property {boolean} isLoading - Indicates if the sign-in process is in progress.
 * @property {function} loginUser - Function to initiate the login process with form data.
 * @property {function} loginWithAddress - Function to initiate the login process with a wallet address.
 * @property {boolean} signInState - Indicates if the user is signed in.
 */
type SignInHook = {
  isLoading: boolean;
  loginUser: (values: FormData) => Promise<void>;
  loginWithAddress: (wallet_address: string) => Promise<void>;
  signInState: boolean;
};

/**
 * Executes the registration process using the provided form data.
 *
 * @param {FormInstance} form - The form instance used for registration.
 * @returns {SignInHook} - An object containing the current state of the registration process.
 */
function useRegister(form: FormInstance): SignInHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInState, setSignInState] = useState<boolean>(false);

  const router: AppRouterInstance = useRouter();

  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_ANON_KEY || "",
  );

  /**
   * Log in with the given wallet address.
   * Sets the loading state, queries the parallel_users table in Supabase to find an echelon_id matching the wallet address,
   * and performs actions based on the response.
   *
   * @param {string} wallet_address - The wallet address to login with.
   *
   * @returns {Promise<void>} - A Promise that resolves to undefined when the login process is complete.
   */
  const loginWithAddress = async (wallet_address: string): Promise<void> => {
    setIsLoading(true);
    const { data, error }: PostgrestSingleResponse<{ echelon_id: string }[]> =
      await supabase
        .from("parallel_users")
        .select("echelon_id")
        .eq("wallet_address", wallet_address);

    if (data && data.length !== 0 && !error) {
      sessionStorage.setItem("echelon_id", data[0].echelon_id);
      router.replace("/dashboard");
      setIsLoading(true);
    } else {
      message.error("Wallet not found.");
      setIsLoading(false);
    }
  };

  /**
   * Logs in the user with the provided values.
   *
   * @param {FormData} values - The login form data containing the identifier and password.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  const loginUser = async (values: FormData): Promise<void> => {
    setIsLoading(true);
    const { identifier, password } = values;

    if (identifier !== "" && password !== "") {
      await supabase.auth.signInAnonymously();

      const [userByIdentifierResponse, userByIdentifierAndPasswordResponse] =
        await Promise.all([
          supabase
            .from("parallel_users")
            .select("echelon_id")
            .or(`echelon_id.eq.${identifier},email.eq.${identifier}`),
          supabase
            .from("parallel_users")
            .select("echelon_id")
            .or(
              `echelon_id.eq.${identifier}&password.eq.${password},email.eq.${identifier}&password.eq.${password}`,
            ),
        ]);

      if (!userByIdentifierResponse.data?.length) {
        message.error("User doesn't exist.");
        setSignInState(true);
      } else if (!userByIdentifierAndPasswordResponse.data?.length) {
        message.error("Incorrect password.");
      } else {
        sessionStorage.setItem(
          "echelon_id",
          userByIdentifierAndPasswordResponse.data[0].echelon_id,
        );
        router.replace("/dashboard");
      }

      setIsLoading(false);
    } else {
      message.error("Please fill the form.");
      setIsLoading(false);
    }
    form.resetFields();
  };

  return { isLoading, loginUser, loginWithAddress, signInState };
}

export default useRegister;
