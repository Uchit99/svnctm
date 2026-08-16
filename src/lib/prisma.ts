import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

function createPrismaClient() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured. Add it to your deployment environment before using database features.');
  }

  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });
  if (process.env.NODE_ENV !== 'production') global.prisma = client;
  return client;
}

function getPrismaClient() {
  return global.prisma || createPrismaClient();
}

// Defer database initialization until a database operation is requested. Next.js
// evaluates route metadata during builds, when deployment secrets may not exist yet.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    return Reflect.get(getPrismaClient(), property);
  },
});
