# Build the React assets. No API credentials are needed during the build.
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci
COPY frontend ./frontend
RUN npm run build:frontend

# Package the frontend with Spring Boot, including the backend tests.
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /workspace
COPY backend/pom.xml backend/pom.xml
RUN mvn -B -ntp -f backend/pom.xml dependency:go-offline
COPY backend/src backend/src
COPY --from=frontend-build /workspace/build/frontend ./build/frontend
RUN mvn -B -ntp -f backend/pom.xml package

# The deployed image contains only Java and the packaged application.
FROM eclipse-temurin:21-jre-jammy AS runtime
WORKDIR /app
RUN groupadd --system portfolio && useradd --system --gid portfolio --home-dir /app portfolio
COPY --from=backend-build --chown=portfolio:portfolio /workspace/backend/target/portfolio-1.0.0.jar ./app.jar
USER portfolio
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=60.0 -Xss512k"
EXPOSE 10000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
