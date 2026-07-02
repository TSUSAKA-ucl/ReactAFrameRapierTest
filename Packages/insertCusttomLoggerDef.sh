#!/bin/bash
while [ $# -ge 1 ]
do sed -i \
       -e "1iimport {customLogger} from './customLogger.js'" \
       -e "1iglobalThis.__customLogger = customLogger;" \
       "$1"
   shift
done
