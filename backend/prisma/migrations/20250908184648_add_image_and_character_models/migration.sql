-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xPercent" DOUBLE PRECISION NOT NULL,
    "yPercent" DOUBLE PRECISION NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Character" ADD CONSTRAINT "Character_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
