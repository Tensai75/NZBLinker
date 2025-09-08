import { defineExtensionMessaging, RemoveListenerCallback as RemoveListenerCallbackType } from '@webext-core/messaging'

import { Settings } from '@/services/settings'

interface ProtocolMap {
  analyseTextSelection(data: { tabId: number }): void
  getSettings(data: boolean): Promise<Settings>
}
export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()
export type RemoveListenerCallback = RemoveListenerCallbackType
