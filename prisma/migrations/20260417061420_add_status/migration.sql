-- CreateEnum
CREATE TYPE "CertStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "SustainabilityCert" ADD COLUMN     "status" "CertStatus" NOT NULL DEFAULT 'PENDING';
