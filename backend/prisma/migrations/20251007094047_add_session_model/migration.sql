-- CreateTable
CREATE TABLE "public"."Session" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FoundCharacters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FoundCharacters_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FoundCharacters_B_index" ON "public"."_FoundCharacters"("B");

-- AddForeignKey
ALTER TABLE "public"."_FoundCharacters" ADD CONSTRAINT "_FoundCharacters_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoundCharacters" ADD CONSTRAINT "_FoundCharacters_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
