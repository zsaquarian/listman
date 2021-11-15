-- CreateTable
CREATE TABLE "SharedList" (
    "id" SERIAL NOT NULL,
    "listUuid" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "sharedWith" TEXT NOT NULL,

    CONSTRAINT "SharedList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedList_listUuid_key" ON "SharedList"("listUuid");

-- CreateIndex
CREATE UNIQUE INDEX "SharedList_owner_key" ON "SharedList"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "SharedList_sharedWith_key" ON "SharedList"("sharedWith");
