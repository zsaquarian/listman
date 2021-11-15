/*
  Warnings:

  - You are about to drop the column `owner` on the `SharedList` table. All the data in the column will be lost.
  - Added the required column `ownerUuid` to the `SharedList` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SharedList_owner_key";

-- DropIndex
DROP INDEX "SharedList_sharedWith_key";

-- AlterTable
ALTER TABLE "SharedList" DROP COLUMN "owner",
ADD COLUMN     "ownerUuid" TEXT NOT NULL;
