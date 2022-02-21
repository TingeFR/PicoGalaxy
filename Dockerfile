FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN yarn
RUN npm run build
ENV NODE_ENV="production"

EXPOSE 8000
CMD npm run start:prod