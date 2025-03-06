"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

interface PageTitleProps {
  title: string;
  navTitle: string;
  action?: React.ReactNode;
  hasBackButton?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  navTitle,
  action,
  hasBackButton = false,
}) => {
  const router = useRouter();
  return (
    <div className="mb-4 mt-4 flex items-center justify-between">
      <div className="flex items-center">
        {hasBackButton && (
          <IoChevronBackSharp
            color="white"
            size={40}
            className="mr-4 cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <div className="text-primary">
          <h3 className="text-1xl">{navTitle}</h3>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
      {action}
    </div>
  );
};

export default React.memo(PageTitle);
