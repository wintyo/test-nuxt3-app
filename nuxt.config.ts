import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src',
  typescript: {
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        esModuleInterop: true,
        types: ['jest'],
        // 書かなくてもPropの設定ができてる？
        // useDefineForClassFields: true,
      },
    },
  },
});
