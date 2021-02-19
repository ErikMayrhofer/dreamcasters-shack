FROM node:15.9.0-alpine3.13 AS sveltecompile
WORKDIR /svelte/
RUN yarn set version berry
COPY package.json .
RUN yarn install
COPY . .
#RUN yarn run validate && yarn run build
RUN yarn run export

FROM node:15.9.0-alpine3.13
WORKDIR /dreamcasters-shack/
COPY --from=sveltecompile /svelte/__sapper__/export/ .