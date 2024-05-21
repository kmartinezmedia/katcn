import { watch as fsWatch } from 'node:fs';
import type { Props } from 'bluebun';
import { $ } from 'bun';
import webfont from 'webfont';

interface BuildProps extends Props {
  options: {
    /** Path of folder with svg files to generate icon font from. */
    input: string;
    /** Where to output the generated icon font */
    outputFonts?: string;
    /** Where to output the generated icon types */
    outputTypes?: string;
    /** Where to output the generated icon names for documentation */
    outputData?: string;
    /** The font name of the generated icon font. */
    fontName?: string;
    /** The format to generate. Use comma separated string for multiple formats
     * @default 'woff2,ttf'
     */
    formats?: string;
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
      outputFonts,
      outputTypes,
      outputData,
      watch,
      fontName = 'icons',
      formats: formatsAsString = 'woff2,ttf',
    } = props.options;

    const formats = formatsAsString.split(',') as Exclude<
      Exclude<Parameters<typeof webfont>[0], undefined>['formats'],
      undefined
    >;

    const inputDir = `${Bun.env.PWD}/${input}`;

    const currentDir = import.meta.dirname;
    await $`svgo --config ${currentDir}/svgo.config.mjs --input ${inputDir} --output ${inputDir}`;

    async function build() {
      const generatedFont = await webfont({
        centerHorizontally: true,
        files: `${inputDir}/*.svg`,
        fontHeight: 4096,
        fontName,
        formats,
        normalize: true,
        /**
         * Make sure generated unicode is inside PUA to avoid fallback emojis on iOS
         * https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html
         * https://github.com/nfroidure/svgicons2svgfont/blob/master/src/metadata.js#L10-L15
         */
        startUnicode: 0xf000, // U+F000
        // metadataProvider: processor,
      }).catch((err: Error) => {
        throw err;
      });

      if (outputFonts) {
        let hasOutputFont = false;
        for (const format of formats) {
          if (generatedFont[format]) {
            const generatedFormat = generatedFont[format];
            if (generatedFormat) {
              const outputFontFile = `${outputFonts}/${fontName}.${format}`;
              await Bun.write(
                `${Bun.env.PWD}/${outputFontFile}`,
                generatedFormat,
              );
              console.log(
                `[icons]: icon font files written to ${outputFontFile}`,
              );
              hasOutputFont = true;
            }
          }
        }

        if (hasOutputFont) {
          const glyphsData = generatedFont.glyphsData ?? [];
          const iconNames = glyphsData.map(
            (item) => `'${item.metadata?.name}'`,
          );
          if (iconNames.length > 0) {
            if (outputTypes) {
              const iconTypes = `export type IconName = ${iconNames.join(
                ' | ',
              )}`;
              await Bun.write(`${Bun.env.PWD}/${outputTypes}`, iconTypes);
              console.log(`[icons]: icon name types written to ${outputTypes}`);
              await $`cli tools format ${outputTypes}`;
            }

            if (outputData) {
              const iconData = `export const iconNames = [${iconNames?.join(
                ',',
              )}] as const;`;
              await Bun.write(`${Bun.env.PWD}/${outputData}`, iconData);
              console.log(`[icons]: icon name data written to ${outputData}`);
              await $`cli tools format ${outputData}`;
            }
          }
        }
      }
    }

    await build();

    if (watch) {
      console.log('[icons]: watching for changes...');
      const watcher = fsWatch(
        inputDir,
        { recursive: true },
        async (event, filename) => {
          console.log(`icons: detected ${event} in ${filename}`);
          await build();
        },
      );

      process.on('SIGINT', () => {
        // close watcher when Ctrl-C is pressed
        console.log('[icons]: closing watcher...');
        watcher.close();
        process.exit(0);
      });
    }
  },
};
