import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
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
