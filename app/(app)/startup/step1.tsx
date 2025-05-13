import { Image } from "expo-image";
import { ScreenRootView, VerticalLayout } from "@/components/ui/View";
import { LightText, LightTextCenter } from "@/components/ui/Text";
import { t } from "@/i18n";
import { Modal } from "@/components/ui/Modal";
import { useCallback, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import {
  SetupForm,
  ServerFormType,
} from "@/components/parts/startup/step1/SetupForm";
import { useBackendClient, useBackendContext } from "@/hooks/useBackend";
import { Body } from "@/domain/backend";
import { useServerSettings } from "@/hooks/useServerSettings";
import { useAbortSignal } from "@/hooks/useAbortSignal";
import { useRouter } from "expo-router";
import { Temporal } from "temporal-polyfill";
import styled from "styled-components/native";

const ContentContainer = styled(ScreenRootView)`
  padding-top: 0;
  flex-basis: auto;
  justify-content: flex-end;
  width: 100%;
`;

const FormContainer = styled(VerticalLayout)`
  justify-content: flex-end;
`;

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

        serverSettings.actions.setToken(
          guid,
          result.token,
          Temporal.Now.instant().epochSeconds + result.expires_in
        );
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
    [abortSignal, backend, client, router, serverSettings.actions]
  );

  // TODO: SUPPORT FOR QR READING AT SOME POINT!
  // TODO: SUPPORT FOR AUTODETECTING INSTANCES RUNNING ON OUR SAME MACHINE

  return (
    <VerticalLayout>
      <Image
        source={require("@/assets/images/mangasekai-logo.png")}
        contentFit="cover"
        style={{ height: 500, width: "100%" }}
      />
      <ContentContainer>
        {loading ? (
          <>
            <Loader size="large" />
            <LightTextCenter>
              {t(`install.step1.status.${loadingStep}`)}
            </LightTextCenter>
            `
          </>
        ) : (
          <>
            <LightTextCenter>{t("install.step1.welcome")}</LightTextCenter>
            <FormContainer>
              <SetupForm
                pingServer={pingServer}
                setInfoModalVisible={setInfoModalVisible}
              />
            </FormContainer>
          </>
        )}
      </ContentContainer>
      <Modal
        visible={infoModalVisible}
        close={closeInfoModal}
        title={t("install.step1.infoModal.title")}
      >
        <LightText>{t("install.step1.infoModal.text")}</LightText>
      </Modal>
    </VerticalLayout>
  );
}
