import type { Translations } from "@/i18n";

export const translation: Translations = {
  install: {
    step1: {
      welcome: "Bienvenido",
      scanQR: "Escanear código QR",
      manual: "Introducir manualmente",
      continue: "Siguiente",
      back: "Volver",
      server: {
        address: "Dirección del servidor",
        username: "Nombre de usuario",
        password: "Contraseña",
      },
      infoModal: {
        title: "Dirección del servidor",
        text: "Introduce aquí la dirección donde se encuentra alojada tu instancia de MangaSekaiProject",
      },
      modal: {
        title: "Configurar servidor",
      },
      status: {
        WAITING: "Esperando",
        AUTHENTICATING: "Autenticando",
      },
    },
  },
};

export default {
  translation,
};
