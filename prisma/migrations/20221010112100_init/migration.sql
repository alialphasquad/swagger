/*
  Warnings:

  - The `order_by` column on the `wb_task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "wb_task" DROP COLUMN "order_by",
ADD COLUMN     "order_by" INTEGER;
