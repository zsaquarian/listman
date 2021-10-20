/*
  Warnings:

  - A unique constraint covering the columns `[googleToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_googleToken_key" ON "User"("googleToken");
