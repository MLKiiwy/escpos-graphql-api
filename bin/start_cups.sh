#! /bin/sh

# Start cups
sudo service cups restart
sudo cupsctl --remote-admin
