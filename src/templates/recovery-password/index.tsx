import { Button, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";
import { useRouter } from "next/navigation";
import "./styles.css";

interface RecoveryPasswordFormProps {
  password: string;
  confirmPassword: string;
}

const RecoveryPassword: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<RecoveryPasswordFormProps>();
  const [hasInteracted, setHasInteracted] = useState(false);

  const onFinish = useCallback(() => {
    router.push("/senha-recuperada");
  }, [router]);

  const handlePasswordChange = useCallback(
    (changedValues: Partial<RecoveryPasswordFormProps>) => {
      if (changedValues.password !== undefined) {
        const password = changedValues.password || "";
        setHasInteracted(true);

        if (form.getFieldValue("confirmPassword")) {
          form.validateFields(["confirmPassword"]);
        }
      }
    },
    [form]
  );

  return (
    <div className="recovery flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-[url(/images/bg/bg-password-forget.png)] bg-cover text-primary">
      <div className="min-h-[412px] w-[573px] rounded-3xl bg-darkBg p-10">
        <div className="flex items-end justify-end">
          <Image
            src="/images/icons/lock.png"
            width={28}
            height={30}
            alt="bg-login"
          />
        </div>
        <div className="px-10">
          <div>
            <h1 className="text-3xl font-bold">Redefinição de senha</h1>
            <p className="text-ml mt-2">
              Insira uma nova senha para acessar sua conta.
            </p>
          </div>
          <Form
            className="mt-5"
            requiredMark={false}
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={handlePasswordChange}
          >
            <Form.Item
              label="Nova Senha:*"
              name="password"
              rules={[
                { required: true, message: "Por favor, insira sua senha!" },
                {
                  min: 8,
                  message: "A senha deve ter no mínimo 8 caracteres",
                },
                {
                  pattern: /\d/,
                  message: "A senha deve conter pelo menos um número",
                },
                {
                  pattern: /[A-Z]/,
                  message: "A senha deve conter pelo menos uma letra maiúscula",
                },
                {
                  pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                  message:
                    "A senha deve conter pelo menos um caractere especial",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input.Password
                className="bg-darkModal"
                placeholder="Digite sua nova senha..."
              />
            </Form.Item>

            <Form.Item
              label="Confirmar senha:*"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Por favor, confirme sua senha!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "As senhas não coincidem. Verifique e tente novamente."
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="bg-darkModal"
                placeholder="Digite sua nova senha..."
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Confirmar
            </Button>
          </Form>
          <p className="flex items-center justify-center pt-6 text-darkTextoDescricao">
            Esqueceu seu e-mail? 
            <Link className="text-primary" href="/esqueceu-email">
              Clique aqui!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecoveryPassword);
