"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type MedicalHistory = {
  id: string;
  condition: string;
  notes?: string;
  diagnosedAt?: string;
};

type Allergy = {
  id: string;
  substance: string;
  reaction?: string;
  severity?: string;
};

export default function DashboardPage() {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [historyForm, setHistoryForm] = useState({ condition: "", notes: "" });
  const [allergyForm, setAllergyForm] = useState({
    substance: "",
    reaction: "",
    severity: "",
  });

  useEffect(() => {
    fetch("/api/medical-history")
      .then((res) => res.json())
      .then((data: MedicalHistory[]) => setMedicalHistory(data));

    fetch("/api/allergies")
      .then((res) => res.json())
      .then((data: Allergy[]) => setAllergies(data));
  }, []);

  async function addMedicalHistory() {
    const res = await fetch("/api/medical-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historyForm),
    });
    const data: MedicalHistory = await res.json();
    setMedicalHistory([...medicalHistory, data]);
    setHistoryForm({ condition: "", notes: "" });
  }

  async function addAllergy() {
    const res = await fetch("/api/allergies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allergyForm),
    });
    const data: Allergy = await res.json();
    setAllergies([...allergies, data]);
    setAllergyForm({ substance: "", reaction: "", severity: "" });
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Medical History */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Condition"
            value={historyForm.condition}
            onChange={(e) =>
              setHistoryForm({ ...historyForm, condition: e.target.value })
            }
          />
          <Input
            placeholder="Notes"
            value={historyForm.notes}
            onChange={(e) =>
              setHistoryForm({ ...historyForm, notes: e.target.value })
            }
          />
          <Button onClick={addMedicalHistory} className="md:w-32">
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicalHistory.map((h) => (
            <div
              key={h.id}
              className="border rounded-xl p-4 shadow-sm bg-blue-50"
            >
              <p className="font-semibold text-lg">{h.condition}</p>
              {h.notes && <p className="text-gray-700 mt-1">{h.notes}</p>}
              {h.diagnosedAt && (
                <p className="text-gray-500 text-sm mt-2">
                  Diagnosed: {new Date(h.diagnosedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Allergies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Allergies</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Substance"
            value={allergyForm.substance}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, substance: e.target.value })
            }
          />
          <Input
            placeholder="Reaction"
            value={allergyForm.reaction}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, reaction: e.target.value })
            }
          />
          <Input
            placeholder="Severity"
            value={allergyForm.severity}
            onChange={(e) =>
              setAllergyForm({ ...allergyForm, severity: e.target.value })
            }
          />
          <Button onClick={addAllergy} className="md:w-32">
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allergies.map((a) => (
            <div
              key={a.id}
              className="border rounded-xl p-4 shadow-sm bg-red-50"
            >
              <p className="font-semibold text-lg">{a.substance}</p>
              {a.reaction && (
                <p className="text-gray-700 mt-1">Reaction: {a.reaction}</p>
              )}
              {a.severity && (
                <p className="text-gray-700 mt-1">Severity: {a.severity}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
