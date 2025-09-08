<script lang="ts" setup>
import { Form } from '@primevue/forms'
import { Button, Dialog, Textarea } from 'primevue'
import { nextTick, onMounted, ref, watch } from 'vue'
import { PublicPath } from 'wxt/browser'

import { i18n } from '#i18n'
import { browser } from '#imports'
import NZBLinkerLogo from '@/components/nzblinkerLogo.vue'
import NZBLinkInputs from '@/components/nzbLinkInputs.vue'
import { Settings } from '@/services/settings'
import { onMessage, sendMessage } from '@/utils/extensionMessengerUtilities'
import { analyseText } from '@/utils/htmlAnalysisUtilities'
import { NzblnkData, generateNzblnk } from '@/utils/nzblnkUtilities'

console.info('analyseSelection script successfully loaded')
const rerenderKey = ref(0)
const parameters = ref<NzblnkData & { selection: string }>({
  selection: '',
  header: '',
  password: '',
  title: '',
  groups: [],
  date: undefined,
  timestamp: undefined,
  isTimestamp: false,
})
const nzblnk = ref('nzblnk://')
const generalSettings = ref<Settings>()

// fix for tailwind rem based sizeing
const html = document.querySelector('html')
const fontSize = html ? html.style.fontSize : ''
if (html) html.style.fontSize = '16px'

const shadowRoot = document.querySelector('nzblinker-selection-dialog') as HTMLElement
const shadowRootHead = shadowRoot.shadowRoot?.querySelector('head') as HTMLElement
const shadowRootBody = shadowRoot.shadowRoot?.querySelector('body') as HTMLElement
const datePickerDialog = ref<HTMLElement>()

shadowRootBody.style.display = 'none'

onMessage('analyseTextSelection', (message) => {
  if (message.data.tabId === window.__TAB_ID__) {
    if (generalSettings.value) parameters.value = analyseText(generalSettings.value)
    shadowRootBody.style.display = 'block'
  }
})

onMounted(() => {
  sendMessage('getSettings', true)
    .then(async (settings) => {
      loadStyles()
      addCustomStyleToShadowRoot()
      movePrimeVueStyles()
      generalSettings.value = await settings
      parameters.value = analyseText(generalSettings.value)
      rerenderKey.value++
      await nextTick()
      shadowRootBody.style.display = 'block'
    })
    .catch((e: Error) => {
      console.error('error while sending analyseSelection command from background script', e)
    })
})

watch(
  () => parameters.value,
  () => {
    nzblnk.value = generateNzblnk(parameters.value).toString()
  },
  { deep: true }
)

function loadStyles() {
  // load styles
  const url = browser.runtime.getURL('/assets/style.css' as PublicPath)
  const link = document.createElement('link')
  link.href = url
  link.type = 'text/css'
  link.rel = 'stylesheet'
  shadowRootHead.append(link)
}

function addCustomStyleToShadowRoot() {
  // Create a new <style> element
  const style = document.createElement('style')
  style.textContent = `
    :host {
      --nzblinker-content-border-color: var(--nzblinker-surface-400);
      --nzblinker-content-hover-color: var(--nzblinker-surface-900);
      --nzblinker-highlight-focus-color: var(--nzblinker-primary-500);
      --nzblinker-input-background-color: var(--nzblinker-surface-0);
    }
    @media (prefers-color-scheme: dark) {
      :host {
        --nzblinker-content-border-color: var(--nzblinker-surface-600);
        --nzblinker-content-hover-color: var(--nzblinker-surface-400);
        --nzblinker-highlight-focus-color: var(--nzblinker-primary-400);
        --nzblinker-input-background-color: var(--nzblinker-surface-950);
      }
    }
  `

  // Append the <style> tag to the shadowRoot's <head>
  shadowRootHead.append(style)
}

