#built from this tutorial ----> https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

# Dockerfile
# The FROM directive sets the Base Image for subsequent instructions
FROM node:7.9-alpine

# Add application files
ADD . /
RUN npm i --production node-sass-middleware
RUN npm i --production
RUN npm i -g pm2 &>/dev/null


EXPOSE 5000

CMD ["pm2", "start", "processes.json", "--no-daemon","--silent"]
# the --no-daemon is a minor workaround to prevent the docker container from thinking pm2 has stopped running and ending itself
