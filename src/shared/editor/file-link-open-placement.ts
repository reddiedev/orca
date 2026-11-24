/** Where Open file and Cmd/Ctrl-click put a linked file: beside its source pane, or as a tab in its group. */
export type FileLinkOpenPlacement = 'beside-source' | 'source-group'

export type FileLinkOpenPlacementSettings = {
  /** Chat and terminal file links; absent = beside source. */
  fileLinkOpenPlacement?: FileLinkOpenPlacement
}

export function normalizeFileLinkOpenPlacement(value: unknown): FileLinkOpenPlacement {
  return value === 'source-group' ? value : 'beside-source'
}
