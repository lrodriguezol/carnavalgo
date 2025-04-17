FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .

WORKDIR /app/carnavalGo_Backend

RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine-jdk

WORKDIR /app
COPY --from=builder /app/carnavalGo_Backend/target/carnavalGo_Backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]