FROM node:12-slim

# Create app directory
RUN mkdir -p /usr/src/app

RUN chown -R node:node /usr/src/app
USER node


WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci && npm cache clean --force

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD [ "npm", "start" ]