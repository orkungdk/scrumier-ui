# ----------------------------------------------------------------
# Shell script for building and running jira-time-tracker-ui docker instance
#   Steps:
#     1. Removes already existed docker image
#     2. Builds a docker image
#     3. Runs the docker image
#   Arguments
#     --detach OR -d: Does not tail logs after the docker instance is started
# ----------------------------------------------------------------
grn=$'\e[1;32m'
blu=$'\e[1;34m'
white=$'\e[0m'
cyn=$'\e[1;36m'

parser () {
  ARG='';
  while read -r l; do
      if [[ $l =~ $1 ]]; then
          value="${BASH_REMATCH[2]}";
          ARG="$value";
      fi
  done < package.json;

  echo $ARG;
}

version=$(parser "\"(version)\": \"([^\"]*)\"")
name=$(parser "\"(name)\": \"([^\"]*)\"")

echo $name
echo $version

echo "$blu > $grn Docker image build is started..."
echo "$cyn package: ogedik"
echo "$cyn name: $name"
echo "$cyn version: $version"
echo "$white"

existedImages=$(docker images |grep -E ogedik/$name.*$version)

# Removes already existed docker image
if [ ! -z "$existedImages" ];
then
    echo "$blu > $grn The image with same repository name and version is already exist. Removing the existed docker image...$white"
    docker rmi $(docker images |grep -E ogedik/$name.*$version)
fi

## Builds new docker image
echo "$blu > $grn The docker image is building...$white"
docker build -t ogedik/$name:$version .

## Runs the docker container
echo "$blu > $grn Executing the docker container run...$white"
if [ "$*" == -d ] || [ "$*" == --detach ];
then
    docker run -d -p 3000:3000 ogedik/$name:$version
    echo "$blu > $grn docker-run script is successfully finished!$white"
else
    docker run -p 3000:3000 ogedik/$name:$version
fi
