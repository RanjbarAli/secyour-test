# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate

# Regular install (not frozen) - use this if you don't have a lockfile
RUN pnpm install

COPY . .

RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules package-lock.json

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
