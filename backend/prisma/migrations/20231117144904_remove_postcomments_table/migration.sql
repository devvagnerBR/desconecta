/*
  Warnings:

  - You are about to drop the `posts_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_comments" DROP CONSTRAINT "posts_comments_post_id_fkey";

-- DropTable
DROP TABLE "posts_comments";
