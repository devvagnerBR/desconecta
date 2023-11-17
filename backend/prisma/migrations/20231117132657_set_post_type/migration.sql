-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('PUBLIC', 'COURSE');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'PUBLIC';
