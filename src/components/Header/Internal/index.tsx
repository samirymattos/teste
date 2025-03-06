"use client";

import { Menu, Input, Space, Dropdown, notification } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { SearchOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import './styles.css';
import { useSessionStore } from '@/context/session.context';
import { useRouter } from 'next/navigation';
import { useCompanyStore } from '@/context/company.context';
import { FaChevronDown } from 'react-icons/fa';

const InternalHeader: React.FC = () => {
  const { company, companyLogout } = useCompanyStore();
  const { session, sessionLogout } = useSessionStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownVisibleChange = (visible: boolean) => {
    setIsOpen(visible);
  };
  const menuItems = useMemo(() => {
    const itemsMenu: ItemType<MenuItemType>[] = [
      {
        key: "1",
        label: (
          <div className="flex items-center justify-between">
            <span>Administrativo</span>
            <Image
              src="/images/icons/arrowdown.png"
              alt="Ícone"
              width={16}
              height={16}
              className="ml-2 cursor-pointer"
            />
          </div>
        ),
        children: [
          {
            key: "1-1",
            label: "Dashboard",
          }
        ],
      },
      {
        key: "2",
        label: (
          <div className="flex items-center justify-between">
            <span>Vendas</span>
            <Image
              src="/images/icons/arrowdown.png"
              alt="Ícone"
              width={16}
              height={16}
              className="ml-2 cursor-pointer"
            />
          </div>
        ),
        children: [
          {
            key: "",
            label: "Listar Vendas",
          }
        ],
      },
      {
        key: "3",
        label: (
          <div className="flex items-center justify-between">
            <span>Sistema</span>
            <Image
              src="/images/icons/arrowdown.png"
              alt="Ícone"
              width={16}
              height={16}
              className="ml-2 cursor-pointer"
            />
          </div>
        ),
        children: [
          {
            key: "/dashboard/configuracoes/alunos",
            label: "Alunos",
          },
          
          {
            key: "/dashboard/configuracoes/captadores",
            label: "Captadores",
          },
          
          {
            key: "/dashboard/configuracoes/cursos",
            label: "Cursos",
          },
          
          
        ],
      },
    ];
    return itemsMenu;
  }, []);

  return (
    <Header className="internal-header flex h-full flex-col items-center justify-center px-0">
      <div className="flex h-[64px] w-full items-center justify-between pl-[80px] pr-[80px]">
        <Dropdown
          menu={{
            items: company.companies?.map(item => ({
              key: item.id,
              label: (
                <img
                  onClick={() =>
                    company.actual_company?.id !== item.id &&
                    router.push(`/mudar-empresa/${item.id}?name=${item.name}`)
                  }
                  src={process.env.NEXT_PUBLIC_FILES + item.companyData.logo}
                  alt="Logo"
                  width={200}
                  height={30}
                  className="my-1 max-h-7 object-contain object-left"
                />
              ),
            })),
          }}
          trigger={["click"]}
        >
          <div className="companySelected flex w-[160px] items-center justify-between gap-3">
            <Image
              src={
                company?.actual_company?.companyData?.logo
                  ? process.env.NEXT_PUBLIC_FILES +
                  company?.actual_company?.companyData?.logo
                  : "/images/gesteduinternal.png"
              }
              alt="Logo"
              width={100}
              height={100}
              className="cursor-pointer"
            />
            <FaChevronDown color="white" />
          </div>
        </Dropdown>

        <Space direction="vertical" className="w-[50vw]">
          <Input
            className="w-full rounded-3x2"
            placeholder="Pesquisar..."
            prefix={<SearchOutlined className="text-darkTextoDescricao" />}
          // onPressEnter={(e) => onSearch((e.target as HTMLInputElement).value)}
          />
        </Space>

        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/icons/bell.png"
            alt="Logo"
            width={32}
            height={32}
            className="cursor-pointer"
          />
          <Dropdown
            menu={{
              onClick: e => {
                if (e.key === "sair") {
                  companyLogout();
                  sessionLogout();
                  notification.success({
                    message: "Logout efetuado com sucesso!",
                  });
                  router.push("/");
                }
              },
              items: [
                {
                  key: "sair",
                  label: "Sair",
                  danger: true,
                },
              ],
            }}
            trigger={["click"]}
          >
            <div className="flex h-12 items-center justify-center gap-3">
              <Image
                src="/images/user/profile.png"
                alt="Logo"
                width={32}
                height={32}
                className="cursor-pointer"
              />
              <div className="flex flex-col items-start justify-start px-0 text-darkTextoDescricao">
                <span className="h-3 text-sm font-bold">
                  {session?.user.name}
                </span>
                <span className="text-ssm font-normal">Gerente master</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
      <hr className="border-t-1 m-0 mb-4 w-full border-gray-300" />
      <div className="flex h-[20px] w-full items-start justify-between pl-[80px] pr-[80px]">
        <Menu
          onClick={e => router.push(e.key)}
          theme="dark"
          className="flex h-5 min-w-[700px] items-center font-bold"
          mode="horizontal"
          items={menuItems}
        />
        <div className="aniversariantes-container relative flex h-5 items-center gap-2">
          <Image
            src="/images/icons/aniversary.png"
            alt="Logo"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <div className="font-bold text-darkTextoDescricao">
            Anivesariantes:
            <span className="nome-aniversariante text-darkTextoDescricao">
              Léo 07/11
            </span>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default React.memo(InternalHeader);
