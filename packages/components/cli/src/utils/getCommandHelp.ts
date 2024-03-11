import {
  type CommandTree,
  type Props,
  bold,
  calcWidestCommandName,
  commandTree,
  cyan,
  gray,
  print,
  white,
} from 'bluebun';

/**
 *
 * The formatting from bluebun for the help command is not great.
 * I forked code from https://github.com/jamonholmgren/bluebun/blob/main/src/command-help.ts
 *
 * TODO: Maybe create helpers for better styling control for this & other features
 *
 * Some packages to checkout:
 * - https://github.com/wobsoriano/blipgloss
 * - https://github.com/wobsoriano/bun-promptx
 */
async function formatHelp(initialProps: Props) {
  const { name, commandPath } = initialProps;

  const categoryToFilter = commandPath?.length ? commandPath[0] : undefined;

  const _tree = await commandTree(initialProps);
  const tree = categoryToFilter
    ? { [categoryToFilter]: _tree[categoryToFilter] }
    : _tree;

  const widest = calcWidestCommandName(tree) + 5;

  function generateHelp(cmdTree: CommandTree, prefix: string): string[] {
    return Object.keys(cmdTree).flatMap((key) => {
      const command = cmdTree[key];
      const lines: string[] = [];

      const fullName = `${prefix} ${
        command.name === name ? '' : command.name
      }`.trim();
      lines.push(
        `${cyan(fullName).padEnd(widest)} ${gray(command.description)}`,
      );

      if (command.subcommands) {
        lines.push(...generateHelp(command.subcommands, `${fullName}`));
      }

      return lines;
    });
  }

  const helpLines = generateHelp(tree, name);

  const help = `${bold(white('Commands:'))}

    ${helpLines.join('\n')}
    `;

  return help;
}

export async function getCommandHelp(props: Props) {
  print('');
  const helpText = await formatHelp(props);
  print(helpText);
}
