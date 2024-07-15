// import this after installing the `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#084683",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#212121",
            success: "#4CAF50",
            warning: "#FFC107",
            fontcolor: "#212121",
            fontgray: "#838383",
          },
          variables: {
            fontFamily: "ProductSans, sans-serif",
            buttonFontSize: "16px",
          },
        },
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
