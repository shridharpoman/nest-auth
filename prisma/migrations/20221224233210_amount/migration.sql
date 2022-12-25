/*
  Warnings:

  - Added the required column `amount` to the `transations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transations" ADD COLUMN     "amount" INTEGER NOT NULL;