function movePrimeVueStyles() {
  // fix for primevue mounting styles in document head instead in shadow dom head
  const primeStyles = document.querySelectorAll('head > style[type="text/css"][data-primevue-style-id]')
  primeStyles.forEach((node) => {
    if (
      !node.getAttribute('data-primevue-style-id')?.includes('variables') ||
      node.getAttribute('data-primevue-style-id')?.includes('global')
    ) {
      const clonedNode = node.cloneNode(true) as HTMLStyleElement
      // Replace all "--p" with "--nzblinker" in the clonedNode's text content
      if (clonedNode.textContent) {
        clonedNode.textContent = clonedNode.textContent.replace(/--p/g, '--nzblinker')
      }
      shadowRootHead.append(clonedNode)
      node.remove()
    }
  })
}

function close() {
  shadowRootBody.style.display = 'none'
  if (html) html.style.removeProperty('font-size')
  if (html && fontSize != '') html.style.fontSize = fontSize
  const body = document.querySelector('body')
  if (body) {
    body.classList.remove('p-overflow-hidden')
    body.style.removeProperty('--nzblinker-scrollbar-width')
  }
}

function copyNzblnkToClipboard() {
  nzblnk.value = generateNzblnk(parameters.value).toString()
  navigator.clipboard.writeText(nzblnk.value).catch((err) => {
    console.error('Could not copy text: ', err)
  })
}

function processNzblnk() {
  close()
  nzblnk.value = generateNzblnk(parameters.value).toString()
  window.location.href = nzblnk.value.toString()
}
</script>

