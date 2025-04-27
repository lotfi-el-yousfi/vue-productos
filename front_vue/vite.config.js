/// <reference types="vitest" />
import {
    fileURLToPath,
    URL
} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        vuetify()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {},
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',

        setupFiles: ["./tests/setup.ts"],
        deps: {
            inline: ['vuetify'],
            // force vuetify to be pre-bundled properly
        },
        alias: {
            '^.*\\.css$': './src/test/__mocks__/styleMock.js',
        },
    },
});
