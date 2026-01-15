package pl.bj.bank.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseInitializer {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        // Extract database name from URL
        String url = datasourceUrl;
        String dbName = url.substring(url.lastIndexOf("/") + 1);
        String baseUrl = url.substring(0, url.lastIndexOf("/"));

        try (Connection connection = DriverManager.getConnection(baseUrl + "/postgres", username, password);
             Statement statement = connection.createStatement()) {

            // Check if database exists
            String checkDbSql = "SELECT 1 FROM pg_database WHERE datname = '" + dbName + "'";
            try (var resultSet = statement.executeQuery(checkDbSql)) {
                if (!resultSet.next()) {
                    // Database doesn't exist, create it
                    String createDbSql = "CREATE DATABASE " + dbName;
                    statement.executeUpdate(createDbSql);
                    System.out.println("DatabaseInitializer: Database '" + dbName + "' created.");
                } else {
                    System.out.println("DatabaseInitializer: Database '" + dbName + "' already exists.");
                }
            }

        } catch (SQLException e) {
            System.err.println("DatabaseInitializer: Error creating database: " + e.getMessage());
            throw new RuntimeException("Failed to create database", e);
        }

        // Now create the actual DataSource
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(datasourceUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName(driverClassName);
        return dataSource;
    }
}
