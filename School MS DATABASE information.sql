use schoolmaster;


-- School User ---

-- CREATE TABLE school_user (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(200) NOT NULL,                -- school name
--     email VARCHAR(200) NOT NULL UNIQUE,        -- school login email
--     phone VARCHAR(15) NOT NULL unique,         -- store as VARCHAR to support country codes
--     address VARCHAR(255),
--     logo_url VARCHAR(500),
--     subscription_plan ENUM('Paid', 'Free') DEFAULT 'Free',
--     hashed_password VARCHAR(255) NOT NULL,     -- password hash
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );


-- Student Table ---

-- create table student(
-- 	id int primary key auto_increment,
-- 	student_id varchar(100) unique,  --  -- roll no or school-defined ID
-- 	student_name varchar(100) not null,
-- 	class varchar(50) not null,
--     section varchar(10),
--     father_name varchar(100) not null,
--     mother_name varchar(100) not null,
--     dob date not null,
--     gender enum('Male', 'Female', 'Others'),
--     contact_no varchar(20),
--     email VARCHAR(100)
--     admission_year int,
--     prev_school_name varchar(200),
-- 	   stud_pic_url VARCHAR(250)
--     address varchar(255),
--     school_id int default null,
--     national_id varchar(100), -- can be aadhar or any other id
--     foreign key(school_id) references school_user(id)
--     ON UPDATE CASCADE
-- 	ON DELETE SET NULL,
-- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- ALTER TABLE student
-- modify COLUMN stud_pic_url VARCHAR(250);

-- fess ---

-- CREATE TABLE fees (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     student_id INT NOT NULL,
--     school_id INT,
--     
--     fee_type ENUM('Tuition', 'Transport', 'Lab', 'Admission', 'Other') DEFAULT 'Tuition',
--     total_amount DECIMAL(10,2) NOT NULL,
--     amount_paid DECIMAL(10,2) NOT NULL,
--     due_date DATE,
--     payment_date DATE,
--     payment_mode ENUM('Cash', 'Card', 'Online', 'UPI', 'Bank Transfer') DEFAULT 'Cash',
--     receipt_no VARCHAR(100),
--     discount DECIMAL(10,2) DEFAULT 0.00,
--     fine DECIMAL(10,2) DEFAULT 0.00,
--     balance DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - amount_paid - discount + fine) STORED,

--     remarks VARCHAR(255),
--     
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

--     FOREIGN KEY (student_id) REFERENCES student(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE,

--     FOREIGN KEY (school_id) REFERENCES school_user(id)
--         ON DELETE SET NULL
--         ON UPDATE CASCADE
-- );


-- Fees History

-- CREATE TABLE fee_payments (           -- fee history
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     student_id INT NOT NULL,
--     school_id INT,
--     fee_type ENUM('Tuition', 'Transport', 'Lab', 'Admission', 'Other'),
--     amount_paid DECIMAL(10,2) NOT NULL,
--     payment_date DATE NOT NULL,
--     month_for VARCHAR(20), -- Optional (e.g. "July 2025")
--     academic_year VARCHAR(10) NOT NULL,  -- e.g. '2024-25'
--     payment_mode ENUM('Cash', 'Card', 'Online', 'UPI', 'Bank Transfer') DEFAULT 'Cash',
--     receipt_no VARCHAR(100),
--     remarks VARCHAR(255),

--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

--     FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
--     FOREIGN KEY (school_id) REFERENCES school_user(id) ON DELETE SET NULL
-- );


describe fees_payments;


