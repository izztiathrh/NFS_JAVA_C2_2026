# D17 Exercise 07 — Backend Dockerfile

## Goal

Create a Dockerfile for your Support Desk Spring Boot backend.

## Requirements

Your Dockerfile must:

1. Use a build stage.
2. Use a runtime stage.
3. Build the JAR inside Docker.
4. Copy only the final JAR into the runtime image.
5. Expose port 8080.
6. Not contain secrets.

## Build command

```bash
docker build -t support-desk-api:day17 .
```

## Submission

### Dockerfile

```dockerfile
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
```

A `.dockerignore` (`target/`, `.env`, `.git`, `.idea`, `.vscode`, `*.log`) was added alongside it so the build context never includes secrets or build artifacts — satisfying requirement 6 (no secrets in the image) on top of the fact that the Dockerfile only ever `COPY`s `pom.xml` and `src/`, never `.env`.

### Build output (real run of `docker build -t support-desk-api:day17 .`)

```text
#15 [build 6/6] RUN mvn -B clean package -DskipTests
...
#15 [INFO] Building jar: /workspace/target/support-desk-api-0.0.1-SNAPSHOT.jar
#15 [INFO] --- spring-boot:4.1.0:repackage (repackage) @ support-desk-api ---
#15 [INFO] Replacing main artifact ... adding nested dependencies in BOOT-INF/.
#15 [INFO] BUILD SUCCESS
#15 [INFO] Total time:  15.223 s
#15 DONE 21.9s

#16 [stage-1 3/3] COPY --from=build /workspace/target/*.jar app.jar
#16 DONE 0.3s

#17 exporting to image
#17 naming to docker.io/library/support-desk-api:day17 done
```

```text
$ docker images support-desk-api:day17
IMAGE                    ID             DISK USAGE   CONTENT SIZE
support-desk-api:day17   95a34e7982e9        373MB          108MB
```

Requirements checklist:
1. ✅ Build stage (`FROM maven:3.9-eclipse-temurin-25 AS build`)
2. ✅ Runtime stage (`FROM eclipse-temurin:25-jre-alpine`)
3. ✅ JAR built inside Docker (`mvn clean package` runs in the build stage)
4. ✅ Only the final JAR copied into runtime (`COPY --from=build .../*.jar app.jar`)
5. ✅ Port 8080 exposed (`EXPOSE 8080`)
6. ✅ No secrets baked in — `.env` is git-ignored and excluded via `.dockerignore`; the image only receives DB credentials at runtime via environment variables (`MONGO_USERNAME`/`MONGO_PASSWORD`), never baked into a layer.