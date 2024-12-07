import { Platform, View } from "react-native";
import { Image } from "expo-image";
import { ScreenRootView, VerticalLayout } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { t } from "@/i18n";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { Modal } from "@/components/ui/Modal";
import { ReactNode, useCallback, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import {
  ServerForm,
  ServerFormContext,
} from "@/components/parts/startup/step1/ServerForm";
import { z } from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { useBackendContext } from "@/hooks/useBackend";

const validation = z.object({
  address: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormType = z.infer<typeof validation>;

export default function Step1() {
  const backendContext = useBackendContext();
  const [serverModalVisible, setServerModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backElement, setBackElement] = useState<ReactNode | undefined>();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useZodForm<LoginFormType>(validation, {
    address: "",
    username: "",
    password: "",
  });

  const closeServerModal = useCallback(() => {
    setServerModalVisible(false);
  }, [setServerModalVisible]);
  const closeInfoModal = useCallback(() => {
    setInfoModalVisible(false);
  }, [setInfoModalVisible]);

  const pingServer = useCallback(
    async (form: LoginFormType) => {
      if (!isValid) {
        return;
      }

      setLoading(false);
    },
    [setLoading, backendContext, isValid]
  );

  // TODO: SUPPORT FOR QR READING AT SOME POINT!
  // TODO: SUPPORT FOR AUTODETECTING INSTANCES RUNNING ON OUR SAME MACHINE

  return (
    <ServerFormContext.Provider value={{ setBeforeElement: setBackElement }}>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <View>
          <Image
            source={require("@/assets/images/mangasekai-logo.png")}
            contentFit="cover"
            style={{ height: 500, width: "100%" }}
          />
        </View>
        <ScreenRootView
          style={{
            paddingTop: 0,
            flex: 0,
            flexGrow: 1,
            flexBasis: "auto",
            justifyContent: "flex-end",
          }}
        >
          <VerticalLayout style={{ flexGrow: 1 }}>
            {loading ? (
              <Loader
                style={{
                  transform: [
                    { scale: Platform.select({ default: 3, web: 5 }) },
                  ],
                }}
                size="large"
              />
            ) : (
              <>
                <Text>{t("install.step1.welcome")}</Text>
                <VerticalLayout>
                  {Platform.OS !== "android" ? (
                    <>
                      <ButtonPrimary
                        onClick={() => {
                          setServerModalVisible(true);
                        }}
                      >
                        {t("install.step1.manual")}
                      </ButtonPrimary>

                      <ButtonPrimary href="/">
                        {t("install.step1.scanQR")}
                      </ButtonPrimary>
                    </>
                  ) : (
                    <ServerForm
                      pingServer={() => handleSubmit(pingServer)}
                      setInfoModalVisible={setInfoModalVisible}
                      control={control}
                      address={"address"}
                      username={"username"}
                      password={"password"}
                      errors={errors}
                    />
                  )}
                </VerticalLayout>
              </>
            )}
          </VerticalLayout>
        </ScreenRootView>
        <Modal
          beforeElement={backElement}
          visible={serverModalVisible}
          close={closeServerModal}
          title={t("install.step1.modal.title")}
        >
          <ServerForm
            pingServer={() => handleSubmit(pingServer)}
            setInfoModalVisible={setInfoModalVisible}
            control={control}
            address={"address"}
            username={"username"}
            password={"password"}
            errors={errors}
          />
        </Modal>
        <Modal
          visible={infoModalVisible}
          close={closeInfoModal}
          title={t("install.step1.infoModal.title")}
        >
          <Text>{t("install.step1.infoModal.text")}</Text>
        </Modal>
      </View>
    </ServerFormContext.Provider>
  );
}
