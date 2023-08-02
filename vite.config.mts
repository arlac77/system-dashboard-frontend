import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { extractFromPackage } from "npm-pkgbuild";

export default defineConfig(async ({ command, mode }) => {
  const res = extractFromPackage({
    dir: new URL("./", import.meta.url).pathname,
    mode
  }, process.env);
  const first = await res.next();
  const pkg = first.value;
  const properties = pkg.properties;
  const base = properties["http.path"] + "/";
  const production = mode === "production";

  process.env["VITE_NAME"] = properties.name;
  process.env["VITE_DESCRIPTION"] = properties.description;
  process.env["VITE_VERSION"] = properties.version;
  process.env["VITE_API"] = properties["http.api.path"];
  process.env["VITE_API_WS"] = properties["wss.api"];
  process.env["VITE_JOURNAL_ENDPOINT"] = properties["journal.endpoint"];
  
  return {
    base,
    root: "src",
    worker: { format: "es" },
    plugins: [
      svelte({
        compilerOptions: {
          dev: !production
        }
      }),
      compression({
        algorithm: "brotliCompress",
        exclude: [/\.(br)$/, /\.(gz)$/, /\.(png)$/, /\.(jpg)$/, /\.(webp)$/, /\.(svg)$/],
        threshold: 500
      })
    ],
    server: { host: true },
    build: {
      outDir: "../build",
      emptyOutDir: true,
      minify: production,
      sourcemap: true
    }
  };
});
