import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    // Load env variables based on the current mode (development, production, etc.)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                // Proxy all /api calls to the URL specified in the env variable.
                "/api": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
