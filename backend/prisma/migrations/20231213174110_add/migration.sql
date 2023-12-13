-- DropForeignKey
ALTER TABLE "user_infos" DROP CONSTRAINT "user_infos_user_id_fkey";

-- AlterTable
ALTER TABLE "user_infos" ALTER COLUMN "address" SET DEFAULT 'Brasil',
ALTER COLUMN "phone" SET DEFAULT '00000000000',
ALTER COLUMN "birthday" SET DEFAULT '0000-00-00',
ALTER COLUMN "cep" SET DEFAULT '00000000';

-- AddForeignKey
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
