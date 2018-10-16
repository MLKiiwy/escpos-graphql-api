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
-> Take RASPBIAN JESSIE LITE

2. Create SD Card 

See [doc](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)

On Mac

- About This Mac -> system report -> card reader ->  BSD name -> get it (*1)
- Unmount USB Drive 
- sudo dd bs=1m if=path_of_your_image.img of=/dev/rdiskn (Remember to replace n with the number that you noted before!, take ~40min)

On linux

??? TODO

3. Insert card into raspberry and turn it on. Search rasberry on network
4. Connect to raspberry pie with pass *raspberry*

```bash
ssh pi@rasberry-ip
```

5. Configure it => Do first option 'expand partition', now filesystem available will be on all the SD card !

6. Create an ssh key and add it to github

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-add ~/.ssh/id_rsa
```

### Install ESCPOS Printer

See [complete doc](http://scruss.com/blog/2015/07/12/thermal-printer-driver-for-cups-linux-and-raspberry-pi-zj-58/)

Execute : [./scripts/install_drivers.sh](./scripts/install_drivers.sh)

Then goto : http://rasbperry-ip:631

Click on add printer and follow instruction
(Choose printer "unknow" and brand "Zikiang")

Your printer should be installed
