-- DropForeignKey
ALTER TABLE "Uploads" DROP CONSTRAINT "Uploads_id_fkey";

-- AlterTable
ALTER TABLE "Uploads" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
