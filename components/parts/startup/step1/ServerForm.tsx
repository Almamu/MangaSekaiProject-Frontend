import { TextInput } from "@/components/ui/Input/Base/TextInput";
import { t } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { VerticalLayout } from "@/components/ui/View";
import { ButtonPrimary } from "@/components/ui/Buttons";

interface Props {
  setInfoModalVisible: (visible: boolean) => void;
}

export function ServerForm({ setInfoModalVisible }: Props) {
  return (
    <VerticalLayout>
      <TextInput
        placeholder={t("install.step1.server.address")}
        append={<Icon icon="info-circle" />}
        appendPress={() => setInfoModalVisible(true)}
      />
      <ButtonPrimary onClick={() => {}} append={<Icon icon={"arrow-right"} />}>
        {t("install.step1.continue")}
      </ButtonPrimary>
    </VerticalLayout>
  );
}
