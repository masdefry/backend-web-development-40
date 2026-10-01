import express, { Request, Response } from 'express';
import fs from 'fs';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.post('/api/users', (req: Request, res: Response) => {
  try {
    // username, email, password, isVerified
    const { username, email, password, isVerified } = req.body;

    if (password.length < 8 || password.length > 15)
      throw {
        statusCode: 400,
        message: 'Password have between 5-15 characters',
      };

    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8'); // Buffer
    const users = JSON.parse(usersJSON);

    const isEmailExist = users?.data?.users.some((user: any) => {
      return user?.email === email;
    });

    if (isEmailExist)
      throw { statusCode: 409, message: 'Email is already exist' };

    users?.data?.users?.push({ username, email, password, isVerified });
    fs.writeFileSync('./src/database/users.json', JSON.stringify(users));

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        username,
        email,
        isVerified,
      },
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
