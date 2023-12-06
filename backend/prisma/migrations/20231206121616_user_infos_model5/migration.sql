/*
  Warnings:

  - The primary key for the `user_infos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_infos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_infos" DROP CONSTRAINT "user_infos_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_infos_pkey" PRIMARY KEY ("user_id");
