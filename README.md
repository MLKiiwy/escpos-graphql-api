# escpos-grphql-api

A graphql api to control an "autonomous" thermal printer

## Install

```bash
yarn start
```

## Install ESCPOS printer on a raspberry pie

### Get a raspberry pie working

1. Download image 

On https://www.raspberrypi.org/downloads/raspbian/ 
-> Take the LITE version (without X-Server)

1. Create SD Card 

Use https://etcher.io/

3. Insert card into raspberry and turn it on. Search rasberry on network
4. Connect to raspberry pie with pass *raspberry*

```bash
ssh pi@rasberry-ip
```

1. Configure it

Execute 
```ssh
sudo raspi-config
```
Do first option 'expand partition', now filesystem available will be on all the SD card !

2. Create an ssh key and add it to github

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-add ~/.ssh/id_rsa
```

3. Install Git, NVM, yarn

```bash
#reconfig locales
sudo dpkg-reconfigure locales

sudo apt-get install git-core zsh curl
git config --global user.email "myemail@gmail.com"
git config --global user.name "My name"

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install lts/carbon

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

### Install ESCPOS Printer for zj-58 cheap printer (chinese one)

See [complete doc](http://scruss.com/blog/2015/07/12/thermal-printer-driver-for-cups-linux-and-raspberry-pi-zj-58/)

#### Install drivers
Execute : [./scripts/install_drivers.sh](./scripts/install_drivers.sh)

#### Setup CUPS
If you are on raspbian, execute [./scripts/install_printer_raspberry.sh](./scripts/install_printer_raspberry.sh)
Otherwise, adapt : 
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

##### Via network (raspbian)

Then goto : http://rasbperry-ip:631

Click on add printer and follow instruction
(Choose printer "unknow" and brand "Zikiang")

Your printer should be installed, you can test it with the button "test page".

##### On ubuntu

Do add a printer in settings. 
Choose Zikiang in devices and zj-58.

Your printer should be installed, you can test it with the button "test page".


## Troubleshouting

### Error LIBUSB_ERROR_ACCESS

You have a permission error for accessing the printer.
Check permissions on : ls -la /dev/usb

If permissions are not good, you need to add a new udev rule.
Edit a file in /etc/udev/rules.d/.

For example /etc/udev/rules.d/50-myusb.rules :

```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0416", ATTRS{idProduct}=="5011", GROUP="users", MODE="0666"
```

You can find vendor and product id by using, these commands :
```bash
# Find usb bus of printer
find /dev/bus/usb/ '!' -type d -mmin -25
# Pass the file to 
udevadm info /path/of/usb/printer

# Or use this command :
lsusb -vvv
```

