import * as acorn from 'acorn'
import escodegen from 'escodegen'

export type LineMap = (number | undefined)[];

/**
  * Takes each top-level statement and flattens to a single line.
  * This allows multi-line evaluation results to be displayed without the need
  * for console.log
  */
export function collapseStatements(source: string): {
  code: string;
  lineMap: LineMap;
} {
  try {
    const ast = acorn.parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      locations: true,
    });

    const outputLines = [];
    const lineMap = [];

    for (const node of ast.body) {
      const flat = escodegen
        .generate(node, { format: { compact: false } })
        .replace(/\n/g, ' ');

      outputLines.push(flat);
      lineMap[outputLines.length] = node.loc?.start.line;
    }

    return { code: outputLines.join('\n'), lineMap };
  } catch (err) {
    return { code: source, lineMap: [] }
  }
}
