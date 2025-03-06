import { Button, Checkbox, Form, Input, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import "./style.css";
interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm<ForgotPasswordFormProps>();
  const router = useRouter();

  const onFinish = useCallback(
    (values: ForgotPasswordFormProps) => {
      console.log({ values });
      router.push("/password/confirmacao");
    },
    [router]
  );

  return (
    <div className="forgot-password flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-darkBg bg-[url(/images/bg/bg-password-forget.png)] text-primary">
      <div className="min-h-[412px] w-[573px] rounded-3xl bg-darkBg p-10">
        <div className="flex items-end justify-end">
          <Image
            src="/images/icons/lock.png"
            width={28}
            height={30}
            alt="Imagem"
          />
        </div>
        <div className="px-10">
          <div>
            <h1 className="text-3xl font-light">Esqueceu sua senha?</h1>
            <h3 className="text-3xl font-bold">Preencha para recuperar!</h3>
            <p className="text-ml mt-2">
              Não se preocupe! Informe seu e-mail de acesso e enviaremos as
              instruções para redefinir sua senha.
            </p>
          </div>
          <Form
            className="mt-5"
            requiredMark={false}
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Login:"
              name="email"
              rules={[
                { required: true, message: "Por favor, insira seu e-mail!" },
                { type: "email", message: "E-mail inválido!" },
              ]}
            >
              <Input
                className="bg-darkModal"
                placeholder="Insira seu e-mail aqui..."
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form>
          <p className="flex items-center justify-center pt-6 text-darkTextoDescricao">
            Esqueceu seu e-mail? {" "}
            <Link className="text-primary" href="/esqueceu-email">
              Clique aqui!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);
