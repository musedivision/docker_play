slackin="./containers/fccaux/slackin/bin/slackin"

include .globals

slackin:
			$(slackin) freecodecampauckland ${SLACK_API_TOKEN}

start:
			docker-compose up -d
			make refresh
down:
			docker-compose down

refresh:
			docker cp containers/gateway/. gateway:/
			docker cp containers/keddell/. keddell:/
			docker cp containers/stirling/. stirling:/
			docker exec stirling pm2 restart 0 --silent&
			docker exec keddell pm2 restart 0 --silent&
			docker exec gateway pm2 restart 0 --silent&

look:
			docker exec -it $t /bin/sh

images:
ifdef t
			make kill $t
			make start
else
			docker-compose down
			make nuke
			make start
endif

nuke:
			docker rmi -f $$(docker images  --filter=reference='sited_*' -a -q) || true

kill:
			docker stop $t
			docker rmi -f $$(docker images | awk '/${t}/ {print $$3}')
