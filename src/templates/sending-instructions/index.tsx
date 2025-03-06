import { Button, Checkbox, Form, Input, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import "./style.css";

const SendInstructions: React.FC = () => {
  const router = useRouter();

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="sending-instructions flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-[url(/images/bg/bg-password-forget.png)] bg-cover text-primary">
      <div className="flex min-h-[412px] w-[573px] items-center rounded-3xl bg-darkBg">
        <div className="flex flex-col items-center px-10 text-center">
          <Image
            src="/images/icons/check.png"
            width={64}
            height={46}
            alt="bg-login"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold">Instruções enviadas!</h1>
            <p className="mt-2 text-sm">
              Um link para redefinir sua senha foi enviado para o endereço de
              e-mail. Verifique sua caixa de entrada e spam.
            </p>
          </div>
          <div className="p-2">
            <Button type="primary" htmlType="submit" block onClick={goHome}>
              Ir para o Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SendInstructions);
