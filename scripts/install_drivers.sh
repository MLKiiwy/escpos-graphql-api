#! /bin/sh

# Install required librairies
sudo apt-get install libcups2-dev libcupsimage2-dev git build-essential cups system-config-printer libudev-dev

# Install driver zj-58
git clone https://github.com/klirichek/zj-58.git
cd zj-58/
make
sudo ./install
