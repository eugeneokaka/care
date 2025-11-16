import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

/**
 * GET /api/bookings/doctor
 * Fetch bookings (optionally filtered by date) for doctors/admins
 */
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || user.role === "PATIENT") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const url = new URL(req.url);
  const dateFilter = url.searchParams.get("date");

  let whereClause: any = {};
  if (dateFilter) {
    whereClause.scheduledDate = {
      gte: new Date(dateFilter + "T00:00:00"),
      lte: new Date(dateFilter + "T23:59:59"),
    };
  }

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    orderBy: [{ scheduledDate: "asc" }, { timeSlot: "asc" }],
    include: { user: true },
  });

  return NextResponse.json(bookings);
}

/**
 * PATCH /api/bookings/doctor
 * Allow doctors/admin to update booking status
 * Body: { bookingId: string, status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" }
 */
export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user || (user.role !== "DOCTOR" && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const { bookingId, status } = await req.json();

  const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking)
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return NextResponse.json(updated);
}
