/*
  Warnings:

  - You are about to drop the column `ownerUuid` on the `SharedList` table. All the data in the column will be lost.
  - Added the required column `owner` to the `SharedList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SharedList" DROP COLUMN "ownerUuid",
ADD COLUMN     "owner" TEXT NOT NULL;
