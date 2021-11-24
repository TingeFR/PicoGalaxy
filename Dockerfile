FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD npm run start:prod