-- use schoolmaster;


-- -- School User ---

-- -- CREATE TABLE school_user (
-- --     id INT PRIMARY KEY AUTO_INCREMENT,
-- --     name VARCHAR(200) NOT NULL,                -- school name
-- --     email VARCHAR(200) NOT NULL UNIQUE,        -- school login email
-- --     phone VARCHAR(15) NOT NULL unique,         -- store as VARCHAR to support country codes
-- --     address VARCHAR(255),
-- --     logo_url VARCHAR(500),
-- --     subscription_plan ENUM('Paid', 'Free') DEFAULT 'Free',
-- --     hashed_password VARCHAR(255) NOT NULL,     -- password hash
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- -- );


-- -- Student Table ---

-- -- create table student(
-- -- 	id int primary key auto_increment,
-- -- 	student_id varchar(100) unique,  --  -- roll no or school-defined ID
-- -- 	student_name varchar(100) not null,
-- -- 	class varchar(50) not null,
-- --     section varchar(10),
-- --     father_name varchar(100) not null,
-- --     mother_name varchar(100) not null,
-- --     dob date not null,
-- --     gender enum('Male', 'Female', 'Others'),
-- --     contact_no varchar(20),
-- --     email VARCHAR(100)
-- --     admission_year int,
-- --     prev_school_name varchar(200),
-- -- 	   stud_pic_url VARCHAR(250)
-- --     address varchar(255),
-- --     school_id int default null,
-- --     national_id varchar(100), -- can be aadhar or any other id
-- --     foreign key(school_id) references school_user(id)
-- --     ON UPDATE CASCADE
-- -- 	ON DELETE SET NULL,
-- -- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- -- );

-- -- ALTER TABLE student
-- -- modify COLUMN stud_pic_url VARCHAR(250);

-- -- fess ---

-- -- CREATE TABLE fees (
-- --     id INT PRIMARY KEY AUTO_INCREMENT,
-- --     student_id INT NOT NULL,
-- --     school_id INT,
-- --     
-- --     fee_type ENUM('Tuition', 'Transport', 'Lab', 'Admission', 'Other') DEFAULT 'Tuition',
-- --     total_amount DECIMAL(10,2) NOT NULL,
-- --     amount_paid DECIMAL(10,2) NOT NULL,
-- --     due_date DATE,
-- --     payment_date DATE,
-- --     payment_mode ENUM('Cash', 'Card', 'Online', 'UPI', 'Bank Transfer') DEFAULT 'Cash',
-- --     receipt_no VARCHAR(100),
-- --     discount DECIMAL(10,2) DEFAULT 0.00,
-- --     fine DECIMAL(10,2) DEFAULT 0.00,
-- --     balance DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - amount_paid - discount + fine) STORED,

-- --     remarks VARCHAR(255),
-- --     
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

-- --     FOREIGN KEY (student_id) REFERENCES student(id)
-- --         ON DELETE CASCADE
-- --         ON UPDATE CASCADE,

-- --     FOREIGN KEY (school_id) REFERENCES school_user(id)
-- --         ON DELETE SET NULL
-- --         ON UPDATE CASCADE
-- -- );


-- -- Fees History

-- -- CREATE TABLE fee_payments (
-- --     id INT PRIMARY KEY AUTO_INCREMENT,
-- --     student_id INT NOT NULL,
-- --     school_id INT,
-- --     fee_type ENUM('Tuition', 'Transport', 'Lab', 'Admission', 'Other'),
-- --     amount_paid DECIMAL(10,2) NOT NULL,
-- --     payment_date DATE NOT NULL,
-- --     month_for VARCHAR(20), -- Optional (e.g. "July 2025")
-- --     academic_year VARCHAR(10) NOT NULL,  -- e.g. '2024-25'
-- --     payment_mode ENUM('Cash', 'Card', 'Online', 'UPI', 'Bank Transfer') DEFAULT 'Cash',
-- --     receipt_no VARCHAR(100),
-- --     remarks VARCHAR(255),

-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

-- --     FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (school_id) REFERENCES school_user(id) ON DELETE SET NULL
-- -- );

-- -- ALTER TABLE student DROP INDEX student_id;
-- -- ALTER TABLE student ADD CONSTRAINT unique_student_in_school UNIQUE (student_id, school_id);

-- -- describe school_user;
--  -- select * from school_user;
 
-- --   ALTER TABLE student DROP INDEX email;
-- --   Alter table student ADD constraint unique_email_of_students_in_school unique (email, school_id); 
 
 
-- -- describe school_user;
-- -- Alter table student drop column student_id;
-- -- select * from student;
-- -- describe student;
-- -- describe fees;
-- -- describe fee_payments;
-- -- ALTER TABLE fees
-- -- ADD COLUMN month_for ENUM(
-- --   'January', 'February', 'March', 'April', 'May', 'June',
-- --   'July', 'August', 'September', 'October', 'November', 'December'
-- -- ) DEFAULT NULL AFTER fee_type,
-- -- ADD COLUMN academic_year VARCHAR(9) DEFAULT NULL AFTER month_for;
-- -- ALTER TABLE fee_payments
-- -- ADD COLUMN total_amount DECIMAL(10,2) DEFAULT 0.00,
-- -- ADD COLUMN due_date DATE DEFAULT NULL,
-- -- ADD COLUMN discount DECIMAL(10,2) DEFAULT 0.00,
-- -- ADD COLUMN fine DECIMAL(10,2) DEFAULT 0.00;

