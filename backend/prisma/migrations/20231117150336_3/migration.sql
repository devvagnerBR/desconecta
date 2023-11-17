/*
  Warnings:

  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `posts_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_likes" DROP CONSTRAINT "posts_likes_like_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_likes" DROP CONSTRAINT "posts_likes_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "postId";

-- DropTable
DROP TABLE "posts_likes";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
