import { Browser, browser, defineBackground, i18n } from '#imports'
import { get as getSettings } from '@/services/settings'
import { onMessage, sendMessage } from '@/utils/extensionMessengerUtilities'

// Extend the Window interface to include the custom property
declare global {
  interface Window {
    __NZBLINKER_SELECTION_SCRIPT_INJECTED__?: boolean
    __TAB_ID__?: number
  }
}

const CONTEXT_MENU_ID: string = 'NZBLINKER_Selection'
const selectionScriptSource: string = '/content-scripts/selection.js'

export default defineBackground(() => {
  registerContextMenu()
  browser.contextMenus.onClicked.addListener(contextMenuListener)
  onMessage('getSettings', async () => {
    const settings = await getSettings()
    return settings
  })
})

async function registerContextMenu(): Promise<void> {
  // create selection context menu
  console.info('registering the select context menu')
  try {
    await browser.contextMenus.remove(CONTEXT_MENU_ID)
  } catch {
    // void error when removing the context menu if it does not exist
  }
  browser.contextMenus.create(
    {
      title: i18n.t('contextMenu.analyseSelection'),
      contexts: ['selection'],
      id: CONTEXT_MENU_ID,
    },
    () => {
      console.info('registering of the select context menu successfull')
    }
  )
}

async function contextMenuListener(info: Browser.contextMenus.OnClickData, tab?: Browser.tabs.Tab): Promise<void> {
  if (info.menuItemId === CONTEXT_MENU_ID && tab?.id) {
    try {
      // Check if the script is already injected
      const [result] = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => !!window.__NZBLINKER_SELECTION_SCRIPT_INJECTED__,
      })
      // If the script is not injected, inject it
      if (!result?.result) {
        // Set a marker to indicate the script is injected
        await browser.scripting.executeScript({
          target: { tabId: tab.id },
          func: (tabId: number): void => {
            window.__NZBLINKER_SELECTION_SCRIPT_INJECTED__ = true
            window.__TAB_ID__ = tabId
          },
          args: [tab.id],
        })
        // Inject the script
        await browser.scripting.executeScript({
          target: { tabId: tab.id },
          files: [selectionScriptSource],
        })
        console.info(`Selection script injected successfully into tab ${tab.id}.`)
      } else {
        sendMessage('analyseTextSelection', { tabId: tab.id }, tab.id)
        console.info(`Selection script already injected into tab ${tab.id}.`)
      }
    } catch (e) {
      const error = e instanceof Error ? e : new Error('unknown error')
      console.error(`Error injecting selection script into tab ${tab.id}:`, error)
    }
  }
}
