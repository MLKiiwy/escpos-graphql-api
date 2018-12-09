#! /bin/sh

sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

wget http://launchpadlibrarian.net/361669485/chromium-browser_65.0.3325.181-0ubuntu0.14.04.1_armhf.deb; sudo dpkg -i chromium-browser_65.0.3325.181-0ubuntu0.14.04.1_armhf.deb
wget http://launchpadlibrarian.net/361689926/chromium-codecs-ffmpeg_65.0.3325.181-0ubuntu0.16.04.1_armhf.deb; sudo dpkg -i chromium-codecs-ffmpeg_65.0.3325.181-0ubuntu0.16.04.1_armhf.deb

sudo apt-get --fix-broken install
