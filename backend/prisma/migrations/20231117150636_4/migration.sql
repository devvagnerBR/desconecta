/*
  Warnings:

  - You are about to drop the column `comment_id` on the `likes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_comment_id_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "comment_id";
