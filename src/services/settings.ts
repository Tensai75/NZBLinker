import { getSettings, setSettings, useSettings, watchSettings } from '@/utils/settingsUtilities'

export const name = 'generalSettings'

export const defaultSettings: Settings = {
  processTitle: true,
  processTitleType: 'spaces',
  textSelection: {
    title: [],
    header: [],
    password: [],
    groups: [],
    date: [],
  },
}

export type Settings = {
  processTitle: boolean
  processTitleType: 'spaces' | 'dots'
  textSelection: {
    title: string[]
    header: string[]
    password: string[]
    groups: string[]
    date: string[]
  }
}

export const use = async () => useSettings<Settings>({ name, defaults: defaultSettings })
export const get = async () => getSettings<Settings>({ name, defaults: defaultSettings })
export const set = async (newSettings: Settings) =>
  setSettings<Settings>({ name, defaults: defaultSettings }, newSettings)
export const watch = (callback: (settings: Settings) => void) =>
  watchSettings<Settings>({ name, defaults: defaultSettings }, callback)
