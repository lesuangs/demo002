yarn run build

rm *.gz

name=`date +%Y-%m-%d-%I%M`

tar -zcvf h5-hjb-version${name}.tar.gz dist

open .
