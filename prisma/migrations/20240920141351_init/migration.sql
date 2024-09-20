-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "minX" INTEGER NOT NULL,
    "maxX" INTEGER NOT NULL,
    "minY" INTEGER NOT NULL,
    "maxY" INTEGER NOT NULL,
    "illustration" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" TEXT NOT NULL,
    "illustration" TEXT NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);
