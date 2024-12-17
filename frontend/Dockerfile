FROM oven/bun:slim AS builder

COPY frontend/ /app/
COPY LICENSE /app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y \
        curl \
        openjdk-17-jre-headless \
    && \
    bun install --frozen-lockfile && \
    bun run build && \
    cp -R public/ .next/standalone/ && \
    cp -R .next/static/ .next/standalone/.next/


FROM oven/bun:slim

RUN groupadd -g 1001 intranet && \
    useradd -M -d /app -u 1001 -g intranet intranet

COPY --from=builder --chown=intranet:intranet /app/.next/standalone /app

USER intranet

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD [ "bun", "run", "server.js" ]
