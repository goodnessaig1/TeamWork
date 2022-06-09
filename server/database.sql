CREATE DATABASE team-work;

CREATE TABLE users (
    Id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255),
    createdat  DATE NOT NULL,
    updatedat  DATE NOT NULL);


--Insert fake users
     INSERT INTO users (firstname,
     lastname,
    email,
    password,
     gender,
      jobRole,
    department,
    isAdmin,
     address)
      VALUES ('goodness', 'aig', 'goodness@gmail.com','password', 'male', 'None', 'develope', true ,'No 7 eyaen, benin city');

      CREATE TABLE gifs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(128) NOT NULL,
      imageUrl VARCHAR(128) NOT NULL,
      createdOn DATE NOT NULL );