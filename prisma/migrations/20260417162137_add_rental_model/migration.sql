-- CreateTable
CREATE TABLE "RentalSpace" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RentalSpace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentalSpace" ADD CONSTRAINT "RentalSpace_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
