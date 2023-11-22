/*
  Warnings:

  - You are about to drop the column `authenticated_at` on the `authenticate_account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authenticate_account" DROP COLUMN "authenticated_at";
