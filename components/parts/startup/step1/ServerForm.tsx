import { TextInput } from "@/components/ui/Input/Controlled/TextInput";
import { t } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { VerticalLayout } from "@/components/ui/View";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useState } from "react";
import { Platform } from "react-native";
import { z } from "zod";
import { useZodForm } from "@/hooks/useZodForm";

interface Props {
  setInfoModalVisible: (visible: boolean) => void;
  pingServer: (form: ServerFormType) => Promise<void>;
}

export const ServerFormValidation = z.object({
  address: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type ServerFormType = z.infer<typeof ServerFormValidation>;

export function ServerForm({ pingServer, setInfoModalVisible }: Props) {
  const [step, setStep] = useState(Platform.select({ default: 0, web: 1 }));
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useZodForm<ServerFormType>(ServerFormValidation, {
    address: "",
    username: "admin",
    password: "password",
  });

  return (
    <>
      <VerticalLayout style={{ display: step === 0 ? "flex" : "none" }}>
        <ButtonPrimary
          onClick={() => {
            setStep(1);
          }}
        >
          {t("install.step1.manual")}
        </ButtonPrimary>

        <ButtonPrimary href="/">{t("install.step1.scanQR")}</ButtonPrimary>
      </VerticalLayout>
      <VerticalLayout style={{ display: step === 1 ? "flex" : "none" }}>
        <TextInput
          textContentType={"URL"}
          placeholder={t("install.step1.server.address")}
          append={<Icon name="info-circle" />}
          appendPress={() => setInfoModalVisible(true)}
          control={control}
          name={"address"}
        />
        <ButtonPrimary
          onClick={async () =>
            (await trigger("address")) && !errors.address && setStep(2)
          }
          append={<Icon name={"arrow-right"} />}
        >
          {t("install.step1.continue")}
        </ButtonPrimary>
        {Platform.OS !== "web" && (
          <ButtonPrimary
            muted
            onClick={() => setStep(0)}
            prepend={<Icon muted name="arrow-left" />}
          >
            {t("install.step1.back")}
          </ButtonPrimary>
        )}
      </VerticalLayout>
      <VerticalLayout style={{ display: step === 2 ? "flex" : "none" }}>
        <TextInput
          textContentType="username"
          placeholder={t("install.step1.server.username")}
          control={control}
          name={"username"}
        />
        <TextInput
          textContentType="password"
          placeholder={t("install.step1.server.password")}
          control={control}
          name={"password"}
        />
        <ButtonPrimary
          onClick={handleSubmit(pingServer)}
          append={<Icon name="arrow-right" />}
        >
          {t("install.step1.continue")}
        </ButtonPrimary>
        <ButtonPrimary
          muted
          onClick={() => setStep(1)}
          prepend={<Icon muted name="arrow-left" />}
        >
          {t("install.step1.back")}
        </ButtonPrimary>
      </VerticalLayout>
    </>
  );
}
