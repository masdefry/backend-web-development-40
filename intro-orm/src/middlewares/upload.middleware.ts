import { AppError } from '../errors/app.error';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export const uploadMiddleware = (allowedFileExtensions: string[]) => {
  const storage = multer.diskStorage({
    destination: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) {
      const dirPath = path.join(process.cwd());
      cb(null, `${dirPath}/src/uploads`);
    },
    filename: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) {
      const fileextension = file?.originalname?.split('.').pop();
      const filename = `${Date.now()}-${Math.floor(10000 + Math.random() * 90000)}.${fileextension}`;
      cb(null, filename);
    },
  });

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) {
    const fileextension = file?.originalname?.split('.').pop();

    if (!allowedFileExtensions.includes(fileextension!))
      cb(new AppError(415, 'File extension not allowed'));

    cb(null, true);
  }

  return multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  });
};
