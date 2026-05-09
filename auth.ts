import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, customers, orderStatusHistory } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { generateOrderNumber } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let allOrders;
    
    if (status) {
      allOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.status, status))
        .orderBy(desc(orders.createdAt))
        .limit(limit);
    } else {
      allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(limit);
    }

    return NextResponse.json({ orders: allOrders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      mobile,
      size,
      customSize,
      description,
      designImageUrl,
      productId,
      totalPrice,
      depositPaid,
      paymentMethod,
      isCustomOrder,
    } = body;

    if (!firstName || !lastName || !mobile) {
      return NextResponse.json(
        { error: 'First name, last name, and mobile are required' },
        { status: 400 }
      );
    }

    // Check if customer exists or create new
    const [existingCustomer] = await db
      .select()
      .from(customers)
      .where(eq(customers.mobile, mobile))
      .limit(1);

    let customerId = existingCustomer?.id;

    if (!existingCustomer) {
      const [newCustomer] = await db
        .insert(customers)
        .values({
          firstName,
          lastName,
          mobile,
        })
        .returning();
      customerId = newCustomer.id;
    }

    const orderNumber = generateOrderNumber();
    const deposit = depositPaid || (parseFloat(totalPrice || '0') * 0.5);
    const remaining = parseFloat(totalPrice || '0') - parseFloat(deposit.toString());

    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerId,
        firstName,
        lastName,
        mobile,
        productId: productId || null,
        size: size || null,
        customSize: customSize || null,
        description: description || null,
        designImageUrl: designImageUrl || null,
        totalPrice: totalPrice || '0',
        depositPaid: deposit.toString(),
        remainingAmount: remaining.toString(),
        paymentMethod: paymentMethod || null,
        status: 'pending',
        isCustomOrder: isCustomOrder !== undefined ? isCustomOrder : true,
        orderType: isCustomOrder ? 'custom' : 'ready',
      })
      .returning();

    // Create initial status history
    await db.insert(orderStatusHistory).values({
      orderId: newOrder.id,
      status: 'pending',
      notes: 'Order created',
    });

    // Update customer stats
    if (customerId) {
      await db
        .update(customers)
        .set({
          totalOrders: sql`${customers.totalOrders} + 1`,
          totalSpent: sql`${customers.totalSpent} + ${totalPrice || 0}`,
        })
        .where(eq(customers.id, customerId));
    }

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
