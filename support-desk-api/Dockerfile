# Stage 1: build the application with Maven
FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /workspace

# Copy the pom.xml and download the dependencies
COPY pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn -B clean package -DskipTests

# Stage 2: use a minimal base image to run the application
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
