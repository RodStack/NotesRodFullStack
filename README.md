# NotesRod - Note-Taking Application


### NotesRod is a full-stack web application for taking and managing notes. It allows users to create, edit, archive, and categorize their notes. The application is built using React.js for the frontend and Java with Spring Boot for the backend.
### You can download the FullStackNoteRod and if you have Linux or Mac you can run the Script  `installNotesRodv2.sh`and it would set up the enviroment to start and run the NotesRod WebApp

### User List for the App
Rambo securePassword!123 <br/>
Terminator securePassword!123<br/>
Ripley securePassword!123

## Features

User authentication: Users can log in to access their notes.
Create and edit notes: Users can create new notes and edit existing ones.
Archive notes: Users can archive notes to keep them organized.
Categorize notes: Users can assign categories to notes for bet/ter organization.
View notes by category: Users can view notes filtered by specific categories.
Responsive design: The application is designed to work well on various screen size

## -Prerequisites

Java JDK 17: Ensure you have JDK 11 installed to run the Spring application. You can verify the version by running the command java -version in the command line.

Version: openjdk version "17.0.11" 
Provider: OpenJDK Runtime Environment Temurin-17.0.11+9


Apache Maven 4.0.0: Used for project dependency management and building the project. Verify that you have Maven installed by running the command mvn -v in the command line.

Version: Apache Maven 4.0.0

## Key Dependencies

Spring Boot 3.3.0: Framework used for creating the backend application.
Spring Boot Starter Data JPA: For database interactions.
Spring Boot Starter Web: To create RESTful web services.
MySQL Connector Java (Runtime): MySQL JDBC driver for database connectivity.
Spring Boot Starter Tomcat (Provided): Embedded container used during development.
Spring Boot Starter Test (Test Scope): Frameworks used for testing the application.

## Frontend Setup
## Prerequisites

Node.js and npm: Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can verify the versions by running the commands node -v and npm -v respectively.

### Key Dependencies

React 18.3.1 & React-DOM 18.3.1: Core libraries to build the frontend.
Axios 1.7.2: Used for making HTTP requests from the frontend to the backend services.
React Router DOM 6.23.1: For handling routing.
React Icons 5.2.1: To include icons in the application.
TailwindCSS 3.4.4: A utility-first CSS framework for styling the application.

### Development Tools

Create React App 5.0.1: To set up the development environment for React.
ESLint (react-app/jest): Linter tool for identifying and reporting on patterns in JavaScript.

# Installation Steps

### Copy the repository into you local machine and make sure the installNoteRod.sh has the chmod permissions and is DB connection is adapted to yours then run the script. In case of failing continue with the 

## Manual Installation Guide

1. Unzip the `NotesRod.zip` file to a directory of your choice. After unzipping, you should have a directory structure like this:
  
   ```*
   installNotesRodv2.sh
   FullStackNoteRod
   └──   NotesRod/
      ├── build/
      ├── SpringNotesRod/
      └── note_rod_db.sql
   
   ```

2. Database Setup:
   - Open your MySQL database management tool (e.g., MySQL Workbench, phpMyAdmin).
   - Create a new database for the NotesRod application.
   - Import the `note_rod_db.sql` file into the newly created database called `note_rod_db`. This will set up the required tables and initial data.

3. Backend Setup:
   - Navigate to the `SpringNotesRod` directory.
   - Open the `application.properties` file located in `src/main/resources`.
   - Modify the database connection properties according to your MySQL database configuration. Update the following properties:
     ```
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
   - Save the changes.
   - Open a terminal or command prompt and navigate to the `SpringNotesRod` directory.
   - Run the following command to build the backend project using Maven:
     ```
     mvn clean install
     ```
   - Once the build is successful, run the following command to start the backend server:
     ```
     mvn spring-boot:run
     ```
   - The backend server should now be running on `http://localhost:54902`.

4. Frontend Setup:
   - Navigate to the `build` directory.
  - Install npm if you dont have it, and then procede to do a npm install http-server -p 9090
     ```
   - The frontend should now be only accessible at `http://localhost:9090`.

## Troubleshooting

### WebConfig.java

In the `WebConfig.java` file, you can configure the accepted API consumers by modifying the `allowedOrigins` method in the `addCorsMappings` method. Make sure to update the allowed origins based on your deployment environment and the intended consumers of your API.

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:9090", "https://9e11-179-60-68-56.ngrok-free.app")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*");
    
    // Reminder: You can change the accepted API consumers by modifying the allowedOrigins method.
    // Add or remove origins as needed to restrict or allow access to the API endpoints.
}
```

If you encounter CORS-related issues, double-check that the allowed origins in the `WebConfig.java` file match the origins from which your frontend is making requests to the API.

### Possible Connection Errors

1. **Database Connection Error**: If you encounter issues connecting to the MySQL database, consider the following:
   - Ensure that the MySQL server is running and accessible.
   - Verify that the database connection properties in the `application.properties` file of the Spring Boot backend are correctly configured, including the database URL, username, and password.
   - Check if the MySQL server is listening on the specified port (default is 3306).
   - Ensure that the MySQL user has the necessary privileges to access the database.

2. **Port Conflicts**: The backend server runs on port 8080, and the frontend is served on port 8080 by default. If you encounter issues starting the application, ensure that these ports are not already in use by other applications. You can modify the ports in the `application.properties` file for the backend and in the `http-server` command for the frontend if needed.

3. **Incorrect API Base URL**: If the frontend is unable to communicate with the backend API, verify that the API base URL is correctly set in the frontend configuration. Update the API base URL in the frontend code to match the backend server's URL and port.

4. **Network Connectivity Issues**: Ensure that the machine running the NotesRod application has a stable network connection. Check if the machine can access the required network resources, such as the MySQL server and any external services used by the application.

5. **Firewall Restrictions**: If the application is running on a machine with a firewall enabled, ensure that the necessary ports (9090, 54902 for both the backend and frontend) are open and accessible.

6. **Insufficient Permissions**: Make sure that the user running the application has the necessary permissions to install packages, access the required directories, and run the application components.

![Captura de pantalla 2024-06-18 115824](https://github.com/RodStack/NotesRodFullStack/assets/57158158/a412a1ca-74e2-4133-b29c-e4fa00f09c37)
![Captura de pantalla 2024-06-18 115753](https://github.com/RodStack/NotesRodFullStack/assets/57158158/a1981b92-b68c-46b6-856e-77ba8d6f663a)
![Captura de pantalla 2024-06-18 115735](https://github.com/RodStack/NotesRodFullStack/assets/57158158/821335cd-6b9b-4570-9e7c-95460256a83c)
![Captura de pantalla 2024-06-18 115705](https://github.com/RodStack/NotesRodFullStack/assets/57158158/f49f3c34-4041-4b81-b8dd-0ab475b7dc55)
![Captura de pantalla 2024-06-18 115550](https://github.com/RodStack/NotesRodFullStack/assets/57158158/9e5a9117-b7d4-46d2-994c-de3dedbe4701)




