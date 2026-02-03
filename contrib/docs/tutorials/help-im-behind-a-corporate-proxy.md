# Running the backend behind a Corporate Proxy

This article helps you get your backend installation up and running making calls through corporate proxies.

## Background

Let's admit it, we've all been there. Sometimes you have to run stuff with no way out to the public internet, except via the smallest of corporate proxy tunnels. It's most likely that you're going to run into these issues from the backend part of Backstage as that's the part that isn't helped by your browser or OS settings for the corporate proxy.

Unfortunately, the Node.js native `fetch` does not respect `HTTP(S)_PROXY` environment variables by default.

There are however some ways to get this to work without too much effort.

## Installation

**Note:** You're going to want to be in your backend working directory for these solutions as that's where the requests come from that don't go through this proxy.

1. Install the required package in your backend, by running the following command inside your backend directory (typically `packages/backend` under your repository root).

   ```bash
   yarn add undici
   ```

   `undici` exposes the settings for native `fetch`.

1. Go to the entry file for the backend (typically `packages/backend/src/index.ts`), and add the following at the VERY top, before all other imports etc:

   ```ts
   import { setGlobalDispatcher, EnvHttpProxyAgent } from 'undici';

   setGlobalDispatcher(new EnvHttpProxyAgent());
   ```

   This sets up the `undici` package which affects native `fetch`.

1. Start the backend with the correct environment variables set. For example:

   ```sh
   export HTTP_PROXY=http://username:password@proxy.example.net:8888
   yarn start
   ```

   For further information about `HTTP(S)_PROXY` and `NO_PROXY` excludes, see the [undici documentation](https://github.com/nodejs/undici).

## Configuration

If your development environment is in the cloud (like with [AWS Cloud9](https://aws.amazon.com/cloud9/) or an instance of [Theia](https://theia-ide.org/)), you will need to update your configuration.

You will probably need to make some changes in `app-config.yaml` (or another config file like `app-config.local.yaml` if you've created it, see the [configuration doc](https://backstage.io/docs/conf/#supplying-configuration)).
The exact values will depend on your setup but for instance, if your public URL is `https://your-public-url.com` and the port `3000` and `8080` are open:

```yaml
app:
  baseUrl: https://your-public-url.com:3000
  listen:
    host: 0.0.0.0 # This makes the dev server bind to all IPv4 interfaces and not just the baseUrl hostname

backend:
  baseUrl: https://your-public-url.com:8080
  listen:
    port: 8080
  cors:
    origin: https://your-public-url.com:3000
```

The app port must proxy web socket connections in order to make hot reloading work.

## Backstage CLI

The Backstage CLI [versions:bump](https://backstage.io/docs/tooling/cli/commands#versionsbump) command also supports proxies via `global-agent` environment variable configuration. See the [keeping Backstage updated](https://backstage.io/docs/getting-started/keeping-backstage-updated/#proxy) docs for more information.
