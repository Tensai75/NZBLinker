<script setup lang="ts">
import { Fieldset, Select, ToggleSwitch } from 'primevue'
import { Ref } from 'vue'

import { i18n } from '#i18n'
import TagInput from '@/components/inputs/tagInput.vue'
import { Settings as GeneralSettings, use as useGeneralSettings } from '@/services/settings'

const settings: Ref<GeneralSettings> = await useGeneralSettings()
const processTitleValues = ['spaces', 'dots']
const processTitleNames = {
  dots: i18n.t('settings.processing.processTitle.spaces') + ' [Test Title Parameter -> Test.Title.Parameter]',
  spaces: i18n.t('settings.processing.processTitle.dots') + ' [Test.Title.Parameter -> Test Title Parameter]',
}
</script>

<template>
  <div class="mb-4">
    <Fieldset :legend="i18n.t('menu.settings.nzbFile')">
      <div class="flex items-center mb-4">
        <ToggleSwitch v-model="settings.processTitle" />
        <label class="label-text pl-4">
          {{ i18n.t('settings.processing.processTitle.description') }}
        </label>
      </div>
      <div v-if="settings.processTitle" class="flex items-center mb-4">
        <Select
          v-model="settings.processTitleType"
          :options="processTitleValues"
          option-label="name"
          class="w-full md:w-100 max-w-full md:max-w-min m-0 p-0"
        >
          <template #value="slotProps">
            <div v-if="processTitleValues.includes(slotProps.value)" class="flex items-center">
              <div>
                {{ processTitleNames[slotProps.value as keyof typeof processTitleNames] }}
              </div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>
                {{ processTitleNames[slotProps.option as keyof typeof processTitleNames] }}
              </div>
            </div>
          </template>
        </Select>
      </div>
    </Fieldset>
  </div>
  <div class="mb-4 w-full">
    <Fieldset :legend="i18n.t('settings.general.selectText.searchKeyTitel')" class="flex align-middle">
      <div class="flex-auto w-full">
        <div class="flex items-center taginput w-full">
          <label class="label-text font-bold mr-4 min-w-20 max-w-20 w-20">
            {{ i18n.t('common.title') }}
          </label>
          <TagInput
            v-model="settings.textSelection.title"
            :placeholder="i18n.t('settings.general.selectText.enterSearchKey')"
            tag-bg-color="var(--p-primary-500)"
            tag-text-color="var(--p-surface-100)"
          />
        </div>
        <div class="flex items-center taginput">
          <label class="label-text font-bold mr-4 min-w-20 max-w-20 w-20">
            {{ i18n.t('common.header') }}
          </label>
          <TagInput
            v-model="settings.textSelection.header"
            :placeholder="i18n.t('settings.general.selectText.enterSearchKey')"
            tag-bg-color="var(--p-primary-500)"
            tag-text-color="var(--p-surface-100)"
          />
        </div>
        <div class="flex items-center taginput">
          <label class="label-text font-bold mr-4 min-w-20 max-w-20 w-20">
            {{ i18n.t('common.password') }}
          </label>
          <TagInput
            v-model="settings.textSelection.password"
            :placeholder="i18n.t('settings.general.selectText.enterSearchKey')"
            tag-bg-color="var(--p-primary-500)"
            tag-text-color="var(--p-surface-100)"
          />
        </div>
        <div class="flex items-center taginput">
          <label class="label-text font-bold mr-4 min-w-20 max-w-20 w-20">
            {{ i18n.t('common.groups') }}
          </label>
          <TagInput
            v-model="settings.textSelection.groups"
            :placeholder="i18n.t('settings.general.selectText.enterSearchKey')"
            tag-bg-color="var(--p-primary-500)"
            tag-text-color="var(--p-surface-100)"
          />
        </div>
        <div class="flex items-center taginput flex-auto">
          <label class="label-text font-bold mr-4 min-w-20 max-w-20 w-20">
            {{ i18n.t('common.date') }}
          </label>
          <TagInput
            v-model="settings.textSelection.date"
            :placeholder="i18n.t('settings.general.selectText.enterSearchKey')"
            tag-bg-color="var(--p-primary-500)"
            tag-text-color="var(--p-surface-100)"
            class="w-full"
          />
        </div>
      </div>
    </Fieldset>
  </div>
</template>
