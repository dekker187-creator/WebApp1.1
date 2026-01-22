FROM node:18
WORKDIR /BlazorApp2
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
