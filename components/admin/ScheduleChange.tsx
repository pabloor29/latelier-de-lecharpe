'use client'

import React, { useState } from "react";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

type TimeSlot = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
};

const defaultTimes: TimeSlot[] = days.map(() => ({
  midi: { debut: "", fin: "" },
  soir: { debut: "", fin: "" },
}));

const ClosedDays = {
    closedLunch: Boolean(false),
    closedDiner: Boolean(false),
    closedDay: Boolean(false),
};

function ScheduleChange() {

    const [times, setTimes] = useState<TimeSlot[]>(defaultTimes);

    const handleChange = (dayIndex: number, period: "midi" | "soir", field: "debut" | "fin", value: string) => {
        const updated = [...times];
        updated[dayIndex][period][field] = value;
        setTimes(updated);
    };

    return (
        <div>
            <h1 className="font-specialElite pb-2">
                Horraires d'ouveture
            </h1>

            <div className="">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                        <th className="border border-gray-300 px-2"> </th>
                        <th colSpan={2} className="border border-gray-300 px-2">midi</th>
                        <th colSpan={2} className="border border-gray-300 px-2">soir</th>
                        <th colSpan={3} className="border border-gray-300 px-2">jours de fermeture</th>
                        </tr>
                        <tr>
                        <th className="border border-gray-300 px-2"> </th>
                        <th className="border border-gray-300 px-2">début</th>
                        <th className="border border-gray-300 px-2">fin</th>
                        <th className="border border-gray-300 px-2">début</th>
                        <th className="border border-gray-300 px-2">fin</th>
                        <th className="border border-gray-300 px-2">fermé midi</th>
                        <th className="border border-gray-300 px-2">fermé soir</th>
                        <th className="border border-gray-300 px-2">fermé jour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, i) => (
                        <tr key={day}>
                            <td className="border border-gray-300 px-2">{day}</td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="time"
                                value={times[i].midi.debut}
                                onChange={(e) => handleChange(i, "midi", "debut", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="time"
                                value={times[i].midi.fin}
                                onChange={(e) => handleChange(i, "midi", "fin", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="time"
                                value={times[i].soir.debut}
                                onChange={(e) => handleChange(i, "soir", "debut", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="time"
                                value={times[i].soir.fin}
                                onChange={(e) => handleChange(i, "soir", "fin", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="checkbox"
                                value={times[i].soir.fin}
                                onChange={(e) => handleChange(i, "soir", "fin", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="checkbox"
                                value={times[i].soir.fin}
                                onChange={(e) => handleChange(i, "soir", "fin", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                            <td className="border border-gray-300 px-2">
                            <input
                                type="checkbox"
                                value={times[i].soir.fin}
                                onChange={(e) => handleChange(i, "soir", "fin", e.target.value)}
                                className="w-full bg-cream"
                            />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ScheduleChange