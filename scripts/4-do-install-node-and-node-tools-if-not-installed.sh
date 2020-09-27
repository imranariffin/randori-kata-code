echo "=========================================================="
echo "Environment=$RANDORIKATA__ENV "$(pwd)/$(basename "$0")

DROPLET_NAME=$RANDORIKATA__CODE__APP_NAME--$RANDORIKATA__ENV

echo "Installing node & dependencies into droplet '$DROPLET_NAME'"
apt-get clean && \
apt-get update && \
apt-get install gcc g++ make -y && \
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh && \
chmod 777 ./nodesource_setup.sh && \
./nodesource_setup.sh && \
rm ./nodesource_setup.sh && \
apt-get update && \
apt-get install nodejs -y && \
echo "Node version: $(node --version)" && \
echo "NPM version: $(npm --version)" && \
apt-get install build-essential -y && \
npm install .
