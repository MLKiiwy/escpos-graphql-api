# escpos-graphql-api

A rest and graphql api to control an "autonomous" thermal printer.

## Install

[Follow installation guide.](./docs/Installation.md)

## Configuration

Configuration for the app is defined in `config/default.json`. 

## Run 

### Service run

```bash
sudo systemctl start escpos-api.service
```

### Standalone run

```bash
yarn start:server
```

## Monitor

### Check service is running

```bash
sudo systemctl status escpos-api.service
```

### Check API is running 

Use the /healthcheck endpoint.

## Troubleshouting

If you have any trouble check here [Troubleshouting.md](./docs/Troubleshouting.md).

## Contributing

If you would like to contribute, please check out [CONTRIBUTING.md](./docs/Contributing.md).
