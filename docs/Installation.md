# Installation

If you have all the prerequisite:
- a linux environment with node and yarn installed
- chromium if you run on a raspberry pi
- printer (+ drivers) installed

You just have to do

```bash
yarn install
yarn build:client
yarn build:server
yarn db:migrate:up
```
## Prerequisite on a raspberry pi

### Download image 

On https://www.raspberrypi.org/downloads/raspbian/ 
-> Take the LITE version (without X-Server)

### Create SD Card 

Use https://etcher.io/

1. Insert card into raspberry and turn it on. Search rasberry on network
2. Connect to raspberry pie with pass *raspberry*

```bash
ssh pi@rasberry-ip
```

### Configure it

Execute 
```ssh
sudo raspi-config
```
Do first option 'expand partition', now filesystem available will be on all the SD card !

### Create an ssh key and add it to github

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-add ~/.ssh/id_rsa
```

### Install Git, NVM, yarn

```bash
# reconfig locales
sudo dpkg-reconfigure locales

# Install 
sudo apt-get install git-core zsh curl
sudo apt-get install build-essential libudev-dev
git config --global user.email "myemail@gmail.com"
git config --global user.name "My name"

# Instal nvm + node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install lts/carbon

# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install --no-install-recommend yarn
```

## Install Printer on raspberry pi 

Model: zj-58 cheap printer (chinese one)

See [complete doc](http://scruss.com/blog/2015/07/12/thermal-printer-driver-for-cups-linux-and-raspberry-pi-zj-58/)

### Install drivers
Execute : [./scripts/install_drivers.sh](./scripts/install_drivers.sh)

### Setup CUPS
If you are on raspbian, execute [./scripts/install_printer_raspberry.sh](./scripts/install_printer_raspberry.sh)
Otherwise, adapt : 
```bash
sudo usermod -a -G lpadmin YOUR_USER
```

### Add printer on cups

Check that cups run.

```bash
sudo service cups status
```

In case of failure, check config (/etc/cups/cupsd.conf)
And restart (sudo service cups restart)

### Start cups webinterface

Execute : [./scripts/start_cups.sh](./scripts/start_cups.sh)

#### Via network (raspbian)

Then goto : http://rasbperry-ip:631

Click on add printer and follow instruction
(Choose printer "unknow" and brand "Zikiang")

### Check if the printer works

Your printer should be installed, you can test it with the button "test page".

#### On ubuntu

Do add a printer in settings. 
Choose Zikiang in devices and zj-58.

Your printer should be installed, you can test it with the button "test page".

## Install chromium on raspberry pi

Execute : [./scripts/install_chromium_raspberry.sh](./scripts/install_chromium_raspberry.sh)

## Install service on raspberry-pi

**Warning**

You have to modify [escpos-api.service(./config/escpos-api.service)] because path is absolute
And after run the service installation script

```bash
./script/install_api
```
