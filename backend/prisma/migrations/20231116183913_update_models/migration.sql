/*
  Warnings:

  - You are about to drop the `course_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "course_users" DROP CONSTRAINT "course_users_course_id_fkey";

-- DropForeignKey
ALTER TABLE "course_users" DROP CONSTRAINT "course_users_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "course_id" INTEGER;

-- DropTable
DROP TABLE "course_users";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
