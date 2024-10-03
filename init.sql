CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id_user uuid PRIMARY key DEFAULT uuid_generate_v4(),
    username varchar(100),
    password varchar(100)
);


CREATE TABLE person (
    id_person uuid primary key DEFAULT uuid_generate_v4(),
    id_user uuid,
    name varchar(80),
    email varchar(100),
    birth date,
    cpf char(11),
    foreign key (id_user) references users (id_user) 
);

CREATE TABLE subjects (
id_subject serial primary key,
subject_name varchar(20)
);


CREATE TABLE teachers(
id_teacher uuid primary key DEFAULT uuid_generate_v4(),
id_person uuid,
id_subject serial,
FOREIGN KEY (id_person) REFERENCES person(id_person),
FOREIGN KEY (id_subject) REFERENCES subjects(id_subject) 
);


CREATE TABLE students(
id_student uuid primary key DEFAULT uuid_generate_v4(),
id_person uuid,
grade varchar(30),
foreign key (id_person) references person(id_person)
);

CREATE TABLE posts (
id_post serial primary key,
id_teacher uuid,
id_subject serial,
post_text text,
post_title varchar(50),
post_date date,
foreign key (id_teacher) references teachers(id_teacher),
foreign key (id_subject) references subjects(id_subject)
);


INSERT INTO subjects (subject_name)
VALUES 
('Português'),
('Matemática'),
('Ciências'),
('História'),
('Geografia'),
('Inglês'),
('Física'),
('Química'),
('Tecnologia');
