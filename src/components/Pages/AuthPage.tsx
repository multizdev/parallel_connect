"use client";

import React, { ReactElement } from "react";
import Image from "next/image";

import { Spin } from "antd";
import { useAccount } from "wagmi";
import { LoadingOutlined } from "@ant-design/icons";

import ActionsModal from "@/components/Auth/actions/ActionsModal";
import SignupForm from "@/components/Auth/form/SignupForm";

/**
 * Renders the current form based on the account status.
 *
 * @return {ReactElement} - The rendered form component.
 */
function CurrentForm(): ReactElement {
  const { status } = useAccount();

  if (status === "disconnected") {
    return <ActionsModal />;
  }
  if (status === "connected") {
    return <SignupForm />;
  }

  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 24, color: "#def141" }} spin />
      }
    />
  );
}

/**
 * Renders the authentication page.
 * @returns {ReactElement} The authentication page component.
 */
function AuthPage(): ReactElement {
  return (
    <div className="h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src="/video/1.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col items-center justify-center h-screen bg-[#def141] bg-opacity-10">
        <Image
          className="absolute top-6"
          src="/logo.svg"
          alt="LOGO"
          width={300}
          height={50}
        />
        <CurrentForm />
        <Image
          className="lg:w-[500px] md:w-[350px] w-[200px] absolute justify-center left-0 bottom-0"
          src="/commanders/1.webp"
          alt="1"
          width={500}
          height={50}
        />
        <Image
          className="lg:w-[500px] md:w-[350px] w-[200px] absolute justify-center right-0 bottom-0"
          src="/commanders/2.png"
          alt="2"
          width={500}
          height={50}
        />
      </div>
    </div>
  );
}
export default AuthPage;
