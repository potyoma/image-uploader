-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "comment" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
