FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000

# Start the React dev server
CMD ["npm", "start"]
