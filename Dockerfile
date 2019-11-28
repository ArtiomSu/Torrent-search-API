FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT 9876 


ADD app.js /usr/src/app/app.js
ADD routes /usr/src/app/routes
ADD search /usr/src/app/search
ADD bin /usr/src/app/bin
ADD package.json /usr/src/app/package.json
RUN npm install
EXPOSE 9876
#ENV HTTPS_PROXY "10.0.0.69:8118"
#ENV HTTP_PROXY "10.0.0.69:8118"
CMD [ "npm", "start" ]