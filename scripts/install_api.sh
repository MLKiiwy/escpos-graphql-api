#! /bin/sh

sudo cp ./config/escpos-api.service /etc/systemd/system
sudo systemctl enable escpos-api.service
