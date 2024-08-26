USE company;

CREATE TABLE role  (
id INT auto_increment primary key, 
role varchar(50) not null unique
);

INSERT INTO role (id, role)
VALUES (1 , "President"), (2, "Manager"), (3, "Leader"), (4, "Staff");

ALTER TABLE employees
ADD COLUMN role_id INT(11),
ADD CONSTRAINT fk_role
FOREIGN KEY (role_id) REFERENCES Role(id);

SET SQL_SAFE_UPDATES = 0;

UPDATE employees e
JOIN Role r ON r.role = 'Manager'
SET e.role_id = r.id
WHERE e.jobTitle IN ('Sales Manager (APAC)', 'Sales Manager (EMEA)', 'Sales Manager (NA)');

UPDATE employees e
JOIN Role r ON r.role = 'Leader'
SET e.role_id = r.id
WHERE e.reportsTo IS NOT NULL AND
      (SELECT jobTitle FROM employees WHERE employeeNumber = e.reportsTo) LIKE '%Leader%';

UPDATE employees e
JOIN Role r ON r.role = 'Staff'
SET e.role_id = r.id
WHERE e.jobTitle IN ('Sales Rep', 'VP Sales', 'VP Marketing');

INSERT INTO employees (
  lastName,
  firstName,
  extension,
  email,
  officeCode,
  reportsTo,
  jobTitle
) VALUES (
  'Doe',
  'John',
  'x1234',
  'jdoe@example.com',
  '1',
  NULL,
  'Staff'
);

SELECT * FROM employees;

SELECT * FROM employees WHERE employeeNumber = 1002;

SELECT * FROM employees WHERE jobTitle = 'Manager';

UPDATE employees
SET email = 'newemail@example.com'
WHERE employeeNumber = 1002;

UPDATE employees
SET lastName = 'Smith', firstName = 'Jane'
WHERE employeeNumber = 1002;

DELETE FROM employees WHERE employeeNumber = 1002;

DELETE FROM employees WHERE jobTitle = 'Staff';

SELECT e.employeeNumber, 
       e.lastName, 
       e.firstName, 
       COUNT(c.customerNumber) AS customerCount
FROM employees e
LEFT JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
GROUP BY e.employeeNumber, e.lastName, e.firstName
ORDER BY customerCount DESC, e.employeeNumber;

SELECT o.officeCode, 
       o.city, 
       o.country, 
       COUNT(c.customerNumber) AS customerCount
FROM offices o
LEFT JOIN employees e ON o.officeCode = e.officeCode
LEFT JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
GROUP BY o.officeCode, o.city, o.country
ORDER BY customerCount DESC, o.officeCode;

SELECT e.employeeNumber, 
       e.lastName, 
       e.firstName, 
       e.jobTitle, 
       SUM(c.creditLimit) AS totalCreditLimit
FROM employees e
LEFT JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
GROUP BY e.employeeNumber, e.lastName, e.firstName, e.jobTitle
ORDER BY totalCreditLimit DESC, e.employeeNumber;

SELECT o.officeCode, 
       o.city, 
       o.country, 
       AVG(c.creditLimit) AS averageCreditLimit
FROM offices o
LEFT JOIN employees e ON o.officeCode = e.officeCode
LEFT JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
GROUP BY o.officeCode, o.city, o.country
ORDER BY averageCreditLimit DESC, o.officeCode;





