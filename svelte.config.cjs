const sveltePreprocess = require("svelte-preprocess");
const pkg = require("./package.json");
const vercel = require("@sveltejs/adapter-vercel");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: vercel(),

    target: "#svelte",

    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
};
