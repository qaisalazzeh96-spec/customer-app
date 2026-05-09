import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, products, customers } from '@/db/schema';
import { sql, desc, eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Total orders
    const [totalOrdersResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders);
    const totalOrders = totalOrdersResult?.count || 0;

    // Total revenue
    const [totalRevenueResult] = await db
      .select({ total: sql<string>`COALESCE(SUM(${orders.totalPrice}), 0)` })
      .from(orders);
    const totalRevenue = parseFloat(totalRevenueResult?.total || '0');

    // Total customers
    const [totalCustomersResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(customers);
    const totalCustomers = totalCustomersResult?.count || 0;

    // Pending orders
    const [pendingOrdersResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(eq(orders.status, 'pending'));
    const pendingOrders = pendingOrdersResult?.count || 0;

    // Top selling products
    const topProducts = await db
      .select({
        id: products.id,
        name: products.name,
        totalSold: products.totalSold,
        imageUrl: products.imageUrl,
      })
      .from(products)
      .orderBy(desc(products.totalSold))
      .limit(5);

    // Top customers
    const topCustomers = await db
      .select({
        id: customers.id,
        firstName: customers.firstName,
        lastName: customers.lastName,
        totalOrders: customers.totalOrders,
        totalSpent: customers.totalSpent,
      })
      .from(customers)
      .orderBy(desc(customers.totalSpent))
      .limit(5);

    // Sales by month (last 12 months)
    const salesByMonth = await db
      .select({
        month: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        totalSales: sql<string>`SUM(${orders.totalPrice})`,
        orderCount: sql<number>`count(*)::int`,
      })
      .from(orders)
      .where(sql`${orders.createdAt} >= NOW() - INTERVAL '12 months'`)
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    // Top selling sizes
    const topSizes = await db
      .select({
        size: orders.size,
        count: sql<number>`count(*)::int`,
      })
      .from(orders)
      .where(sql`${orders.size} IS NOT NULL`)
      .groupBy(orders.size)
      .orderBy(desc(sql<number>`count(*)`))
      .limit(5);

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        pendingOrders,
      },
      topProducts,
      topCustomers,
      salesByMonth,
      topSizes,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
