FROM openjdk:17-alpine

ARG RUN_TAG
ARG JAVA_OPTS
ENV APP_RUN_TAG=$RUN_TAG
ENV APP_JAVA_OPTS=$JAVA_OPTS

RUN echo $JAVA_OPTS

WORKDIR /app
RUN mkdir /opt/app

ENV PORT 8080
EXPOSE 8080

COPY /build/libs/pharraxz-0.0.1-SNAPSHOT.jar /opt/app/pharraxz-0.0.1-SNAPSHOT.jar
ENTRYPOINT java $APP_JAVA_OPTS -jar /opt/app/pharraxz-0.0.1-SNAPSHOT.jar
