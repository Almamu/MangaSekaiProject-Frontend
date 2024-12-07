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

export default function Step1() {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeInfoModal = useCallback(() => {
    setInfoModalVisible(false);
  }, [setInfoModalVisible]);

  const pingServer = useCallback(
    async (form: ServerFormType) => {
      setLoading(true);
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
            <Loader
              style={{
                transform: [{ scale: Platform.select({ default: 1, web: 5 }) }],
              }}
              size="large"
            />
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
