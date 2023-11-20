INSERT INTO users (name, dni, email, password)
VALUES
    ('John Doe', '12345678A', 'john@example.com', 'password123'),
    ('Jane Smith', '98765432B', 'jane@example.com', 'securepass456'),
    ('Michael Johnson', '56789012C', 'michael@example.com', 'mysecretpass'),
    ('Emily Williams', '34567890D', 'emily@example.com', 'password987'),
    ('David Brown', '23456789E', 'david@example.com', 'brownpass123'),
    ('Sarah Lee', '45678901F', 'sarah@example.com', 'sarahpass789'),
    ('Robert Taylor', '78901234G', 'robert@example.com', 'taylorpass456'),
    ('Jessica Wilson', '89012345H', 'jessica@example.com', 'wilsonpass789');

INSERT INTO phone_numbers (user_id, phone_number)
VALUES
    (1, '1234567890'),
    (1, '9876543210'),
    (2, '5555555555'),
    (3, '1111111111'),
    (4, '2222222222'),
    (4, '3333333333'),
    (5, '4444444444'),
    (6, '6666666666'),
    (7, '7777777777'),
    (8, '8888888888');

