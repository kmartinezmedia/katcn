import path from 'node:path';

const tailwindPaths = {
  index: require.resolve('tailwindcss/index.css'),
  preflight: require.resolve('tailwindcss/preflight.css'),
  theme: require.resolve('tailwindcss/theme.css'),
  utilities: require.resolve('tailwindcss/utilities.css'),
};
export async function getTailwindCss() {
  console.log('tailwindPaths', tailwindPaths);
  return {
    index: await Bun.file(tailwindPaths.index).text(),
    preflight: await Bun.file(tailwindPaths.preflight).text(),
    theme: await Bun.file(tailwindPaths.theme).text(),
    utilities: await Bun.file(tailwindPaths.utilities).text(),
  };
}

const katcnDir = path.resolve(__dirname, '../');
const katcnDistDir = path.resolve(katcnDir, 'dist');
const tailwindCss = await getTailwindCss();

await Bun.write(
  `${katcnDistDir}/tailwindCss.json`,
  JSON.stringify(tailwindCss),
);
