#!/bin/bash

# Update the Ubuntu environment
sudo apt update

# Check if unzip is installed, if not, install it
if ! command -v unzip &> /dev/null; then
    echo "Installing unzip..."
    sudo apt install unzip -y
fi

# Unzip the NotesRod.zip file
unzip NotesRod.zip

# Change directory to NotesRod
cd NotesRod

# Check if MySQL is installed, if not, install it
if ! command -v mysql &> /dev/null; then
    echo "Installing MySQL..."
    sudo apt install mysql-server -y
fi

# Function to set up MySQL with user 'root' and password 'Admin8919*'
mysql_setup() {
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin8919*';"
    sudo mysql -e "FLUSH PRIVILEGES;"
}

# Default MySQL credentials
mysql_username="root"
mysql_password="Admin8919*"

# Try to set up MySQL, if it fails, prompt the user for credentials
if ! mysql_setup; then
    read -p "Enter your MySQL username: " mysql_username
    read -s -p "Enter your MySQL password: " mysql_password
    echo

    sudo mysql -e "ALTER USER '$mysql_username'@'localhost' IDENTIFIED WITH mysql_native_password BY '$mysql_password';"
    sudo mysql -e "FLUSH PRIVILEGES;"
    
    # Update the application.properties file with the new MySQL username and password
    sed -i "s/^spring.datasource.username=.*/spring.datasource.username=$mysql_username/" SpringNotesRod/src/main/resources/application.properties
    sed -i "s/^spring.datasource.password=.*/spring.datasource.password=$mysql_password/" SpringNotesRod/src/main/resources/application.properties
fi

# Create the notes_rod database if it doesn't exist
sudo mysql -u "$mysql_username" -p"$mysql_password" -e "CREATE DATABASE IF NOT EXISTS notes_rod;"

# Populate the notes_rod database with the note_rod_db.sql file
sudo mysql -u "$mysql_username" -p"$mysql_password" notes_rod < note_rod_db.sql

# Check if Java Development Kit (JDK) is installed, if not, install it
if ! command -v javac &> /dev/null; then
    echo "Installing Java Development Kit (JDK)..."
    sudo apt install default-jdk -y
fi

# Check if Maven is installed, if not, install it
if ! command -v mvn &> /dev/null; then
    echo "Installing Maven..."
    wget https://dlcdn.apache.org/maven/maven-4/4.0.0-beta-3/binaries/apache-maven-4.0.0-beta-3-bin.zip
    sudo unzip apache-maven-4.0.0-beta-3-bin.zip
    sudo mv apache-maven-4.0.0-beta-3 /opt/maven

    # Create a symbolic link to the extracted Maven directory
    sudo ln -s /opt/maven/apache-maven-4.0.0 /opt/maven

    # Create the maven.sh file
    echo 'export M2_HOME=/opt/maven' | sudo tee /etc/profile.d/maven.sh
    echo 'export PATH=${M2_HOME}/bin:${PATH}' | sudo tee -a /etc/profile.d/maven.sh

    # Make the maven.sh file executable and load the environment variables
    sudo chmod +x /etc/profile.d/maven.sh
    source /etc/profile.d/maven.sh
fi

# Change directory to SpringNotesRod
cd SpringNotesRod

# Build the Spring Boot project using Maven
echo "Building the Spring Boot project..."
mvn clean package

# Run the Spring Boot application
echo "Running the Spring Boot application..."
mvn spring-boot:run &

# Change directory back to NotesRod
cd ..

# Change directory to the build folder
cd build

# Check if Node.js is installed, if not, install it
if ! command -v node &> /dev/null; then
    echo "Installing Node.js and npm..."
    sudo apt install nodejs npm -y
fi

# Check if http-server is installed globally, if not, install it
if ! command -v http-server &> /dev/null; then
    echo "Installing http-server globally..."
    sudo npm install -g http-server
fi

# Start the http-server on port 9090
echo "Starting the http-server on port 9090..."
http-server -p 9090 &

echo "Installation and setup completed successfully!"
