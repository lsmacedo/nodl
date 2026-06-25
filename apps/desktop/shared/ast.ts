// -------------------------------------------------------------------
// Babel parser configuration
// -------------------------------------------------------------------

export const PARSER_OPTIONS = {
  sourceType: 'module' as const,
  allowImportExportEverywhere: true, // Permissive: scratchpad code may be unusual
  allowAwaitOutsideFunction: true,   // Top-level await support
  allowReturnOutsideFunction: true,  // Bare return is valid in scratchpad
  errorRecovery: true,               // Partial AST on incomplete/invalid code
  plugins: ['estree', 'typescript', 'jsx'] as ('estree' | 'typescript' | 'jsx')[],
  ranges: true,                      // Provide start/end character offsets
}
