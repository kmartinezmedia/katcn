# Setup

## Download Firebase CLI

```shell
curl -sL https://firebase.tools | bash
```

## Login to Firebase

Use the email you have associated with your Firebase project.

```shell
firebase login
```

## Test functions locally

The command below will launch the firebase emulators for you to locally test endpoints or emulate firestore updates.

```shell
bun run serve
```

## Deploy

Deployments are not tied to CI at the moment. Run the command below to deploy the cloud functions to production.

```shell
bun run deploy
```
