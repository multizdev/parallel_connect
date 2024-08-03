import React, { ReactElement } from "react";

import Link from "next/link";
import { Chakra_Petch } from "next/font/google";

import { Button, Input, Form } from "antd";

import useRegister from "@/hooks/useRegister";
import useAppStore from "@/store/useAppStore";

/**
 * Represents the heading font style for Chakra Petch.
 *
 * @param {Object} options - The options to configure the heading font style.
 * @param {Array<string>} options.subsets - The subsets of characters to include in the font style.
 * @param {string} options.weight - The weight of the font style.
 *
 * @returns {Chakra_Petch} - The configured heading font style.
 */
const chakraPetchHeading = Chakra_Petch({ subsets: ["latin"], weight: "700" });
/**
 * Represents the Chakra_Petch variable.
 * @constructor
 * @param {Object} options - The options object for creating the Chakra_Petch instance.
 * @param {Array.<string>} options.subsets - The subsets to include in the Chakra_Petch instance.
 * @param {string} options.weight - The weight of the Chakra_Petch instance.
 */
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: "500" });

/**
 * SignupForm
 *
 * @returns {ReactElement} The signup form component
 */
function SignupForm(): ReactElement {
  const [form] = Form.useForm();
  const { metaMaskAccount } = useAppStore();

  const {
    saveUser,
    validateEchelonID,
    validateEmail,
    isLoading,
    walletExists,
  } = useRegister(form);

  return (
    <Form
      form={form}
      onFinish={saveUser}
      disabled={walletExists}
      className="flex flex-col gap-6 justify-center px-16 border-2 border-[#def141] rounded-2xl md:w-[500px] w-[400px] h-[60%] min-w-[400px]  bg-black bg-opacity-30"
    >
      <h1
        className={`text-3xl font-bold text-center text-white ${chakraPetchHeading}`}
      >
        Sign Up Form
      </h1>
      <div className="flex flex-col gap-2">
        <Form.Item
          name="echelon_id"
          rules={[
            { required: true, message: "Enter an Echelon ID" },
            { validator: validateEchelonID },
          ]}
        >
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            placeholder="Echelon ID"
          />
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            placeholder="Full Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            placeholder="Password"
            type="password"
          />
        </Form.Item>
        {metaMaskAccount && (
          <Input
            className="h-[40px] rounded placeholder-[#a2a2a2]"
            value={metaMaskAccount}
          />
        )}
        <div className="flex flex-row gap-4 mt-2">
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              className="h-[40px] bg-black border-2 border-[#def141]"
              type="primary"
            >
              <span className={`text-[#def141] ${chakraPetch.className}`}>
                REGISTER
              </span>
            </Button>
          </Form.Item>
          <div className="bg-black w-min h-min rounded-3xl border-2 border-[#def141]">
            <w3m-button
              size="md"
              label={metaMaskAccount ? "Link another wallet" : "Link Wallet"}
              balance="hide"
            />
          </div>
        </div>
      </div>
      {walletExists && (
        <Link className="" href="/sign-in">
          <span
            className={`${chakraPetch.className} font-bold text-lg text-white hover:text-[#def141] underline`}
          >
            Wallet already exists, Try Signing In instead
          </span>
        </Link>
      )}
    </Form>
  );
}

export default SignupForm;
