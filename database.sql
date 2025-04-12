
CREATE TABLE users (
    serial_number SERIAL PRIMARY KEY,    -- This column will automatically generate unique serial numbers
    id UUID DEFAULT gen_random_uuid(),   -- This column stores a unique identifier for each user
    name VARCHAR(100) NOT NULL,          -- This column stores the user's name
    email VARCHAR(255) UNIQUE NOT NULL,  -- This column stores the user's email address and ensures it's unique
    password VARCHAR(255) NOT NULL       -- This column stores the bcrypt hashed password
);