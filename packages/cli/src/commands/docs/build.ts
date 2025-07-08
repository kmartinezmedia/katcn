import { watch as fsWatch } from 'node:fs';
import path from 'node:path';
import type { Props } from 'bluebun';
import { Project } from 'ts-morph';

interface BuildProps extends Props {
  options: {
    /** Path of package to use for parsing types.
     */
    input: string;
    /** Where to output docgen data
     * @default '.docgen'
     */
    output?: string;
    /** Whether to watch source files for changes */
    watch?: boolean;
  };
}

export default {
  name: 'build',
  description: '🚀 Build',
  run: async (props: BuildProps) => {
    const {
      input,
      output = `${Bun.env.PWD}/.docgen`,
      watch: _watch,
    } = props.options;

    // Copy docgen types to consuming app
    const localTypes = await Bun.file(
      `${import.meta.dirname}/_docgen/types.ts`,
    ).text();

    await Bun.write(`${output}/types.ts`, localTypes);

    const pkgJsonPath = require.resolve(`${input}/package.json`);
    const pkgDir = path.dirname(pkgJsonPath);
    const tsConfigFilePath = path.resolve(pkgDir, 'tsconfig.json');

    let _sourceFiles = [];

    const build = async () => {
      console.log('docgen: building...');
      const project = new Project({
        tsConfigFilePath,
      });
      _sourceFiles = project.getSourceFiles([`${pkgDir}/**/*.tsx`]);
      await Bun.write(
        `${output}/data.ts`,
        `import { DocgenSource, DocgenSourceList } from './types';

export const data = {
  name: 'Components',
  description: 'Components are the building blocks of the design system.',
  _data: new Map<string, DocgenSource>([
    [
      'avatar',
      {
        examples: [''],
        description: 'An graphical representation of a user or entity.',
        name: 'Avatar',
        slug: 'avatar',
        properties: [
          {
            name: 'src',
            description: 'The source of the image.',
            value: { type: 'string', value: 'string' },
          },
        ],
      },
    ],
  ]),
  get sources() {
    return [...this._data.values()];
  },
  get(val: string) {
    return this._data.get(val);
  },
} satisfies DocgenSourceList;`,
      );
      // console.log(sourceFiles);
    };

    await build();

    if (props.options.watch) {
      console.log('docgen: watching for changes...');
      const watcher = fsWatch(
        input,
        { recursive: true },
        async (event, filename) => {
          console.log(`docgen: detected ${event} in ${filename}`);
          await build();
        },
      );

      process.on('SIGINT', () => {
        // close watcher when Ctrl-C is pressed
        console.log('docgen: closing watcher...');
        watcher.close();
        process.exit(0);
      });
    }
  },
};
