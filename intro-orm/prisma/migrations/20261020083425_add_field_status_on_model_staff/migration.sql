-- CreateEnum
CREATE TYPE "StaffStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "staffs" ADD COLUMN     "status" "StaffStatus" NOT NULL DEFAULT 'UNVERIFIED',
ALTER COLUMN "password" SET DEFAULT 'Abc12345';
