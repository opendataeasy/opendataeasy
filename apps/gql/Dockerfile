# Ref "Building Docker images" in https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6
# https://hub.docker.com/_/node
FROM node:18.11-alpine3.15 AS builder
WORKDIR /opendataeasy
COPY ./package.json ./package-lock.json .
RUN npm install
COPY . .
RUN npx nx build gql

FROM node:18.11-alpine3.15
WORKDIR /opendataeasy/gql
ENV NODE_ENV=production
COPY --from=builder /opendataeasy/package-lock.json /opendataeasy/dist/apps/gql/package.json .
RUN npm install --omit=dev
COPY --from=builder /opendataeasy/dist/apps/gql .
CMD ["node", "main.js"]
