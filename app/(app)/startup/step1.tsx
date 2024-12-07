import { Platform, View } from "react-native";
import { Image } from "expo-image";
import { ScreenRootView, VerticalLayout } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { t } from "@/i18n";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useServerSettings } from "@/hooks/useServerSettings";
import { Modal } from "@/components/ui/Modal";
import { useCallback, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import { ServerForm } from "@/components/parts/startup/step1/ServerForm";

export default function Step1() {
  const _serverSettings = useServerSettings();
  const [serverModalVisible, setServerModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, _setLoading] = useState(false);

  const closeServerModal = useCallback(() => {
    setServerModalVisible(false);
  }, [setServerModalVisible]);

  const closeInfoModal = useCallback(() => {
    setInfoModalVisible(false);
  }, [setInfoModalVisible]);

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
            <Loader
              style={{
                transform: [{ scale: Platform.select({ default: 3, web: 5 }) }],
              }}
              size="large"
            />
          ) : (
            <>
              <Text>{t("install.step1.welcome")}</Text>
              <VerticalLayout>
                {Platform.OS !== "web" && (
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
                )}
                <ServerForm setInfoModalVisible={setInfoModalVisible} />
              </VerticalLayout>
            </>
          )}
        </VerticalLayout>
      </ScreenRootView>
      <Modal
        visible={serverModalVisible}
        close={closeServerModal}
        title={t("install.step1.modal.title")}
      >
        <ServerForm setInfoModalVisible={setInfoModalVisible} />
      </Modal>
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
