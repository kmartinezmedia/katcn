| Quick link                                                  | Description                                           |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| [Web Demo](https://katcn.dev/)                              | Web Demo                                              |
| [API](https://api.katcn.dev/)                               | API Server on Railway                                 |
| [Chromatic](TODO)                                           | Storybook component demos & visual regression testing |
| [Bundlemon](TODO)                                           | Bundle size monitoring dashboard                      |
| [Renovate](https://developer.mend.io/github/kmartinezmedia) | Package dependency management dashboard               |

# Install bun

```bash
curl -fsSL https://bun.sh/install | bash
```

# Setup Web
```bash
touch .env.local
```

Update env vars required for web-demo app

```bash
SOCKET_URL=ws://localhost:3001/ws
```

## Run dev

```bash
bun run dev
```

# Setup Mobile

```bash
touch apps/mobile-demo/.env
```

Update env vars

```bash
EXPO_TOKEN=GRAB FROM EXPO ACCOUNT SETTINGS
EXPO_PROJECT_ID=GRAB FROM EXPO PROJECT
```
