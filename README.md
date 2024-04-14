| Quick link                                                  | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| [Web Demo](https://katcn.dev/)                              | Web Demo                                                    |
| [API](https://api.katcn.dev/)                               | API Server on Railway                                       |
| [Renovate](https://developer.mend.io/github/kmartinezmedia) | Package dependency management dashboard                     |
| [Chromatic](TODO)                                           | TODO: Storybook component demos & visual regression testing |
| [Bundlemon](TODO)                                           | TODO: Bundle size monitoring dashboard                      |

# Features

|            | props | configurable | dynamic values | arbitrary values | modes |
| ---------- | ----- | ------------ | -------------- | ---------------- | ----- |
| colors     | ✅     | ✅            | ✅              | ✅                | 🏗️     |
| states     | 🏗️     | 🏗️            | 🏗️              | 🏗️                | 🏗️     |
| elevation  | 🏗️     | 🏗️            | 🏗️              | 🏗️                | 🏗️     |
| typography | ✅     | ✅            | ✅              | 🏗️                | 🏗️     |
| layout     | ✅     | ✅            | ✅              | 🏗️                | 🏗️     |
| border     | ✅     | ✅            | ✅              | 🏗️                | 🏗️     |
| spacing    | ✅     | ✅            | ✅              | 🏗️                | 🏗️     |
| sizing     | ✅     | 🏗️            | ✅              | ✅                | 🏗️     |

# Decisions
- No build tooling integrations needed bc no one wants to do that. it never works. hard to keep up with ecosystem.
- CLI + package.json imports buildtime stylesheet.
- Typescript, typescript, typescript.
- Bun first.
- ESM only.
- Tailwind inspired. Carry over the good parts, but with prop driven angle.
- Don't add complex components. Show recipes. Make it easy to pull in examples, shadcn style.

# Inspiration
- [shadcn](https://ui.shadcn.com/)
- [frogui](https://frog.fm/ui)
- [open-props](https://open-props.style/)
- [mastercss](https://css.master.co/#experience)

# Prop driven system, zero runtime + purged css output

## Build time stylesheets
The output stylesheet should only include utility classnames which are used based on source code.

> [!TIP]
> This command should be run at the root of your workspace, where your tsconfig.json lives.

```bash
katcn css --outFile ./styles.css
```

## CSS variables

Should treeshake to include only the CSS variables used based on utility classnames present. For example,
the following given the following snippet:

```tsx
import { VStack } from 'katcn';

<VStack backgroundColor="accent" />
```

Should output the following (excluding CSS reset for brevity):

```css styles.css
layer theme {
  :where(html) {
    --katcn-hue-blue: 261;
    --katcn-hue-lightness-9: 49%;
    --katcn-hue-chroma-9: 0.19;
    --katcn-color-blue-9: oklch(var(--katcn-hue-lightness-9) var(--katcn-hue-chroma-9) var(--katcn-hue-blue));
    --katcn-palette-core-accent: var(--katcn-color-blue-9);
  }
}

@layer utilities {
  .backgroundColor-accent {
    background-color: var(--katcn-palette-core-accent);
  }
  .display-flex {
    display: flex;
  }
  .flexDirection-vertical {
    flex-direction: column;
  }
}
```


## Conditional expressions

Should treeshake output to include `backgroundColor-accent` and `backgroundColor-secondary` classnames.

```tsx
import { VStack } from 'katcn';

function Example({active}: {active: boolean}) {
  const backgroundColor = active ? 'accent' : 'secondary';
  return (
    <VStack backgroundColor={backgroundColor} style={{ width: 120, height: 120 }} />
  )
}
```

```css
@layer theme {
  :where(html) {
    --katcn-hue-blue: 261;
    --katcn-hue-lightness-9: 49%;
    --katcn-hue-chroma-9: 0.19;
    --katcn-color-blue-9: oklch(var(--katcn-hue-lightness-9) var(--katcn-hue-chroma-9) var(--katcn-hue-blue));
    --katcn-color-gray-2: lab(86.0704% -2.10407 -6.31995);
    --katcn-palette-core-accent: var(--katcn-color-blue-9);
    --katcn-palette-background-secondary: var(--katcn-color-gray-2);
  }
}
@layer utilities {
  .backgroundColor-accent {
    background-color: var(--katcn-palette-core-accent);
  }
  .backgroundColor-secondary {
    background-color: var(--katcn-palette-background-secondary);
  }
  .flexDirection-vertical {
    flex-direction: column;
  }
  .display-flex {
    display: flex;
  }
}
```


## Dynamic values

Should treeshake stylesheet output to include `backgroundColor-accent`, `width-1/3`, `width-1/2` and `width-1/3` classnames.

```tsx
import { VStack } from 'katcn';

function Example({column}: {column: 1 | 2 | 3}) {
  const width = `${column}/3` as const;
  return (
    <VStack backgroundColor="accent" width={width} style={{ height: 120 }} />
  )
}
```

```css
@layer theme {
  :where(html) {
    --katcn-hue-blue: 261;
    --katcn-hue-lightness-9: 49%;
    --katcn-hue-chroma-9: 0.19;
    --katcn-color-blue-9: oklch(var(--katcn-hue-lightness-9) var(--katcn-hue-chroma-9) var(--katcn-hue-blue));
    --katcn-palette-core-accent: var(--katcn-color-blue-9);
  }
}
@layer utilities {
  .backgroundColor-accent {
    background-color: var(--katcn-palette-core-accent);
  }
  .flexDirection-vertical {
    flex-direction: column;
  }
  .width-1\/3 {
    width: 33.33%;
  }
  .width-2\/3 {
    width: 66.67%;
  }
  .width-3\/3 {
    width: 100%;
  }
  .display-flex {
    display: flex;
  }
}
```

## Arbitrary values

Should treeshake stylesheet output to include `backgroundColor-accent`, `height-[120px]` and `width-[120px]` classnames.

```tsx
import { VStack } from 'katcn';

function Example() {
  return (
    <VStack backgroundColor="accent" height={120} width={120} />
  )
}
```


# Install bun

```bash
curl -fsSL https://bun.sh/install | bash
```

```bash
bun install
```

<!-- ----------------------------------------------------------------------- -->
<!--            TODO: Add CLI script for scaffolding out env vars            -->
<!-- ----------------------------------------------------------------------- -->

# Setup Web
```bash
touch apps/web-demo/.env
```

Update env vars required for web-demo live playground

```bash
NEXT_SOCKET_URL=ws://localhost:3001/ws
```

# Setup Websocket Server

```bash
touch apps/server/.env
```

Update env vars for server

```bash
SERVER_PORT=3001
```


## Run dev

```bash
bun run dev
```

# Setup Mobile

TODO: This might be outdated.

```bash
touch apps/mobile-demo/.env
```

Update env vars

```bash
EXPO_TOKEN=GRAB FROM EXPO ACCOUNT SETTINGS
EXPO_PROJECT_ID=GRAB FROM EXPO PROJECT
```

# TODOS
- [ ] token only usage
- [ ] system
  - [ ] states
  - [ ] elevation
- [ ] assets
  - [x] icons
  - [ ] illustrations
- [ ] education
  - [x] live playground
    - [ ] offer editor setup as consumable package. like react-live
  - [ ] palette generator
    - [ ] lightness, chroma, hue configuration
  - [ ] docgen CLI for API doc generation. is consumable for anyone to use for their own docs
  - [ ] sample project
- [ ] codemods
  - [ ] tailwind codemod for migration
- [ ] purger
  - [ ] only include icons used
  - [ ] vars with same value should be consolidated to single var to reduce css size (i.e. font size for body1 and headline1)
- [ ] configuration
  - [ ] createSystem function / type safety for components
  - [ ] configurable icon set and types
  - [ ] purger still works
- [ ] modes
  - [ ] dark mode
  - [ ] hight contrast mode
  - [ ] scale mode
- [ ] flexiblity
  - [x] arbitrary values
  - [x] dynamic values
  - [ ] group selectors?
- [ ] motion
  - [ ] motion tokens
  - [ ] framer motion integration
- [ ] figma
  - [ ] plugin
  - [ ] create system from config
  - [ ] dev mode snippets
- [ ] react native


# Palette Generator
- https://developer.chrome.com/blog/css-relative-color-syntax
- https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide#checking_for_gamut_and_color_space_support
- https://nikhgupta.com/tools/palette-generator
- https://alivault.github.io/color-palette-maker/
- Distnace between hues (i.e. 30). palette size (how many colors 360/number of hues)
- min and max chroma based on lightness and hue