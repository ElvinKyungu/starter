// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthub/core', "@nuxt/eslint", "@nuxtjs/tailwindcss"],
  app: {
		head: {
			title: "Lucia example"
		}
	},
  nitro: {
    experimental: {
      tasks: true
    }
  },
  hub: {
    database: true,
    kv: true,
  },
  runtimeConfig: {
		githubClientId: process.env.GITHUB_CLIENT_ID,
		githubClientSecret: process.env.GITHUB_CLIENT_SECRET
	},
})