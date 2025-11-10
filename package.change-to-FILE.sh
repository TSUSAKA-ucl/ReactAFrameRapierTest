#!/bin/bash
# @ucl-nueeパッケージの依存先をgithub URLからfileに変更する
[ -e package.json.URL ] && echo package.json.URL exists 1>&2 && exit 1
[ ! -e package.json ] && echo package.json does not exists 1>&2 && exit 1
mv package.json package.json.URL
cat package.json.URL | sed -e \
's|https://github.com/TSUSAKA-ucl/\([^/"]*\)/.*\.tgz"|file:../\1"|
/@ucl-nuee.nova2/s|robot-assets"|robot-assets/nova2"|
/@ucl-nuee.jaka-zu5/s|robot-assets"|robot-assets/jaka-zu5"|'\ >> package.json
