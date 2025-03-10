FROM node:22
WORKDIR /app
COPY . .
RUN yarn install

ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
ENV NEXT_PUBLIC_FILES=${NEXT_PUBLIC_API}/files

ENV PORT 4700
ENV NODE_ENV=production
RUN yarn build
EXPOSE 4700
CMD ["yarn", "start"]