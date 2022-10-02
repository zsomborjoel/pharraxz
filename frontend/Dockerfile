FROM node:16.13.0 AS builder
ENV NODE_ENV production
# input env vars
ARG RUN_TAG
ARG ENVIRONMENT
ENV REACT_APP_RUN_TAG=$RUN_TAG
ENV APP_ENVIRONMENT=$ENVIRONMENT

RUN echo $APP_ENVIRONMENT

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build-${APP_ENVIRONMENT}
RUN echo $(ls -1)

# actual build
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# input env vars
ARG RUN_TAG
ARG ENVIRONMENT
ENV REACT_APP_RUN_TAG=$RUN_TAG
ENV APP_ENVIRONMENT=$ENVIRONMENT

# get files from previous builder container
COPY --from=builder ./app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]