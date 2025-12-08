/*
  Warnings:

  - The values [CANCELED] on the enum `WashingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WashingStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Washing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Washing" ALTER COLUMN "status" TYPE "WashingStatus_new" USING ("status"::text::"WashingStatus_new");
ALTER TYPE "WashingStatus" RENAME TO "WashingStatus_old";
ALTER TYPE "WashingStatus_new" RENAME TO "WashingStatus";
DROP TYPE "public"."WashingStatus_old";
ALTER TABLE "Washing" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
