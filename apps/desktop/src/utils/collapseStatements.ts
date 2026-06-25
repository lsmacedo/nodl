import { parse } from '@babel/parser'
import escodegen from 'escodegen'
import { PARSER_OPTIONS } from '../../shared/ast';

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
    const ast = parse(source, PARSER_OPTIONS);

    const outputLines = [];
    const lineMap = [];

    for (const node of ast.program.body) {
      const flat = escodegen
        .generate(node, { format: { compact: false } })
        .replace(/\n/g, ' ');

      outputLines.push(flat);
      lineMap[outputLines.length] = node.loc?.start.line;
    }

    return { code: outputLines.join('\n'), lineMap };
  } catch (err) {
    console.error(err)
    return { code: source, lineMap: [] }
  }
}
