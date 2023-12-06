-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'OTHER', 'NOT_INFORMED');

-- AlterTable
ALTER TABLE "user_infos" ADD COLUMN     "gender" "GenderType" DEFAULT 'NOT_INFORMED',
ALTER COLUMN "headline" SET DEFAULT 'Não esquece de escrever um pouco sobre você! queremos te conhecer melhor 😊',
ALTER COLUMN "address" SET DEFAULT 'E se quiser, pode colocar seu endereço aqui também!',
ALTER COLUMN "phone" SET DEFAULT 'caso esteja se sentindo a vontade, pode colocar seu telefone aqui também!',
ALTER COLUMN "birthday" SET DEFAULT 'e sua data de aniversário é muito bem vinda!';
