const express = require("express");
const cors = require("cors");
const server = express();
server.use(express.json());
server.use(cors());
const PORT = 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function searchCompany(company) {
  return prisma.company.findUnique({
    where: {
      company,
    },
  });
}

// GET
server.get("/stockmarket/", async (req, res) => {
  const companys = await prisma.company.findMany();
  return res.json(companys);
});

server.get("/stockmarket/search/company/:company", async (req, res) => {
  const company = await prisma.company.findUnique({
    where: {
      company: req.params.company,
    },
  });

  return company
    ? res.json(company)
    : res.status(500).json(`Empresa não cadastrada`);
});

server.get("/stockmarket/search/ticket/:ticket", async (req, res) => {
  const ticket = await prisma.company.findUnique({
    where: {
      ticket: req.params.ticket,
    },
  });

  return ticket
    ? res.json(ticket)
    : res.status(500).json(`Nenhuma empresa cadastrada com o ticket informado`);
});

server.get("/stockmarket/search/type/:type", async (req, res) => {
  const companysType = await prisma.company.findMany({
    where: {
      type: req.params.type,
    },
  });

  return companysType
    ? res.json(companysType)
    : res.status(500).json(`Nenhuma empresa cadastrada`);
});

server.post("/stockmarket/", async (req, res) => {
  const companyExist = await searchCompany(req.body.company);
  const ticketExist = await prisma.company.findUnique({
    where: {
      ticket: req.body.ticket,
    },
  });

  if (companyExist || ticketExist) {
    return res.status(500).json(`Emmpresa ou ticket já cadastrado`);
  } else {
    const company = await prisma.company.create({
      data: req.body,
    });

    return res.json(company);
  }
});

server.delete("/stockmarket/:company", async (req, res) => {
  if (await searchCompany(req.params.company)) {
    const company = await prisma.company.delete({
      where: {
        company: req.params.company,
      },
    });
    return res.json(company);
  } else {
    return res.status(500).json(`Empresa não cadastrada`);
  }
});

server.put("/stockmarket/changeCompany", async (req, res) => {
  if (await searchCompany(req.body.company)) {
    const companyUpdate = await prisma.company.update({
      data: req.body,
      where: {
        company: req.body.company,
      },
    });
    return res.json(companyUpdate);
  } else {
    return res.status(500).json(`Empresa não possui cadastro`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running`);
});
