import { resolve } from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true
		})
	],
	test: {
		globals: false,
		css: true,
		environment: "jsdom",
		setupFiles: ["./config/vitest.ts"]
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src/styled.ts"),
			name: "Styled Components Macaron Wrapper",
			fileName: "styled-macaron-wrapper"
		},
		rollupOptions: {
			external: ["react", "react-dom", "styled-components"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"styled-components": "styledComponentsFn"
				}
			}
		}
	}
});
