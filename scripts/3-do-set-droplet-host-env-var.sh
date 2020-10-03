echo "=========================================================="
echo "Environment=$RANDORIKATA__ENV "$(pwd)/$(basename "$0")

DROPLET_NAME=$RANDORIKATA__CODE__APP_NAME--$RANDORIKATA__ENV

echo "Assigning host of droplet '$DROPLET_NAME' to RANDORIKATA__CODE__DROPLET_HOST"
DROPLET_HOST=`doctl compute droplet list \
  --no-header \
  --format Name,PublicIPv4 \
  | tr -s ' ' ',' \
  | grep "^$DROPLET_NAME," \
  | uniq \
  | cut -d',' -f2`
echo "::set-env name=RANDORIKATA__CODE__DROPLET_HOST::$DROPLET_HOST"
echo "RANDORIKATA__CODE__DROPLET_HOST=$DROPLET_HOST"
