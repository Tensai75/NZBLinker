<script setup lang="ts">
import { version } from '@@/package.json'
import { ref } from 'vue'

import { i18n } from '#i18n'
import NZBLinkerLogo from '@/components/nzblinkerLogo.vue'
import ChangelogPage from '@/components/pages/changelogPage.vue'
import CreditsPage from '@/components/pages/creditsPage.vue'
import LicensePage from '@/components/pages/licensePage.vue'
import PrivacypolicyPage from '@/components/pages/privacypolicyPage.vue'
import SettingsPage from '@/components/settingsPage.vue'

type Settings = 'general'

const settings: { id: Settings; name: string }[] = [{ id: 'general', name: i18n.t('menu.settings.general') }]

const about: { id: string; name: string }[] = [
  { id: 'license', name: i18n.t('menu.license') },
  { id: 'changelog', name: i18n.t('menu.changelog') },
  { id: 'credits', name: i18n.t('menu.credits') },
  { id: 'privacypolicy', name: i18n.t('menu.privacyPolicy') },
]

const menuItem = ref('general')
</script>

<template>
  <div class="flex flex-row w-full h-screen">
    <!-- Left Column -->
    <div class="flex flex-col max-w-[320px] w-full mr-8">
      <!-- Top Left -->
      <div class="w-[320px] h-[100px] p-4 pr-0 flex justify-end border-2 border-transparent border-b-primary-500">
        <NZBLinkerLogo color="#004B1E" size="48" />
      </div>
      <!-- Middle Left (Scrollable) -->
      <div class="h-full p-4 pr-0 flex flex-col text-right overflow-y-auto scroll-left">
        <h1 class="secondary">{{ i18n.t('menu.settings.title') }}</h1>
        <div
          v-for="setting in settings"
          :key="setting.id"
          :class="
            'w-[80%] mt-2 p-2 pr-0 text-base border-2 border-transparent hover:border-b-primary-500 cursor-pointer' +
            (menuItem === setting.id ? ' border-b-primary-500' : '')
          "
          @click="menuItem = setting.id"
        >
          {{ setting.name }}
        </div>
        <h1 class="secondary mt-16">{{ i18n.t('menu.about') }}</h1>
        <div
          v-for="item in about"
          :key="item.id"
          :class="
            'w-[80%] mt-2 p-2 pr-0 text-base border-2 border-transparent hover:border-b-primary-500 cursor-pointer' +
            (menuItem === item.id ? ' border-b-primary-500' : '')
          "
          @click="menuItem = item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- Bottom Left -->
      <div class="w-[320px] h-16 p-4 pr-0 text-right">{{ i18n.t('extension.name') }} v{{ version }}</div>
    </div>

    <!-- Right Column -->
    <div class="flex flex-col flex-1 w-full ml-8">
      <!-- Top Right -->
      <div class="w-full h-[100px] p-4 pl-0 content-end border-2 border-transparent border-b-primary-500">
        <span v-if="settings.find((item) => item.id === menuItem)" class="text-3xl">{{
          i18n.t('menu.settings.title')
        }}</span>
        <span v-if="menuItem === 'license'" class="text-3xl">{{ i18n.t('menu.license') }}</span>
        <span v-if="menuItem === 'changelog'" class="text-3xl">{{ i18n.t('menu.changelog') }}</span>
        <span v-if="menuItem === 'credits'" class="text-3xl">{{ i18n.t('menu.credits') }}</span>
        <span v-if="menuItem === 'privacypolicy'" class="text-3xl">{{ i18n.t('menu.privacyPolicy') }}</span>
      </div>
      <!-- Middle Right (Scrollable) -->
      <div class="h-full p-4 pl-0 overflow-y-auto">
        <Suspense v-if="menuItem === 'general'"><SettingsPage /></Suspense>
        <Suspense v-if="menuItem === 'license'"><LicensePage /></Suspense>
        <Suspense v-if="menuItem === 'changelog'"><ChangelogPage /></Suspense>
        <template v-if="menuItem === 'credits'"><CreditsPage /></template>
        <Suspense v-if="menuItem === 'privacypolicy'"><PrivacypolicyPage /> </Suspense>
      </div>
      <!-- Bottom Right -->
      <div class="h-16 p-4 pl-0 w-full">Copyright &copy; {{ new Date().getFullYear() }} by Tensai</div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.scroll-left {
  direction: rtl; /* This moves the scrollbar to the left */
}
.scroll-left > * {
  direction: ltr; /* Ensures content is still left-to-right */
}
</style>
