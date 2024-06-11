// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthub/core', "@nuxt/eslint", "@nuxtjs/tailwindcss", "nuxt-auth-utils"],
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
		oauth:{
      github:{
        clientId: process.env.GITHUB_CLIENT_ID,
		    clientSecret: process.env.GITHUB_CLIENT_SECRET
      },
      google:{
        clientId:'',
        clientSecret:''
      }
    }
	},
})