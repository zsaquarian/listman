/*
  Warnings:

  - The `sharedWith` column on the `SharedList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[sharedWith]` on the table `SharedList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SharedList" DROP COLUMN "sharedWith",
ADD COLUMN     "sharedWith" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "SharedList_sharedWith_key" ON "SharedList"("sharedWith");
