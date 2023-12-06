-- CreateTable
CREATE TABLE "user_infos" (
    "id" TEXT NOT NULL,
    "headline" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "birthday" TEXT,
    "links" JSONB,
    "user_id" TEXT,

    CONSTRAINT "user_infos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
