<script lang="ts" setup>
import { Form } from '@primevue/forms'
import { Button, ProgressSpinner } from 'primevue'
import { nextTick, onMounted, ref, watch } from 'vue'

import { i18n } from '#i18n'
import NZBLinkerLogo from '@/components/nzblinkerLogo.vue'
import NZBLinkInputs from '@/components/nzbLinkInputs.vue'
import { generateNzblnk, NzblnkData } from '@/utils/nzblnkUtilities'
import { resizePopupWindow } from '@/utils/popupWindowUtilities'

const overlay = ref(true)
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
const nzblnk = ref('')
const datePickerDialog = ref<HTMLElement>()

document.title = i18n.t('extension.name')

onMounted(() => {
  nextTick(async () => {
    nzblnk.value = generateNzblnk(parameters.value).toString()
    await resizePopupWindow(800, 540)
    overlay.value = false
  })
})

watch(
  () => parameters.value,
  () => {
    nzblnk.value = generateNzblnk(parameters.value).toString()
  },
  { deep: true }
)

const close = () => {
  window.close()
}

const copyNzblnkToClipboard = () => {
  nzblnk.value = generateNzblnk(parameters.value).toString()
  navigator.clipboard.writeText(nzblnk.value).catch((err) => {
    console.error('Could not copy text: ', err)
  })
}

const processNzblnk = () => {
  close()
  nzblnk.value = generateNzblnk(parameters.value).toString()
  window.open(nzblnk.value.toString())
}
</script>

<template>
  <div v-if="overlay" class="overlay">
    <ProgressSpinner style="width: 60px; height: 60px" stroke-width="3" />
  </div>
  <Form
    v-slot="$form"
    :validate-on-change="true"
    :validate-on-blur="true"
    :validate-on-value-update="true"
    :validate-on-mount="true"
  >
    <div id="container">
      <!-- Header -->
      <header id="header" class="p-4">
        <div class="flex flex-row justify-between w-full">
          <div class="inline-flex items-center justify-start gap-2 w-full">
            <NZBLinkerLogo size="32" />
            <span class="font-bold whitespace-nowrap text-lg">{{ i18n.t('extension.name') }}</span>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main id="main" class="px-4">
        <div class="space-y-4 flex flex-col my-6">
          <NZBLinkInputs
            v-model:parameters="parameters"
            v-model:nzblnk="nzblnk"
            :anchor-element="datePickerDialog as HTMLElement"
          />
        </div>
      </main>

      <!-- Footer -->
      <footer id="footer" class="p-4">
        <div class="flex flex-row justify-between w-full">
          <div class="flex justify-start gap-4">
            <Button :label="i18n.t('common.close')" icon="pi pi-times" severity="secondary" @click="close()"></Button>
          </div>
          <div class="flex justify-end gap-4">
            <Button
              :label="i18n.t('nzblnk.copyLink')"
              icon="pi pi-copy"
              :disabled="!$form.valid"
              @click="copyNzblnkToClipboard()"
            ></Button>

            <Button
              :label="i18n.t('nzblnk.executeLink')"
              icon="pi pi-external-link"
              :disabled="!$form.valid"
              @click="processNzblnk()"
            ></Button>
          </div>
        </div>
      </footer>
    </div>
  </Form>
  <span id="date-picker-dialog" ref="datePickerDialog"></span>
</template>
<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  height: 540px;
  min-height: 540px;
  max-height: 540px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 0px;
}

#header,
#footer {
  flex-shrink: 0;
}

#main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* Solid black background */
  z-index: 1000; /* Ensure it appears above other elements */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
