echo "Environment=$RANDORIKATA__ENV"

ENV=$RANDORIKATA__ENV
DROPLET_NAME=$RANDORIKATA__CODE__APP_NAME--$RANDORIKATA__ENV
DROPLET_SIZE=$RANDORIKATA__CODE__DROPLET_SIZE

echo "Checking if droplet '$DROPLET_NAME' already exists"
EXISTS=`doctl compute droplet list \
  --format Name \
  --no-header \
  | grep "^$DROPLET_NAME$" \
  | uniq`

if [ -z "$EXISTS" ]
then
  echo "Droplet '$DROPLET_NAME' not created. Creating"
  doctl compute droplet create \
    --image ubuntu-18-04-x64 \
    --size $DROPLET_SIZE \
    --region tor1 \
    --ssh-keys 67:65:5f:d9:e6:a0:f0:e5:a4:38:9a:df:b9:c7:5d:27 \
    --tag-name $ENV \
    --wait \
    -v \
    $DROPLET_NAME
else
  echo "Droplet '$DROPLET_NAME' already created. Exiting"
fi
