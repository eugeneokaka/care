"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type TimeSlot =
  | "SLOT_09_10"
  | "SLOT_10_11"
  | "SLOT_11_12"
  | "SLOT_12_13"
  | "SLOT_14_15";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

type Booking = {
  id: string;
  scheduledDate: string;
  timeSlot: TimeSlot;
  status: BookingStatus;
};

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<TimeSlot | "">("");
  const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const timeSlots: TimeSlot[] = [
    "SLOT_09_10",
    "SLOT_10_11",
    "SLOT_11_12",
    "SLOT_12_13",
    "SLOT_14_15",
  ];

  // Load booked slots for selected date
  useEffect(() => {
    if (!date) return;
    (async () => {
      try {
        const res = await fetch(`/api/bookings?date=${date}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBookedSlots(data.bookedSlots || []);
      } catch {
        toast.error("Failed to load booked slots");
      }
    })();
  }, [date]);

  // Load user bookings
  async function loadMyBookings() {
    try {
      setLoadingBookings(true);
      const res = await fetch(`/api/bookings/me`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMyBookings(data.bookings || []);
    } catch {
      toast.error("Failed to load your bookings");
    } finally {
      setLoadingBookings(false);
    }
  }

  useEffect(() => {
    loadMyBookings();
  }, []);

  // Create booking
  async function handleSubmit() {
    if (!date || !slot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, timeSlot: slot }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking created successfully!");
        setSlot("");

        // Refresh lists
        const refreshed = await fetch(`/api/bookings?date=${date}`);
        setBookedSlots((await refreshed.json()).bookedSlots || []);

        loadMyBookings();
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Cancel booking
  async function cancelBooking(bookingId: string) {
    try {
      setCancellingId(bookingId);
      const res = await fetch("/api/bookings/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: "CANCELLED" }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking cancelled.");
        loadMyBookings();
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch {
      toast.error("Something went wrong cancelling your booking.");
    } finally {
      setCancellingId(null);
    }
  }

  function statusColor(status: BookingStatus) {
    return cn(
      "px-2 py-0.5 rounded text-xs font-medium",
      status === "PENDING" && "bg-yellow-100 text-yellow-800",
      status === "CONFIRMED" && "bg-green-100 text-green-800",
      status === "CANCELLED" && "bg-red-100 text-red-800",
      status === "COMPLETED" && "bg-blue-100 text-blue-800"
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-8">
      {/* Booking form */}
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Time Slot</Label>
            <Select value={slot} onValueChange={(v) => setSlot(v as TimeSlot)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    disabled={bookedSlots.includes(s)}
                  >
                    {s.replace("SLOT_", "").replace("_", ":").replace("_", "-")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </CardContent>
      </Card>

      {/* My bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">
          My Bookings
        </h2>

        {/* Loading spinner */}
        {loadingBookings ? (
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading your bookings...
          </p>
        ) : myBookings.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You have no bookings yet.
          </p>
        ) : (
          <div className="space-y-3">
            {myBookings.map((b) => (
              <Card
                key={b.id}
                className="border border-muted/40 shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {new Date(b.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {b.timeSlot
                          .replace("SLOT_", "")
                          .replace("_", ":")
                          .replace("_", "-")}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={statusColor(b.status)}>{b.status}</span>

                      {/* Cancel button only for PENDING */}
                      {b.status === "PENDING" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={cancellingId === b.id}
                          onClick={() => cancelBooking(b.id)}
                        >
                          {cancellingId === b.id ? "Cancelling..." : "Cancel"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
