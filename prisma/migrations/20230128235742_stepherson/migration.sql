-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "ticket" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_key" ON "Company"("company");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ticket_key" ON "Company"("ticket");
