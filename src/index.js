const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const entriesRoutes = require('./routes/entries');
const categoriesRoutes = require('./routes/categories');
const projectsRoutes = require('./routes/projects');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// API
app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/projects', projectsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// React static (production)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ RActiv running on port ${PORT}`);
});
