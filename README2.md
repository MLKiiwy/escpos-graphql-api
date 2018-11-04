# UPrinter

UPrinter transform your Usabilla (Usabilla for web) survey campaign into a physical form, on a receipt paper.
For that we use a classic thermal printer (Model ZJ-58) connected on USB.

## Usage

Start the ticket generator server: 
```bash
yarn start
```

Generate the ticket:
```
yarn ticket:generate
```

Print the ticket:
```
yarn ticket:print
```

## Setup

### NVM

To use the correct node version run:

```
nvm use
```

If you don't have nvm, [install it first](https://github.com/creationix/nvm).

### Yarn

Instead of running `npm install` use:

```
yarn install
```

If you don't have yarn, install it globally first with `brew install yarn`.


### Install ESCPOS Printer for zj-58 cheap printer (chinese one)

See [complete doc](http://scruss.com/blog/2015/07/12/thermal-printer-driver-for-cups-linux-and-raspberry-pi-zj-58/)

#### Install drivers
Execute : [./scripts/install_drivers.sh](./scripts/install_drivers.sh)

#### Setup CUPS

Add your user to cups

```bash
sudo usermod -a -G lpadmin YOUR_USER
```

#### Add printer on cups

Check that cups run.

```bash
sudo service cups status
```

In case of failure, check config (/etc/cups/cupsd.conf)
And restart (sudo service cups restart)

##### Via cups web-interface

Then goto : http://localhost:631

Click on add printer and follow instruction
(Choose printer "unknow" and brand "Zikiang")

Your printer should be installed, you can test it with the button "test page".

##### Via ubuntu setting

Do add a printer in settings. 
Choose Zikiang in devices and zj-58.

Your printer should be installed, you can test it with the button "test page".

## Configuration

Configuration for the app is defined in `src/env.js`. The example is copied during installation and has the development environment defaults set. On deployment an `env.js` is generated for the deployment environment based on the project's `values.yml`.

| Variable      | Description                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`ENV`**     | The environment that the app is running.                                                                                                                                     |
| **`RELEASE`** | The current release of the app. For development we use `0.0.0-development`, for staging we use the output of `git describe`, and for production this will be the latest tag. |

## Commands

| Command                     | Description                                                                            |
| ---------------------       | -------------------------------------------------------------------------------------- |
| **`yarn build`**            | Compiles the production version of the app into the `dist` folder.                     |
| **`yarn start`**            | Run the development server and watch for changes.                                      |
| **`yarn test`**             | Run all tests for the project once.                                                    |
| **`yarn test:watch`**       | Start test runner and watch for changes. Only tests relevant to changed code will run. |
| **`yarn lint`**             | Run eslint against all files.                                                          |
| **`yarn lint:fix`**         | Attempt to automatically fix any formatting issues. (Runs eslint --fix and prettier).  |
| **`yarn ticket:generate`**  | Generate ticket.png image from the rendering of ticket generator (use pupeteer)        |
| **`yarn ticket:print`**     | Send the ticket.png image to print on the thermal printer through USB connection       |

## Contributing

If you would like to contribute, please check out [CONTRIBUTING.md](.github/CONTRIBUTING.md).
