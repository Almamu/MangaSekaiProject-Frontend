import { TextInput } from "@/components/ui/Input/Controlled/TextInput";
import { t } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { VerticalLayout } from "@/components/ui/View";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { createContext, ReactNode, useContext, useState } from "react";
import { Pressable } from "react-native";

interface Props<T extends FieldValues> {
  setInfoModalVisible: (visible: boolean) => void;
  pingServer: () => void;
  control: Control<T>;
  address: Path<T>;
  username: Path<T>;
  password: Path<T>;
  errors: FieldErrors<T>;
}

interface ContextProps {
  setBeforeElement: (node?: ReactNode) => void;
}

export const ServerFormContext = createContext<ContextProps>(
  {} as ContextProps
);

export function ServerForm<T extends FieldValues>({
  address,
  username,
  password,
  control,
  errors,
  pingServer,
  setInfoModalVisible,
}: Props<T>) {
  const [step, setStep] = useState(1);
  const context = useServerFormContext();
  const element = (
    <Pressable onPress={() => gotoFirstStep()}>
      <Icon icon="arrow-left" />
    </Pressable>
  );
  const gotoSecondStep = () => {
    context.setBeforeElement(element);
    setStep(2);
  };
  const gotoFirstStep = () => {
    context.setBeforeElement();
    setStep(1);
  };

  if (step === 1) {
    return (
      <VerticalLayout>
        <TextInput
          placeholder={t("install.step1.server.address")}
          append={<Icon icon="info-circle" />}
          appendPress={() => setInfoModalVisible(true)}
          control={control}
          name={address}
        />
        <ButtonPrimary
          onClick={() => !errors[address] && gotoSecondStep()}
          append={<Icon icon={"arrow-right"} />}
        >
          {t("install.step1.continue")}
        </ButtonPrimary>
      </VerticalLayout>
    );
  } else if (step === 2) {
    return (
      <VerticalLayout>
        <TextInput
          textContentType="username"
          placeholder={t("install.step1.server.username")}
          append={<Icon icon="info-circle" />}
          appendPress={() => setInfoModalVisible(true)}
          control={control}
          name={username}
        />
        <TextInput
          textContentType="password"
          placeholder={t("install.step1.server.password")}
          append={<Icon icon="info-circle" />}
          appendPress={() => setInfoModalVisible(true)}
          control={control}
          name={password}
        />
        <ButtonPrimary
          onClick={pingServer}
          append={<Icon icon={"arrow-right"} />}
        >
          {t("install.step1.continue")}
        </ButtonPrimary>
      </VerticalLayout>
    );
  }
}

export const useServerFormContext = () => useContext(ServerFormContext);