<template>
  <Form
    :key="rerenderKey"
    v-slot="$form"
    :validate-on-change="true"
    :validate-on-blur="true"
    :validate-on-value-update="true"
    :validate-on-mount="true"
  >
    <Dialog
      :visible="true"
      :closable="false"
      modal
      :append-to="shadowRootBody"
      header="NZBLinker"
      :style="{
        width: '48rem',
        maxWidth: '48rem',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }"
    >
      <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <NZBLinkerLogo size="32" />
          <span class="font-bold whitespace-nowrap text-lg">{{ i18n.t('extension.name') }}</span>
        </div>
      </template>
      <NZBLinkInputs
        v-model:parameters="parameters"
        v-model:nzblnk="nzblnk"
        :anchor-element="datePickerDialog as HTMLElement"
        :settings="generalSettings as Settings"
      />
      <div class="flex items-center gap-4 mt-4 flex-auto">
        <label for="selection" class="font-semibold min-w-28 max-w-28 w-28 text-right">{{
          i18n.t('common.selection')
        }}</label>
        <Textarea
          id="selection"
          v-model="parameters.selection as string"
          rows="5"
          class="flex-auto"
          style="resize: none; font-size: 0.9rem"
        />
      </div>

      <template #footer>
        <div class="flex justify-between w-full gap-4 testClass">
          <div>
            <Button severity="secondary" class="font-semibold" @click="close()">
              <svg
                viewBox="0 0 1024 1029.185"
                xmlns="http://www.w3.org/2000/svg"
                style="height: 1rem"
                fill="currentColor"
              >
                <path
                  d="M586.932 513.998l312.455-312.455c10.394-9.708 16.875-23.488 16.875-38.79
                  0-29.283-23.737-53.02-53.02-53.02-15.3 0-29.084 6.48-38.76 16.84l-.026.03L512
                  439.058 199.547 126.603c-9.444-8.816-22.16-14.228-36.145-14.228-29.282 0-53.02
                  23.737-53.02 53.02 0 13.985 5.413 26.7 14.262 36.174l-.027-.03L437.07 513.995
                  124.615 826.45c-9.582 9.59-15.504 22.84-15.504 37.468s5.927 27.874 15.505
                  37.47c9.59 9.58 22.84 15.503 37.468 15.503s27.874-5.925 37.47-15.503l312.454-312.455
                  312.455 312.455c9.59 9.582 22.84 15.504 37.468 15.504s27.874-5.925 37.47-15.503c9.58-9.59
                  15.503-22.84 15.503-37.468s-5.926-27.875-15.504-37.47z"
                />
              </svg>
              {{ i18n.t('common.close') }}
            </Button>
          </div>
          <div class="flex justify-end gap-4">
            <Button :disabled="!$form.valid" class="font-semibold" @click="copyNzblnkToClipboard()">
              <svg
                viewBox="0 0 1024 1029.185"
                xmlns="http://www.w3.org/2000/svg"
                style="height: 1rem"
                fill="currentColor"
              >
                <path
                  d="M907.406 303.955L617.02 13.57c-7.12-7.13-16.958-11.543-27.828-11.553H459.49c-79.753 0-144.405
                  64.652-144.405 144.404v65.64h-65.638c-79.752 0-144.404 64.65-144.404 144.403V881.57c0 79.753
                  64.652 144.405 144.404 144.405h367.575c79.752 0 144.404-64.652 144.404-144.404v-65.637h13.128c79.752
                  0 144.404-64.652 144.404-144.404V330.21c-.443-10.296-4.774-19.502-11.552-26.254zM630.15 136.445L784.53
                  290.83H630.15zm52.51 745.128c0 36.25-29.387 65.638-65.638 65.638H249.447c-36.25
                  0-65.638-29.386-65.638-65.637V356.465c0-36.25 29.386-65.638 65.637-65.638h65.638V671.53c0 79.75 64.652
                  144.403 144.404 144.403h223.17zm91.893-144.405H459.49c-36.252 0-65.64-29.387-65.64-65.638V146.422c0-36.25
                  29.388-65.638 65.64-65.638h91.893V330.21c.292 21.632 17.75 39.09 39.355 39.383h249.455V671.53c0
                  36.25-29.387 65.637-65.638 65.637z"
                />
              </svg>
              {{ i18n.t('nzblnk.copyLink') }}
            </Button>
            <Button :disabled="!$form.valid" class="font-semibold" @click="processNzblnk()">
              <svg
                viewBox="0 0 1025.413 1029.185"
                xmlns="http://www.w3.org/2000/svg"
                style="height: 1rem"
                fill="currentColor"
              >
                <path
                  d="M862.106 1024.57H161.893c-88.622 0-160.465-71.844-160.465-160.466V163.89C1.428 75.27 73.27
                  3.427 161.893 3.427H512c24.17 0 43.762 19.594 43.762 43.763S536.168 90.95 512 90.95H161.892c-40.283
                  0-72.938 32.656-72.938 72.938v700.213c0 40.283 32.656 72.938 72.938 72.938h700.213c40.283 0
                  72.938-32.655 72.938-72.937V513.997c0-24.17 19.594-43.763 43.763-43.763s43.763 19.594 43.763
                  43.763v350.106c0 88.622-71.843 160.465-160.465
                  160.465zm116.702-700.213c-24.038-.324-43.44-19.725-43.763-43.732V90.952h-189.64c-24.17
                  0-43.764-19.594-43.764-43.763s19.595-43.764 43.764-43.764H978.81c24.037.324 43.438 19.725 43.762
                  43.732v233.436c-.324 24.038-19.725 43.44-43.732 43.763h-.03zm-379.28
                  145.878c-11.678-.92-21.932-6.354-29.135-14.54l-.04-.048c-6.917-7.706-11.146-17.947-11.146-29.175s4.23-21.47
                  11.18-29.216l-.036.04 379.282-379.28c8.01-8.58 19.39-13.93 32.018-13.93 24.17 0 43.763 19.595 43.763
                  43.764 0 12.628-5.35 24.007-13.903 31.994l-.026.023-382.782 375.78c-7.244 8.233-17.498 13.67-29.026 14.58l-.15.01z"
                />
              </svg>
              {{ i18n.t('nzblnk.executeLink') }}
            </Button>
          </div>
        </div>
      </template>
    </Dialog>
  </Form>
  <span id="date-picker-dialog" ref="datePickerDialog"></span>
</template>
