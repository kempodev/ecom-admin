/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalPrice",
ADD COLUMN     "totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- Update existing OrderItem rows with product prices
UPDATE "OrderItem"
SET price = "Product".price
FROM "Product"
WHERE "OrderItem"."productId" = "Product".id;

-- Update Order totalAmount
UPDATE "Order"
SET "totalAmount" = subquery.total
FROM (
    SELECT "orderId", SUM(price * quantity) as total
    FROM "OrderItem"
    GROUP BY "orderId"
) AS subquery
WHERE "Order".id = subquery."orderId";