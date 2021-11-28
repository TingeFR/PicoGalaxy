FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN npm install
RUN npm run build
ENV NODE_ENV="production"

EXPOSE 3000
CMD npm run start:prod