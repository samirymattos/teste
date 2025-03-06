import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const ExternalHeader: React.FC = () => {
  const menuItems = useMemo(() => {
    const itemsMenu: ItemType<MenuItemType>[] = [
      {
        key: "1",
        label: "Home",
      },
      {
        key: "2",
        label: "Sobre nós",
      },
      {
        key: "3",
        label: "Planos",
      },
      {
        key: "4",
        label: "Contatos",
      },
      {
        key: "5",
        label: (
          <Button type="primary" className="w-[124px] px-4 py-2">
            Entrar
          </Button>
        ),
      },
      {
        key: "6",
        label: (
          <Button
            type="default"
            className="w-[124px] border border-primary px-4 py-2"
          >
            Cadastre-se
          </Button>
        ),
      },
    ];
    return itemsMenu;
  }, []);
  return (
    <Header className="flex items-center justify-between">
      <Link href="/">
        <Image
          src="/images/gesteduinternal.png"
          alt="Logo"
          width={120}
          height={120}
          className="cursor-pointer"
        />
      </Link>
      <Menu
        theme="dark"
        className="min-w-[700px] font-bold"
        mode="horizontal"
        items={menuItems}
      />
    </Header>
  );
};

export default React.memo(ExternalHeader);
