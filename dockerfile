# Use official Node LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000 (React default)
EXPOSE 3000

# Start the React dev server
CMD ["npm", "start"]
