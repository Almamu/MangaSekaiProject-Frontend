import { Platform, View } from "react-native";
import { Image } from "expo-image";
import { ScreenRootView, VerticalLayout } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { t } from "@/i18n";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useServerSettings } from "@/hooks/useServerSettings";
import { Modal } from "@/components/ui/Modal";
import { useCallback, useState } from "react";
import { TextInput } from "@/components/ui/Input/Base/TextInput";
import { Icon } from "@/components/ui/Icon";
import { Loader } from "@/components/ui/Loader";

export default function Step1() {
  const _serverSettings = useServerSettings();
  const [serverModalVisible, setServerModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const closeServerModal = useCallback(() => {
    setServerModalVisible(false);
  }, [setServerModalVisible]);

  // TODO: SUPPORT FOR QR READING AT SOME POINT!

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
                <ButtonPrimary
                  onClick={() => {
                    setServerModalVisible(true);
                  }}
                >
                  {t("install.step1.manual")}
                </ButtonPrimary>
                {Platform.OS !== "web" && (
                  <ButtonPrimary href="/">
                    {t("install.step1.scanQR")}
                  </ButtonPrimary>
                )}
                <TextInput append={<Icon icon="info-circle" />} />
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
        <Text>Test</Text>
        <TextInput append={<Icon icon="info-circle" />} />
        <ButtonPrimary
          onClick={() => {
            setLoading(true);
            setServerModalVisible(false);
          }}
        >
          Test
        </ButtonPrimary>
      </Modal>
    </View>
  );
}
