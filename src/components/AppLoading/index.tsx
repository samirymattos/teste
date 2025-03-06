"use client";

import { Spin } from "antd";
import React from "react";

interface AppLoadingProps {
  message?: string;
}

export default function AppLoading({ message }: AppLoadingProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Spin size="large" />
        {message && <p className="my-2 text-white">{message}</p>}
      </div>
    </div>
  );
}
