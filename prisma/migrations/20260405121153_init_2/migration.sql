/*
  Warnings:

  - You are about to drop the column `NeedPasswordChange` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "NeedPasswordChange",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false;
