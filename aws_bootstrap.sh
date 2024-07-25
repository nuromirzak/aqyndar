sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
sudo apt-get install -y git
git clone https://github.com/nuromirzak/aqyndar.git
cd aqyndar || return
# set up here environment variables manually
npm install
pm2 start app.js --name aqyndar
pm2 startup
pm2 logs aqyndar --lines 100
pm2 flush
