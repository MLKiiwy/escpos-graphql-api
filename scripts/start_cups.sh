#! /bin/sh

# Setup web interface
cupsctl --remote-admin --remote-any

# Start cups
sudo service cups restart
