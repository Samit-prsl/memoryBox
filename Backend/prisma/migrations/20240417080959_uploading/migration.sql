-- CreateTable
CREATE TABLE "Uploads" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT,
    "pic" TEXT,
    "nft" TEXT,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uploads_avatar_key" ON "Uploads"("avatar");

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
