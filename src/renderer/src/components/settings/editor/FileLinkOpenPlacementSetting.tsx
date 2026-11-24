import { GENERAL_SETTING_ANCHORS } from '../general/general-setting-anchors'
import type { GlobalSettings } from '../../../../../shared/settings/global-settings-types'
import {
  normalizeFileLinkOpenPlacement,
  type FileLinkOpenPlacement
} from '../../../../../shared/editor/file-link-open-placement'
import { translate } from '@/i18n/i18n'
import { useTranslate, type Translate } from '@/i18n/use-translate'
import { Label } from '../../ui/label'
import { SearchableSetting } from '../section-layout/SearchableSetting'
import { SettingsSegmentedControl } from '../form-controls/SettingsFormControls'
import { translateSearchKeyword } from '../search/settings-search-keywords'

export function getFileLinkOpenPlacementSearchEntry(t: Translate = translate) {
  return {
    title: t('settings.fileLinkOpenPlacement.title', 'Open file links in'),
    description: t(
      'settings.fileLinkOpenPlacement.description',
      'Where Open file and Cmd/Ctrl-click put a file linked from a chat or terminal. Current group opens it as a tab in the same pane instead of a split.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'settings.fileLinkOpenPlacement.keywordFileLink',
        'file link',
        { aliases: ['split', 'tab', 'group', 'pane'] },
        t
      )
    ]
  }
}

export function FileLinkOpenPlacementSetting({
  settings,
  updateSettings
}: {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}): React.JSX.Element {
  const t = useTranslate()
  const entry = getFileLinkOpenPlacementSearchEntry(t)
  return (
    <SearchableSetting
      id={GENERAL_SETTING_ANCHORS.fileLinkPlacement}
      {...entry}
      className="flex items-center justify-between gap-4 py-3"
    >
      <div className="min-w-0 flex-1 space-y-0.5">
        <Label>{entry.title}</Label>
        <p className="text-xs text-muted-foreground">{entry.description}</p>
      </div>
      <SettingsSegmentedControl<FileLinkOpenPlacement>
        ariaLabel={entry.title}
        value={normalizeFileLinkOpenPlacement(settings.fileLinkOpenPlacement)}
        onChange={(fileLinkOpenPlacement) => updateSettings({ fileLinkOpenPlacement })}
        options={[
          {
            value: 'beside-source',
            label: t('settings.fileLinkOpenPlacement.besideSource', 'Beside source')
          },
          {
            value: 'source-group',
            label: t('settings.fileLinkOpenPlacement.sourceGroup', 'Current group')
          }
        ]}
      />
    </SearchableSetting>
  )
}
