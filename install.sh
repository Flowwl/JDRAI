#!/usr/bin/env bash

command=$1
flag=$2

BLUE_COLOR='\033[34m'
NO_COLOR='\033[0m'

SUB_REPO_PATHS=(
  "jdr-nest" \
  "jdr-react"
)

for path in ${SUB_REPO_PATHS[@]}
do
    if [ ! -e $path ] ; then continue ; fi

    cd "./${path}"
    if [ -f ./package.json ]; then
        echo -e "${BLUE_COLOR}${path}${NO_COLOR}"
        eval ${command}
        RESULT=$?
    fi
    cd ~-
done