-- -- ALTER TABLE fee_payments
-- -- MODIFY COLUMN month_for ENUM(
-- --   'January','February','March','April','May','June',
-- --   'July','August','September','October','November','December'
-- -- ),
-- -- MODIFY COLUMN academic_year VARCHAR(9);
-- -- describe fees;
-- -- select * from school_user;
-- -- select * from student;
-- -- select * from fees;
-- -- select * from fee_payments;
-- -- select * from student;
-- -- CREATE TABLE teacher (
-- --   id INT AUTO_INCREMENT PRIMARY KEY,
-- --   name VARCHAR(100) NOT NULL,
-- --   email VARCHAR(100) UNIQUE NOT NULL,
-- --   password VARCHAR(255) NOT NULL, -- Added for authentication (hashed)
-- --   phone VARCHAR(15),
-- --   gender ENUM('male', 'female', 'other'),
-- --   dob DATE,
-- --   address TEXT,
-- --   qualification VARCHAR(100),
-- --   experience_years INT,
-- --   subject_specialty VARCHAR(255),
-- --   class_assigned VARCHAR(50),
-- --   school_id INT,
-- --   profile_pic_url TEXT,
-- --   joining_date DATE,
-- --   salary DECIMAL(10,2),
-- --   role ENUM('teacher', 'head_teacher', 'admin') DEFAULT 'teacher', -- Added for role-based access
-- --   is_active BOOLEAN DEFAULT true,
-- --   last_login DATETIME, -- Added to track login activity
-- --   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
-- --   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- --   FOREIGN KEY (school_id) REFERENCES school_user(id) ON DELETE CASCADE
-- -- );
-- -- select * from teacher;
-- -- describe teacher;

-- -- CREATE TABLE classes (
-- --     id INT AUTO_INCREMENT PRIMARY KEY,
-- --     class_name VARCHAR(10) NOT NULL,
-- --     section CHAR(1) NOT NULL,
-- --     class_teacher_id INT,
-- --     school_id INT NOT NULL,
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- --     FOREIGN KEY (class_teacher_id) REFERENCES teacher(id) ON DELETE SET NULL,
-- --     FOREIGN KEY (school_id) REFERENCES school_user(id) ON DELETE CASCADE,
-- --     UNIQUE (class_name, section, school_id)
-- -- );

-- -- select * from school_user;


-- -- Timetable table to store timetable slots for each class and school
-- -- CREATE TABLE timetable (
-- --     id INT AUTO_INCREMENT PRIMARY KEY,
-- --     school_id VARCHAR(50) NOT NULL,
-- --     class_id VARCHAR(50) NOT NULL,
-- --     class_name VARCHAR(100) NOT NULL,
-- --     school_days TEXT NOT NULL, -- Comma-separated list of days (e.g., "Monday,Tuesday,Wednesday,Thursday,Friday")
-- --     day VARCHAR(20) NOT NULL,
-- --     time_slot VARCHAR(50) NOT NULL,
-- --     subject VARCHAR(100),
-- --     teacher VARCHAR(100),
-- --     room VARCHAR(50),
-- --     UNIQUE KEY unique_slot (school_id, class_id, day, time_slot) -- Ensure unique slots per school, class, and day
-- -- );

-- -- -- Sample data for testing
-- -- INSERT INTO timetable (school_id, class_id, class_name, school_days, day, time_slot, subject, teacher, room) VALUES
-- -- ('SCH001', '10A', 'Class 10A', 'Monday,Tuesday,Wednesday,Thursday,Friday', 'Monday', '09:00 AM - 10:00 AM', 'Mathematics', 'Mr. Johnson', 'Room 101'),
-- -- ('SCH001', '10A', 'Class 10A', 'Monday,Tuesday,Wednesday,Thursday,Friday', 'Monday', '10:15 AM - 11:15 AM', 'Physics', 'Dr. Lee', 'Lab B'),
-- -- ('SCH001', '10B', 'Class 10B', 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', 'Tuesday', '09:00 AM - 10:00 AM', 'Biology', 'Dr. Brown', 'Lab C');

-- -- select * from timetable;
-- describe student;
-- -- describe school_user;


-- -- ALTER TABLE student
-- -- ADD username VARCHAR(100) UNIQUE AFTER email,
-- -- ADD hashed_password VARCHAR(255) NOT NULL AFTER username,
-- -- ADD status ENUM('active','inactive') DEFAULT 'active' AFTER hashed_password,
-- -- ADD last_login TIMESTAMP NULL DEFAULT NULL AFTER status;
-- -- select * from student;

-- -- UPDATE student
-- -- SET username = CONCAT(
-- --     LOWER(SUBSTRING_INDEX(student_name, ' ', 1)),         -- first name
-- --     DATE_FORMAT(dob, '%y%m%d'),                           -- YYMMDD from DOB
-- --     RIGHT(contact_no, 4)                                  -- last 4 of phone
-- -- )
-- -- WHERE username IS NULL;

-- CREATE TABLE attendance (
--     id int PRIMARY KEY AUTO_INCREMENT,
--     student_id int NOT NULL,
--     school_id int NOT NULL,
--     subject VARCHAR(255) NOT NULL,
--     date DATE NOT NULL,
--     status ENUM('Present','Absent') NOT NULL,
--     teacher_id int NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (student_id) REFERENCES student(id),
--     FOREIGN KEY (school_id) REFERENCES school_user(id),
--     FOREIGN KEY (teacher_id) REFERENCES teacher(id)
-- );

-- describe attendance;
-- SHOW CREATE TABLE teacher;
-- select * from school_user;
-- select * from student;