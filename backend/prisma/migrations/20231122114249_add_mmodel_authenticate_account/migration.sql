-- CreateTable
CREATE TABLE "authenticate_account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "authenticated_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "authenticate_account_pkey" PRIMARY KEY ("id")
);
