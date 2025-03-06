"use client";

import React from "react";
import PageTitle from "../PageTitle";
import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";

interface ProfileStructureProps {
  isLoading: boolean;
  navTitle: string;
  title: string;
  menuButtons: MenuButton[];
  children: React.ReactNode;
}

interface MenuButton {
  title: string;
  link: string;
  isActive: boolean;
}

const ProfileStructure: React.FC<ProfileStructureProps> = ({
  isLoading,
  navTitle,
  title,
  menuButtons,
  children,
}) => {
  const router = useRouter();
  if (isLoading)
    return (
      <>
        <PageTitle hasBackButton navTitle={navTitle} title={title} />
        <div className="flex items-center justify-center p-24">
          <Spin />
        </div>
      </>
    );
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <PageTitle hasBackButton navTitle={navTitle} title={title} />
        {menuButtons.map(button => (
          <Button
            type={button.isActive ? "primary" : "default"}
            block
            size="large"
            className="mb-2"
            onClick={() => router.push(button.link)}
          >
            {button.title}
          </Button>
        ))}
      </div>
      <div className="mt-4 lg:col-span-9 max-h-[calc(100vh-150px)] overflow-y-auto pr-2 pb-5">
        {children}</div>
    </div>
  );
};

export default React.memo(ProfileStructure);
