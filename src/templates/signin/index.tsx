import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { sessionService } from "@/services/session.service";
import { useSessionStore } from "@/context/session.context";
import { CookiesHandler } from "@/cookies";
import { ILogin } from "@/interfaces/ILogin";
import { useCompanyStore } from "@/context/company.context";

interface SignInFormProps {
  email: string;
  password: string;
  reminder: boolean;
}

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm<SignInFormProps>();
  const { sessionHandle, session } = useSessionStore();
  const { companyHandle, company } = useCompanyStore();
  const [selectCompanyIsOpen, setSelectCompanyIsOpen] =
    useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    const start = async () => {
      const session: Pick<ILogin, "email" | "password"> | false =
        await CookiesHandler.login.get();
      if (session && session?.email) {
        form.setFieldsValue({
          email: session.email,
          password: session.password,
          reminder: true,
        });
      }
    };
    start();
  }, [form]);

  const submitData = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);

    form.validateFields().then(values => {
      sessionService
        .auth({
          email: values.email,
          password: values.password,
          company_id: selectedCompany,
        })
        .then(res => {
          if (res.data.companies) {
            companyHandle({
              actual_company: null,
              companies: res.data.companies,
            });
            sessionHandle(res.data);
            setSelectCompanyIsOpen(true);
            return;
          } else if (company.companies && company.companies?.length > 0) {
            companyHandle({
              ...company,
              actual_company:
                company.companies?.find(item => item.id === selectedCompany) ||
                company.companies[0],
            });
          }
          if (values.reminder) {
            CookiesHandler.login.set({
              email: values.email,
              password: values.password,
            });
          } else {
            CookiesHandler.login.remove();
          }
          if (res.data?.token) {
            notification.success({
              message: "Login realizado com sucesso!",
            });
            sessionHandle(res.data);
            router.push("/dashboard");
          }
        })
        .catch(err => {
          notification.error({
            message: err?.response?.data?.message || "Erro ao realizar login",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [
    form,
    isLoading,
    sessionHandle,
    router,
    companyHandle,
    selectedCompany,
    company,
  ]);

  return (
    <div className="container text-primary">
      <div className="grid h-full w-[calc(100vw-29vw)] grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mx-auto flex h-full w-[400px] flex-col items-center justify-center">
          <div className="w-full text-left">
            <h1 className="text-3xl font-light">Olá,</h1>
            <h3 className="text-3xl font-bold">Colaborador!</h3>
            <p className="mt-2 text-xl">
              Preencha os campos com seus dados para acessar.
            </p>
            <Form
              requiredMark={false}
              className="mt-10"
              form={form}
              layout="vertical"
              onFinish={submitData}
            >
              <Form.Item
                label="Login:"
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira seu e-mail!" },
                ]}
              >
                <Input
                  className="bg-darkModal"
                  placeholder="Insira seu e-mail aqui..."
                />
              </Form.Item>
              <Form.Item
                label="Senha:"
                name="password"
                rules={[
                  { required: true, message: "Por favor, insira sua senha!" },
                ]}
              >
                <Input.Password
                  className="bg-darkModal"
                  placeholder="Insira sua senha aqui..."
                />
              </Form.Item>
              <div className="mb-4 flex items-center justify-between">
                <Form.Item
                  className="mb-0"
                  name="reminder"
                  valuePropName="checked"
                >
                  <Checkbox className="custom-checkbox font-normal text-primary">
                    Lembrar-me
                  </Checkbox>
                </Form.Item>
                <Link href="/password/resetar">
                  <span className="text-primary">Esqueceu a senha?</span>
                </Link>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  {isLoading ? "Carregando..." : "Entrar"}
                </Button>
              </Form.Item>
            </Form>
            <div className="flex w-full items-center justify-center">
              <hr className="hr-item w-full" />
              <span className="text-description w-full text-center font-normal">
                Ou entre com
              </span>
              <hr className="hr-item w-full" />
            </div>
            <div className="text-center">
              <Button type="default" className="mb-5 mt-5" block>
                <Image
                  src="/images/oniaedu.png"
                  width={80}
                  height={20}
                  alt="google"
                />
              </Button>
              <Link target="_blank" href="">
                Problemas com seu e-mail? Clique aqui!
              </Link>
              <Button
                type="default"
                className="bg-input-background mt-5 border-none"
                block
              >
                <span className="text-primary">
                  Sugestões ou críticas anônimas
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden w-[64vw] items-center justify-center bg-darkSelecao md:flex">
          <Image
            src="/images/bg-login.png"
            width={800}
            height={800}
            alt="bg-login"
          />
        </div>
      </div>
      <Modal
        open={selectCompanyIsOpen}
        onClose={() => setSelectCompanyIsOpen(false)}
        footer={null}
      >
        <div className="p-8">
          <Image
            src="/images/gesteduinternal.png"
            alt="Logo"
            width={120}
            height={120}
            className="cursor-pointer"
          />

          <h1 className="mt-8 text-3xl font-light">
            Bem-vindo,{" "}
            <span className="text-3xl font-bold">{session?.user?.name}!</span>
          </h1>
          <p className="mt-2 text-xl">
            Escolha a empresa na qual deseja iniciar sua sessão!
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {company?.companies?.map(item => (
              <img
                key={item.id}
                onClick={() =>
                  selectedCompany === item.id
                    ? setSelectedCompany(null)
                    : setSelectedCompany(item.id)
                }
                className={`h-24 w-full cursor-pointer rounded-lg object-contain p-4 transition-shadow duration-300 hover:shadow-lg ${
                  selectedCompany === item.id ? "selected" : "card-item"
                }`}
                src={process.env.NEXT_PUBLIC_FILES + item.companyData.logo}
              />
            ))}
          </div>
          {selectedCompany && (
            <Button
              onClick={submitData}
              loading={isLoading}
              type="primary"
              className="mt-8"
              block
            >
              Acessar
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
