const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', auth, async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
      include: { category: true }
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

module.exports = router;
