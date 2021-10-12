export default {
  saveUser: `
   INSERT INTO user_info (
    id,
    first_name,
    last_name,
    email,
    password,
    salt,
    phone_number
  ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
  `,
  findUserByEmail: `
    SELECT id, first_name, last_name, email,
    password, salt, payment_pointer, phone_number
    from user_info
    WHERE email = $1;
  `,
};
