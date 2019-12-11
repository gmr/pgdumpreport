#!/usr/bin/env sh
mkdir -p build/data
cp /usr/share/zoneinfo/America/New_York /etc/localtime
echo "America/New_York" > /etc/timezone
if test -f "build/pgbench.dump"; then
  echo "Test data already exists"
else
  pgbench -i -h postgres -U postgres postgres
  pg_dump -Fc -h postgres -U postgres -f build/pgbench.dump -d postgres
fi
