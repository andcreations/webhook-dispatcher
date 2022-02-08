# Webhook dispatcher

Webhook dispatcher is a small HTTP server which exposes a POST endpoint which dispatches requests to different URLs depending on a token. Tokens and URLs to which dispatch are stored in a configuration file.

The endpoint is `/webhook/{token}`.

## HTTP configuration

The HTTP configuration is given throught the following environment variables:
* `WEBHOOK_DISPATCHER_HTTP_PORT`: port on which to listen to HTTP requests,
* `WEBHOOK_DISPATCHER_HTTPS_CERT_FILE`: path to a file with a certificate,
* `WEBHOOK_DISPATCHER_HTTPS_KEY_FILE`: path to a file with a private key.

## Configuration file

Configuration is kept in a file. The path to the file is passed to the server via the environment variable `WEBHOOK_DISPATCHER_CFG_FILE`.

An example file could be as follows:
```yaml
dispatch:
  - token: EuY7VNN9T5G8FRbxOU2xGKsu4mqLXv7qnMZfTYuF
    url: https://192.168.1.125:8443/telegram/webhook
  - token: vOWSEBicpc2OH7QaAHle4Ka42E7VgcmagHpzvBM9
    url: https://192.168.1.127:8443/api/webhook
```