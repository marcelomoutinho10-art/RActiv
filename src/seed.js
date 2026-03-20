const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create user FLP (idempotent)
  const existing = await prisma.user.findUnique({ where: { username: 'FLP' } });
  if (!existing) {
    const hash = await bcrypt.hash('faalfaal', 10);
    await prisma.user.create({ data: { username: 'FLP', password: hash } });
    console.log('✅ User FLP created');
  } else {
    console.log('ℹ️  User FLP already exists');
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
