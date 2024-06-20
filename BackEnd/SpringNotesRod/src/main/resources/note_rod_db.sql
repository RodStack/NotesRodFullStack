-- Create the database
CREATE DATABASE IF NOT EXISTS notes_rod;
USE notes_rod;

-- Create users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create categories table
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

-- Create notes table
CREATE TABLE notes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  content VARCHAR(255),
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  archived BOOLEAN,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create note_category association table
CREATE TABLE note_category (
  category_id BIGINT,
  note_id BIGINT,
  PRIMARY KEY (category_id, note_id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- Insert users
INSERT INTO users (username, password) VALUES
  ('Rambo', 'securePassword!123'),
  ('Terminator', 'securePassword!123'),
  ('Ripley', 'securePassword!123');

-- Insert categories
INSERT INTO categories (name) VALUES
  ('Bug Fixes'),
  ('Feature Requests'),
  ('Code Reviews'),
  ('Deployment'),
  ('Security Updates'),
  ('Performance Optimization'),
  ('Database Issues'),
  ('User Interface');

-- Insert notes for each user
-- Rambo's notes
INSERT INTO notes (title, content, archived, user_id) VALUES
  ('Resolve Skynet Issue', 'Fix critical AI malfunction.', false, 1),
  ('Update Jungle Tactics', 'Implement new guerrilla strategies.', false, 1),
  ('Refactor Combat Code', 'Optimize the combat simulation code.', false, 1),
  ('Secure Military Database', 'Upgrade security protocols.', false, 1),
  ('Review Mission Brief', 'Review and revise the mission plan.', false, 1),
  ('Enhance Surveillance', 'Install updated surveillance software.', false, 1);

-- Terminator's notes
INSERT INTO notes (title, content, archived, user_id) VALUES
  ('Fix Time Travel Bug', 'Resolve paradox issue in time travel algorithm.', false, 2),
  ('Enhance Targeting System', 'Improve accuracy of targeting systems.', false, 2),
  ('Deploy Cybernetic Upgrades', 'Roll out new cybernetic enhancements.', false, 2),
  ('Perform System Diagnostics', 'Complete full system check.', false, 2),
  ('Update Resistance Data', 'Update database with latest resistance locations.', false, 2),
  ('Optimize Power Usage', 'Reduce power consumption during idle mode.', false, 2);

-- Ripley's notes
INSERT INTO notes (title, content, archived, user_id) VALUES
  ('Alien Life Form Study', 'Document and study alien biology.', false, 3),
  ('Update Ship Protocols', 'Implement new safety protocols aboard ship.', false, 3),
  ('Refine Escape Procedures', 'Develop faster evacuation plans.', false, 3),
  ('Enhance Defensive Measures', 'Install better ship defenses.', false, 3),
  ('Inspect Cargo Holds', 'Inspect for stowaways and breaches.', false, 3),
  ('Review Communication Logs', 'Analyze all incoming and outgoing transmissions.', false, 3);

-- Insert note-category associations manually for demonstration
-- This should be adjusted according to actual note and category IDs
INSERT INTO note_category (note_id, category_id) VALUES
  (1, 1), (2, 2), (3, 3), (4, 5), (5, 4), (6, 6),
  (7, 1), (8, 2), (9, 3), (10, 5), (11, 4), (12, 6),
  (13, 1), (14, 2), (15, 3), (16, 5), (17, 4), (18, 6);
