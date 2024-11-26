import { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { message, FormInstance } from "antd";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Type representing a set of hooks for handling user registration process.
 *
 * @typedef {Object} RegisterHook
 * @property {boolean} isLoading - Indicates whether the registration process is currently loading.
 * @property {function} validateEchelonID - Validates the provided Echelon ID.
 * @property {function} validateEmail - Validates the provided email address.
 * @property {function} saveUser - Saves the user data.
 * @property {boolean} walletExists - Indicates whether a wallet already exists for the user.
 */
type RegisterHook = {
  isLoading: boolean;
  validateEchelonID: (_: unknown, value: string) => Promise<void>;
  validateEmail: (_: unknown, value: string) => Promise<void>;
  saveUser: (values: UserData) => Promise<void>;
  walletExists: boolean;
};

/**
 * Represents user data.
 *
 * @typedef {Object} UserData
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} echelon_id - The identifier for the user's echelon.
 */
type UserData = {
  name: string;
  email: string;
  password: string;
  echelon_id: string;
};

/**
 * Custom hook for handling user registration functionality.
 *
 * @param {FormInstance} form - The form instance to be used for registration.
 * @return {RegisterHook} An object containing registration utilities and states.
 */
function useRegister(form: FormInstance): RegisterHook {
  const { status, address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [walletExists, setWalletExists] = useState<boolean>(false);

  const router: AppRouterInstance = useRouter();

  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_ANON_KEY || "",
  );

  /**
   * Validates an Echelon ID by checking if it already exists in the "parallel_users" table of Supabase.
   * @async
   * @param {unknown} _: Ignored parameter.
   * @param {string} value The Echelon ID to validate.
   * @throws {Error} Throws an error if an error occurs while validating the Echelon ID.
   * @returns {Promise} A rejected Promise with an error if the entered Echelon ID already exists; otherwise, undefined.
   */
  const validateEchelonID = async (_: unknown, value: string) => {
    const { data, error } = await supabase
      .from("parallel_users")
      .select("echelon_id")
      .eq("echelon_id", value);

    if (error) {
      throw new Error("An error occurred while validating the Echelon ID");
    }
    if (data && data.length > 0) {
      return Promise.reject(
        new Error("The entered Echelon ID already exists."),
      );
    }
  };

  /**
   * Validates if the given email already exists in the "parallel_users" table.
   *
   * @async
   * @param {*} _ - The ignored parameter.
   * @param {string} value - The email to be validated.
   * @throws {Error} - If an error occurs while validating the email.
   * @returns {Promise<void>} - Resolves successfully if the email does not exist, otherwise rejects with an error.
   */
  const validateEmail = async (_: unknown, value: string) => {
    const { data, error } = await supabase
      .from("parallel_users")
      .select("email")
      .eq("email", value);

    if (error) {
      throw new Error("An error occurred while validating the Echelon ID");
    }
    if (data && data.length > 0) {
      return Promise.reject(new Error("The entered Email already exists."));
    }
  };

  /**
   * Validates the address by checking if it exists in the "parallel_users" table.
   *
   * @returns {Promise} A Promise that resolves to undefined.
   */
  const validateAddress = async (): Promise<void> => {
    const { data, error } = await supabase
      .from("parallel_users")
      .select("wallet_address")
      .eq("wallet_address", address);

    if (error) {
      setWalletExists(false);
    }
    if (data && data.length > 0) {
      setWalletExists(true);
    }
  };

  /**
   * Save user data to the database.
   *
   * @param {UserData} values - The user data to be saved.
   * @returns {Promise<void>} - A promise that resolves when the user is saved successfully.
   */
  const saveUser = async (values: UserData): Promise<void> => {
    setIsLoading(true);
    if (status === "connected") {
      await supabase.auth.signInAnonymously();

      const { error } = await supabase
        .from("parallel_users")
        .insert({ ...values, wallet_address: address });

      if (error) {
        form.resetFields();
        message.error(error.message);
      } else {
        form.resetFields();
        message.success("User Saved!");
        sessionStorage.setItem("echelon_id", values.echelon_id);
        router.replace("/dashboard");
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("There was a problem");
    }
  };

  useEffect(() => {
    (async (): Promise<void> => validateAddress())();
  }, [address]);

  return {
    isLoading,
    saveUser,
    validateEchelonID,
    validateEmail,
    walletExists,
  };
}

export default useRegister;
