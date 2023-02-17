/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Market_userId_key" ON "Market"("userId");
