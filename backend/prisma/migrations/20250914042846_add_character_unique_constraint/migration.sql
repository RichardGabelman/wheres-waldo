/*
  Warnings:

  - A unique constraint covering the columns `[name,imageId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_name_imageId_key" ON "public"."Character"("name", "imageId");
