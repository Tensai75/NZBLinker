import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'

import { createShadowRootUi, defineContentScript } from '#imports'
import { MyPreset } from '@/assets/presets'

export default defineContentScript({
  registration: 'runtime',
  matches: ['<all_urls>'],
  main(ctx) {
    const primeVueTheme = {
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'nzblinker',
        },
      },
    }
    // Define the UI
    createShadowRootUi(ctx, {
      name: 'nzblinker-selection-dialog',
      position: 'inline',
      anchor: 'body',
      append: 'last',
      inheritStyles: true,
      onMount: (container) => {
        // Define how the UI will be mounted inside the container
        const app = createApp(App).use(PrimeVue, primeVueTheme)
        app.mount(container)
        return app
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount()
      },
    }).then((ui) => {
      // Mount the UI
      ui.mount()
    })
  },
})
