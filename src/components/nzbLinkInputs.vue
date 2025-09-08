<script lang="ts" setup>
import { FormField } from '@primevue/forms'
import { DatePicker, InputNumber, InputText, Message, SelectButton } from 'primevue'
import { onMounted, ref, watch } from 'vue'

import { i18n } from '#i18n'
import TagInput from '@/components/inputs/tagInput.vue'
import { Settings } from '@/services/settings'
import { NzblnkData } from '@/utils/nzblnkUtilities'
import { requiredResolver } from '@/utils/resolversUtilities'

interface Props {
  anchorElement: HTMLElement
  settings?: Settings
}

// Define named models for v-model:parameters and v-model:nzblnk
const parameters = defineModel<NzblnkData & { selection: string }>('parameters', { required: true })
const nzblnk = defineModel<string>('nzblnk', { required: true })

const props = defineProps<Props>()
const datePickerDialog = ref(props.anchorElement)

const isTimestampOptions = [
  { value: false, text: i18n.t('selectionDialog.asDate') },
  { value: true, text: i18n.t('selectionDialog.asTimestamp') },
]
const minTimestamp = Math.floor(new Date('01.01.2005').getTime() / 1000)
const maxTimestamp = Math.floor(Date.now() / 1000)

onMounted(() => {
  // Ensure title is processed on mount
  updateTitle(parameters.value.title)
  // Ensure groups are in correct format on mount
  updateGroups(parameters.value.groups)
  // Ensure date and timestamp are synchronized on mount
  updateDate(parameters.value.timestamp)
  updateTimestamp(parameters.value.date)
})

watch(
  () => parameters.value.timestamp,
  (newValue) => (newValue ? updateDate(newValue) : null)
)

watch(
  () => parameters.value.date,
  (newValue) => (newValue ? updateTimestamp(newValue) : null)
)

watch(
  () => parameters.value.title,
  (newValue) => (newValue ? updateTitle(newValue) : null)
)

watch(
  () => parameters.value.groups,
  (newValue) => (newValue.length > 0 ? updateGroups(newValue) : null),
  { deep: true }
)

function updateTitle(newValue: string | undefined) {
  if (newValue === undefined) return
  let newTitle
  if (props.settings && newValue !== '') {
    if (props.settings.processTitleType === 'spaces') {
      newTitle = newValue.replaceAll('.', ' ')
    } else {
      newTitle = newValue.replaceAll(' ', '.')
    }
    if (newTitle !== parameters.value.title) parameters.value.title = newTitle
  }
}

function updateGroups(newValue: string[] | undefined) {
  if (newValue === undefined) return
  newValue.forEach((group, index) => {
    const newGroup = group.replace(/^a\.b\./, 'alt.binaries.').toLowerCase()
    if (newGroup !== parameters.value.groups[index]) parameters.value.groups[index] = newGroup
  })
}

function updateDate(newValue: number | undefined) {
  if (newValue === undefined) return
  const newDate = newValue ? new Date(newValue * 1000) : undefined
  if (newDate !== parameters.value.date) parameters.value.date = newDate
}

function updateTimestamp(newValue: Date | undefined) {
  if (newValue === undefined) return
  const newTimestamp = newValue ? Math.floor(newValue.getTime() / 1000) : undefined
  if (newTimestamp !== parameters.value.timestamp) parameters.value.timestamp = newTimestamp
}
</script>
<template>
  <div class="flex flex-row items-center gap-4 flex-auto">
    <label for="header" class="font-semibold min-w-28 max-w-28 w-28 text-right">{{ i18n.t('common.header') }}</label>
    <FormField
      v-slot="$field"
      :name="i18n.t('common.header')"
      :initial-value="parameters.header"
      :resolver="requiredResolver"
      class="grid-row flex-auto"
    >
      <InputText id="header" v-model="parameters.header" class="w-full" size="small" autocomplete="off" type="text" />
      <Message v-if="$field?.invalid" severity="error" size="small" variant="simple" class="flex-auto">
        {{ $field.error?.message }}
      </Message>
    </FormField>
  </div>
  <div class="flex flex-row items-center gap-4 mt-4 flex-auto">
    <label for="title" class="font-semibold min-w-28 max-w-28 w-28 text-right">{{ i18n.t('common.title') }}</label>
    <InputText id="title" v-model="parameters.title" class="flex-auto" size="small" autocomplete="off" />
  </div>
  <div class="flex flex-row items-center gap-4 mt-4 flex-auto">
    <label for="password" class="font-semibold min-w-28 max-w-28 w-28 text-right">
      {{ i18n.t('common.password') }}
    </label>
    <InputText id="password" v-model="parameters.password" class="flex-auto" size="small" type="text" />
  </div>
  <div class="flex flex-row items-center gap-4 mt-4 flex-auto">
    <label for="password" class="font-semibold min-w-28 max-w-28 w-28 text-right">
      {{ i18n.t('common.groups') }}
    </label>
    <TagInput
      v-model="parameters.groups"
      :placeholder="i18n.t('selectionDialog.enterNewsgroup')"
      tag-bg-color="var(--p-primary-400)"
      tag-text-color="var(--p-primary-contrast-color)"
    />
  </div>
  <div class="flex flex-row items-center gap-4 mt-4 flex-auto">
    <label for="date" class="font-semibold min-w-28 max-w-28 w-28 text-right">
      {{ i18n.t('common.date') }}
    </label>
    <InputNumber
      v-if="parameters.isTimestamp"
      v-model="parameters.timestamp"
      :use-grouping="false"
      :min="minTimestamp"
      :max="maxTimestamp"
      size="small"
    />
    <DatePicker
      v-if="!parameters.isTimestamp"
      v-model="parameters.date"
      class=""
      size="small"
      date-format="dd.mm.yy"
      :min-date="new Date('01.01.2005')"
      :max-date="new Date()"
      :append-to="datePickerDialog"
    />
    <SelectButton
      v-model="parameters.isTimestamp"
      :options="isTimestampOptions"
      option-label="text"
      option-value="value"
      size="small"
    >
      <template #option="slotProps">
        {{ slotProps.option.text }}
      </template>
    </SelectButton>
  </div>
  <div class="flex flex-row items-center gap-4 mt-4 flex-auto">
    <label for="password" class="font-semibold min-w-28 max-w-28 w-28 text-right">{{ i18n.t('nzblnk.title') }}</label>
    <InputText id="nzblnk" :value="nzblnk" class="flex-auto" size="small" type="text" readonly :disabled="true" />
  </div>
</template>
