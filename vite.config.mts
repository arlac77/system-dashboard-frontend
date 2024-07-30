import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { extractFromPackage } from "npm-pkgbuild";

export default defineConfig(async ({ command, mode }) => {
  const res = extractFromPackage(
    {
      dir: new URL("./", import.meta.url).pathname,
      mode
    },
    process.env
  );
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

  let backend = properties["http.origin"] + properties["http.api.path"];
  const api = properties["http.api.path"];
  let rewrite = path => path.substring(api.length);

  console.log(backend,api)
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
        exclude: [
          /\.(map)$/,
          /\.(br)$/,
          /\.(gz)$/,
          /\.(png)$/,
          /\.(jpg)$/,
          /\.(gif)$/,
          /\.(webp)$/,
          /\.(heic)$/,
          /\.(avif)$/,
          /\.(jxl)$/,
          /\.(pdf)$/,
          /\.(docx)$/
        ],
        threshold: 500
      })
    ],
    server: {
      host: true,
      proxy: {
        [api]: {
          target: backend,
          rewrite
        }
      }
    },
    build: {
      outDir: "../build",
      emptyOutDir: true,
      minify: production,
      sourcemap: true
    }
  };
});
