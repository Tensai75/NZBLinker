<script lang="ts" setup>
import { Button } from 'primevue'

import { i18n } from '#i18n'
import { browser } from '#imports'
import { openPopupWindow } from '@/utils/popupWindowUtilities'

const openSettings = () => {
  browser.runtime.openOptionsPage()
  window.close()
}

const openNzblnkDialog = async () => {
  await openPopupWindow('nzblnkdialog.html')
  window.close()
}
</script>

<template>
  <div class="flex flex-col w-full m-4 gap-y-4" style="width: 250px">
    <Button
      :label="i18n.t('common.openSettings')"
      icon="pi pi-cog"
      severity="secondary"
      class="w-full"
      @click="openSettings()"
    ></Button>

    <Button class="font-semibold w-full" @click="openNzblnkDialog()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        class="ml-2"
        style="height: 1rem"
        fill="currentColor"
      >
        <path
          d="m72.923 54.906l-41.175-41.184-13.731-13.722v110.16l37.06-37.066 54.903
          54.906v-36.034l-37.06-37.06zm7.45-7.4595 29.61 44.52v-74.13z"
        />
      </svg>
      {{ i18n.t('nzblnk.generateLink') }}
    </Button>
  </div>
</template>
