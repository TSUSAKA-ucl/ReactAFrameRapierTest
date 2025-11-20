#!/bin/bash
# @ucl-nueeパッケージの依存先をgithub URLからfileに変更する
[ -e package.json.URL ] && echo package.json.URL exists 1>&2 && exit 1
[ ! -e package.json ] && echo package.json does not exists 1>&2 && exit 1
mv package.json package.json.URL
cat package.json.URL | sed -e \
's|https://github.com/TSUSAKA-ucl/\([^/"]*\)/.*\.tgz"|file:../\1"|
/@ucl-nuee.ur5e/s|robot-assets"|robot-assets/ur5e"|
/@ucl-nuee.nova2/s|robot-assets"|robot-assets/nova2"|
/@ucl-nuee.kinova-gen3-lite/s|robot-assets"|robot-assets/kinova-gen3-lite"|
/@ucl-nuee.kinova-gen3/s|robot-assets"|robot-assets/kinova-gen3"|
/@ucl-nuee.g1-right/s|robot-assets"|robot-assets/g1-right"|
/@ucl-nuee.g1-left/s|robot-assets"|robot-assets/g1-left"|
/@ucl-nuee.jaka-zu5/s|robot-assets"|robot-assets/jaka-zu5"|'\ >> package.json
