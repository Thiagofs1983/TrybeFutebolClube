FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3001
RUN npx tsc
