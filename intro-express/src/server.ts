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

app.get('/api/users', (req: Request, res: Response) => {
  try {
    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8'); // Buffer
    const users = JSON.parse(usersJSON);

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users?.data?.users,
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.put('/api/users/:email', (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { username, password } = req.body;

    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8'); // Buffer
    const users = JSON.parse(usersJSON);

    const userIndex = users?.data?.users?.findIndex((user: any) => {
      return user?.email === email;
    });

    if (userIndex === -1)
      throw {
        statusCode: 404,
        message: `User with email = ${email} not found`,
      };
    
    users.data.users[userIndex] = {
      ...users?.data?.users[userIndex],
      username: username,
      password: password,
    };

    fs.writeFileSync('./src/database/users.json', JSON.stringify(users));

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        email,
        username,
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
