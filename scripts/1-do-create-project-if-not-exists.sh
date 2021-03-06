echo "=========================================================="
echo "Environment=$RANDORIKATA__ENV "$(pwd)/$(basename "$0")

PROJECT_NAME=$RANDORIKATA__APP_NAME--$RANDORIKATA__ENV
EXISTS=`doctl projects list \
  --format Name \
  --no-header \
  | grep "^$PROJECT_NAME$" \
  | uniq`

echo "Checking if project '$PROJECT_NAME' already exists"
if [ -z "$EXISTS" ]
then
  echo "Project '$PROJECT_NAME' does not exist. Creating"
  doctl projects create \
    --name $PROJECT_NAME \
    --purpose "Manage real-time code-sharing"
else
  echo "Project '$PROJECT_NAME' already created. Exiting"
fi
