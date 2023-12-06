-- CreateEnum
CREATE TYPE "AvatarType" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "gender" "AvatarType" NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);
