# Java backend Dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
