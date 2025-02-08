import { Platform, View } from "react-native";
import { Image } from "expo-image";
import {
  HorizontalLayout,
  ScreenRootView,
  VerticalLayout,
} from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { t } from "@/i18n";
import { Modal } from "@/components/ui/Modal";
import { useCallback, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import {
  ServerForm,
  ServerFormType,
} from "@/components/parts/startup/step1/ServerForm";
import { useBackendClient, useBackendContext } from "@/hooks/useBackend";
import { Body } from "@/domain/backend";
import { useServerSettings } from "@/hooks/useServerSettings";
import { useAbortSignal } from "@/hooks/useAbortSignal";
import { useRouter } from "expo-router";

enum LoadingStep {
  WAITING = "WAITING",
  AUTHENTICATING = "AUTHENTICATING",
}

export default function Step1() {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(LoadingStep.WAITING);
  const backend = useBackendContext();
  const client = useBackendClient();
  const serverSettings = useServerSettings();
  const abortSignal = useAbortSignal();
  const router = useRouter();

  const closeInfoModal = useCallback(() => {
    setInfoModalVisible(false);
  }, [setInfoModalVisible]);

  const pingServer = useCallback(
    async (form: ServerFormType) => {
      setLoadingStep(LoadingStep.AUTHENTICATING);
      setLoading(true);

      try {
        // override server so we can comunicate with it directly
        backend.overrideServer(form.address);
        // attempt a login
        const result = await client.login(
          new Body({
            username: form.username,
            password: form.password,
          }),
          abortSignal
        );
        // everything went right, save it
        const guid = serverSettings.actions.addServer(form.address);

        serverSettings.actions.setToken(guid, result.token);
        serverSettings.actions.setActiveServer(guid);
        // now take the user to the home page
        router.replace("/home/dashboard");
      } catch (e) {
        // TODO: SHOW ERROR
        console.dir(e);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  // TODO: SUPPORT FOR QR READING AT SOME POINT!
  // TODO: SUPPORT FOR AUTODETECTING INSTANCES RUNNING ON OUR SAME MACHINE

  return (
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
            <>
              <Loader
                style={{
                  transform: [
                    { scale: Platform.select({ default: 1, web: 5 }) },
                  ],
                }}
                size="large"
              />
              <Text>{loadingStep}</Text>
            </>
          ) : (
            <>
              <HorizontalLayout
                style={{ flexGrow: 1, alignItems: "flex-start" }}
              >
                <Text>{t("install.step1.welcome")}</Text>
              </HorizontalLayout>
              <VerticalLayout
                style={{
                  maxWidth: Platform.select({ web: 600, default: undefined }),
                }}
              >
                <ServerForm
                  pingServer={pingServer}
                  setInfoModalVisible={setInfoModalVisible}
                />
              </VerticalLayout>
            </>
          )}
        </VerticalLayout>
      </ScreenRootView>
      <Modal
        visible={infoModalVisible}
        close={closeInfoModal}
        title={t("install.step1.infoModal.title")}
      >
        <Text>{t("install.step1.infoModal.text")}</Text>
      </Modal>
    </View>
  );
}
