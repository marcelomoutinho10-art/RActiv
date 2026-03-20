const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

function getDateRange(filter, from, to) {
  const now = new Date();
  if (filter === 'today') {
    const start = new Date(now); start.setHours(0,0,0,0);
    const end = new Date(now); end.setHours(23,59,59,999);
    return { start, end };
  }
  if (filter === 'week') {
    const day = now.getDay();
    const diff = (day === 0 ? -6 : 1 - day); // Monday start
    const start = new Date(now);
    start.setDate(now.getDate() + diff);
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23,59,59,999);
    return { start, end };
  }
  if (filter === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { start, end };
  }
  if (filter === 'custom' && from && to) {
    return {
      start: new Date(from + 'T00:00:00'),
      end: new Date(to + 'T23:59:59')
    };
  }
  // Default: this month
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

router.get('/', auth, async (req, res) => {
  try {
    const { filter, from, to, categoryId, projectId } = req.query;
    const { start, end } = getDateRange(filter, from, to);

    const where = {
      date: { gte: start, lte: end }
    };
    if (projectId) where.projectId = parseInt(projectId);
    if (categoryId) where.project = { categoryId: parseInt(categoryId) };

    const entries = await prisma.activityEntry.findMany({
      where,
      orderBy: [{ date: 'asc' }, { project: { category: { order: 'asc' } } }, { project: { order: 'asc' } }],
      include: {
        project: {
          include: { category: true }
        }
      }
    });

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Daily totals
router.get('/daily-totals', auth, async (req, res) => {
  try {
    const { filter, from, to } = req.query;
    const { start, end } = getDateRange(filter, from, to);

    const entries = await prisma.activityEntry.findMany({
      where: { date: { gte: start, lte: end } },
      select: { date: true, hours: true }
    });

    const totals = {};
    for (const e of entries) {
      const key = e.date.toISOString().slice(0, 10);
      totals[key] = (totals[key] || 0) + e.hours;
    }

    res.json(totals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

module.exports = router;
