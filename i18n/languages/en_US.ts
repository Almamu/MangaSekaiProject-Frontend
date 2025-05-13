import type { Translations } from "@/i18n";

export const translation: Translations = {
  install: {
    step1: {
      welcome: "Welcome",
      scanQR: "Scan QR Code",
      manual: "Enter manually",
      continue: "Next",
      back: "Back",
      server: {
        address: "Server Address",
        username: "Username",
        password: "Password",
      },
      infoModal: {
        title: "Server Address",
        text: "Input here the server address where your MangaSekaiProject instance is hosted",
      },
      modal: {
        title: "Setup server",
      },
      status: {
        WAITING: "Waitings",
        AUTHENTICATING: "Authenticating",
      },
    },
  },
};

export default {
  translation,
};
