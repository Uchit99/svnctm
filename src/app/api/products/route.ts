import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { scent: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        images: { orderBy: { order: 'asc' } },
        inventory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.product.count({ where });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        skip,
        take,
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
