import { defineConfig, loadEnv } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { resolve } from "path";


export default defineConfig({
    root: resolve(__dirname, 'src'),
    plugins: [
        ViteMinifyPlugin()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                about: resolve(__dirname, 'src/register.html'),
                dashboard: resolve(__dirname, 'src/dashboard.html'),
                backup: resolve(__dirname, 'src/backup.html'),
                history: resolve(__dirname, 'src/history.html'),
                server_files: resolve(__dirname, 'src/server_files.html'),
            }
        }
    },
    define: {
        'process.env': loadEnv('', process.cwd())
    }
});