# frontend/Dockerfile (React)

# ---- build stage ----
FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# ---- export stage ----
FROM alpine AS export
WORKDIR /export
# just copy the build artefacts into this image
COPY --from=builder /app/build .

# nothing to run – image only holds the artefacts