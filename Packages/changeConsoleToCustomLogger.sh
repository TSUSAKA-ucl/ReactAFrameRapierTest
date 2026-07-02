#!/bin/bash
while [ $# -ge 1 ]
do echo process "$1" 1>&2
   sed -i -e 's/console\.debug/globalThis.__customLogger?.debug/g' "$1"
   sed -i -e 's/console\.log/globalThis.__customLogger?.log/g' "$1"
   sed -i -e 's/console\.warn/globalThis.__customLogger?.warn/g' "$1"
   sed -i -e 's/console\.error/globalThis.__customLogger?.error/g' "$1"
   shift
done
