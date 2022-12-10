FROM node:19-alpine
ENV NODE_ENV production
WORKDIR /workspace

USER node
COPY --chown=node:node  package.json yarn.lock /workspace/

RUN yarn
# RUN yarn install --immutable --immutable-cache --check-cache

COPY --chown=node:node . .

RUN yarn build

CMD ["yarn", "start:prod"]