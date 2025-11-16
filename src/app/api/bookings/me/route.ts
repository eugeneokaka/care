// src/app/api/bookings/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * GET /api/bookings/me
 * Returns all bookings belonging to the logged in user
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Find internal user
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Get user's bookings
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { scheduledDate: "asc" },
  });

  return NextResponse.json({ bookings });
}

/**
 * PATCH /api/bookings/me
 * Allows patient to update their own booking status (ONLY: PENDING → CANCELLED)
 */
export async function PATCH(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { bookingId, status } = await req.json();

  if (status !== "CANCELLED") {
    return NextResponse.json(
      { message: "Patients can only cancel bookings" },
      { status: 400 }
    );
  }

  // Fetch the booking to verify ownership + status
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  if (booking.userId !== user.id) {
    return NextResponse.json(
      { message: "You cannot modify another user's booking" },
      { status: 403 }
    );
  }

  if (booking.status !== "PENDING") {
    return NextResponse.json(
      { message: "Only PENDING bookings can be cancelled" },
      { status: 400 }
    );
  }

  // Update booking status → CANCELLED
  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ booking: updated });
}
