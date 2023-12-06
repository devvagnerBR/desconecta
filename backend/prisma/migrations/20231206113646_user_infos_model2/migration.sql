/*
  Warnings:

  - The primary key for the `user_infos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_infos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_infos` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `user_infos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user_infos" DROP CONSTRAINT "user_infos_user_id_fkey";

-- AlterTable
ALTER TABLE "user_infos" DROP CONSTRAINT "user_infos_pkey",
DROP COLUMN "id",
ALTER COLUMN "user_id" SET NOT NULL,
ADD CONSTRAINT "user_infos_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_infos_user_id_key" ON "user_infos"("user_id");

-- AddForeignKey
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
