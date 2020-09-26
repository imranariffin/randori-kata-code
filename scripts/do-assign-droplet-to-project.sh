echo "Environment=$RANDORIKATA__ENV"

PROJECT_NAME=$RANDORIKATA__APP_NAME--$RANDORIKATA__ENV
DROPLET_NAME=$RANDORIKATA__CODE__APP_NAME--$RANDORIKATA__ENV
PROJECT_ID=`doctl projects list \
 --no-header \
 --format Name,ID \
 | grep $PROJECT_NAME \
 | tr -s ' ' ',' \
 | cut -d',' -f2`
DROPLET_ID=`doctl compute droplet list \
 --no-header \
 --format Name,ID \
 | grep $DROPLET_NAME \
 | tr -s ' ' ',' \
 | cut -d',' -f2`

echo "Assigning droplet '$DROPLET_ID' to project '$PROJECT_ID'"
doctl projects resources assign $PROJECT_ID --resource=do:droplet:$DROPLET_ID
