--Normalization
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY, 
    student_name TEXT NOT NULL
    );
CREATE TABLE IF NOT EXISTS instructors (
    instructor_id SERIAL PRIMARY KEY, 
    instructor_name TEXT NOT NULL, 
    phone TEXT
    );
CREATE TABLE IF NOT EXISTS courses(
    course_id SERIAL PRIMARY KEY,
    course_name TEXT NOT NULL,
    instructor_id INT NOT NULL REFERENCES instructors(instructor_id)
);
CREATE TABLE IF NOT EXISTS enrollements (
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    grade TEXT,
    PRIMARY KEY (student_id,course_id)
);

INSERT INTO students (student_name) VALUES ('Asha'), ('Ravi'),('Meera');

INSERT INTO instructors (instructor_name,phone) VALUES ('Dr. Rao', '98111'),('Dr. Sen','97222');

INSERT INTO courses (course_name,instructor_id) VALUES ('DBMS',1),('Networks',2),('Algorithms',1);

INSERT INTO enrollements (student_id,course_id,grade) VALUES (1,1,'A'), (1,2,'B'), (2,1,'B'), (3,3,'A');

UPDATE instructors SET phone ='99999' WHERE instructor_name ='DR. Rao';

SELECT s.student_name, c.course_name, i.instructor_name, i.phone,e.grade
FROM enrollements e 
INNER JOIN students s ON s.student_id = e.student_id
INNER JOIN courses c ON c.course_id = e.course_id
INNER JOIN instructors i ON i.instructor_id = c.instructor_id
ORDER BY s.student_name, c.course_name ;


