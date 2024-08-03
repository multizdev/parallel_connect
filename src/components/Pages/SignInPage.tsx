"use client";

import React, { ReactElement, useEffect } from "react";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Chakra_Petch } from "next/font/google";

import { Button, Form, Input } from "antd";

import useSignIn from "@/hooks/useSignIn";

/**
 * Represents a Chakra Petch variable.
 *
 * @class
 */
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
/**
 * Creates a Chakra_PetchHeading font object with the specified subsets and weight.
 *
 * @param {Object} options - The options for creating the font.
 * @param {string[]} options.subsets - The subsets to include in the font.
 * @param {string} options.weight - The weight of the font.
 * @returns {Chakra_PetchHeading} - The Chakra_PetchHeading font object.
 */
const chakraPetchHeading = Chakra_Petch({ subsets: ["latin"], weight: "700" });

/**
 * Render the Sign In Page.
 *
 * @returns {ReactElement} The rendered Sign In Page component.
 */
function SignInPage(): ReactElement {
  const { status, address } = useAccount();
  const [form] = Form.useForm();

  const { loginUser, loginWithAddress, isLoading, signInState } =
    useSignIn(form);

  useEffect(() => {
    if (status === "connected" && address) {
      (async (): Promise<void> => loginWithAddress(address))();
    }
  }, [status]);

  return (
    <Form
      form={form}
      className="flex flex-col gap-6 justify-center px-16 border-2 border-[#def141] rounded-2xl md:w-[500px] w-[400px] h-[50%] min-w-[400px] bg-black bg-opacity-30"
      onFinish={loginUser}
    >
      <h1
        className={`text-3xl font-bold text-center text-white ${chakraPetchHeading}`}
      >
        Sign In Form
      </h1>
      <div className="flex flex-col gap-2">
        <Form.Item
          name="identifier"
          rules={[{ required: true, message: "Enter an Echelon ID or Email" }]}
        >
          <Input
            className="h-[40px] rounded text-black placeholder-[#a2a2a2]"
            placeholder="Enter Email or Echelon ID to SignIn"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            placeholder="Password"
            type="password"
          />
        </Form.Item>

        <div className="flex flex-row gap-4 mt-2">
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              className="h-[40px] bg-black border-2 border-[#def141]"
              type="primary"
            >
              <span className={`text-[#def141] ${chakraPetch.className}`}>
                Sign In
              </span>
            </Button>
          </Form.Item>
          <div className="bg-black w-min h-min rounded-3xl border-2 border-[#def141]">
            <w3m-button size="md" label="Login with wallet" balance="hide" />
          </div>
        </div>
      </div>
      <Link className="" href="/">
        <span
          className={`${chakraPetch.className} font-bold text-lg text-white hover:text-[#def141] underline`}
        >
          {signInState ? "Don't have an account? Sign Up" : "Sign Up"}
        </span>
      </Link>
    </Form>
  );
}

export default SignInPage;
