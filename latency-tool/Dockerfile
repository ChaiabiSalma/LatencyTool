FROM maven:3.8.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY ./src ./src
COPY ./pom.xml .
RUN mvn clean package

# Stage 2: Create the final image
FROM eclipse-temurin:21-jre-alpine
VOLUME /tmp
ARG JAR_FILE=target/latency-tool-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]