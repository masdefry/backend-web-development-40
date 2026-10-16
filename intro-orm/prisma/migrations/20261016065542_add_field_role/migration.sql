-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'STAFF');

-- AlterTable
ALTER TABLE "staffs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STAFF';
