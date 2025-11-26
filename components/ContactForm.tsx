"use client";

import { BadgeCheck } from "lucide-react";
import React, { useState , useEffect , useRef } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Formule = {
  id: number;
  nom: string;
  prix: number;
  description: string | null;
  elements: string[];
  active: boolean;
};

registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {

  const [formules, setFormules] = useState<Formule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFormules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("formules")
      .select("*")
      .order("prix", { ascending: true });

    if (error) {
      console.error(error);
      setFormules([]);
    } else if (data) {
      setFormules(data.filter((f: any) => f.active));
    }
    setLoading(false);
  };

  const translations = {
    fr: {
      title: "Demande de reservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      clasicTableReservation: "Réservation classique pour une table",
      groupFormulaReservation: "Réservation pour un groupe avec formule",
      numberOfGuestsLabel: "Nombre de couverts",
      formulaSelectorLabel:"Le détails des fomrules est disponible sur notre page d'accueil. Pour chaque formule, indiquez la quantité souhaitée.",
      eventDateLabel: "Date",
      eventTimeLabel: "Heure",

      specialRequestsLabel: "Demandes speciales",
      submitButton: "ENVOYER LA DEMANDE",

      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,

      alertRestaurantClose: "Restaurant fermé tous les lundis et dimanches.",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      clasicTableReservation: "Standard table reservation",
      groupFormulaReservation: "Group reservation with package deal",
      numberOfGuestsLabel: "Number of people",
      formulaSelectorLabel:"Details of the packages are available on our homepage. For each package, please indicate the desired quantity.",
      eventDateLabel: "Date",
      eventTimeLabel: "Time",

      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",

      afterSentMessage: `Thank you for your booking request! A confirmation email will be sent to you shortly. Please check your mailbox.`,

      alertRestaurantClose: "Restaurant closed every Monday and Sunday.",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electronico",
      clasicTableReservation: "Reserva clásica para una mesa",
      groupFormulaReservation: "Reserva para un grupo con fórmula",
      numberOfGuestsLabel: "Numero de personas",
      formulaSelectorLabel:"Los detalles de los paquetes están disponibles en nuestra página de inicio. Indique la cantidad deseada para cada paquete.",
      eventDateLabel: "Fecha",
      eventTimeLabel: "Hora",

      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",

      afterSentMessage: `¡Gracias por su solicitud de reserva! Un correo electrónico de confirmación le será enviado en breve. Por favor, verifique su bandeja de entrada.`,

      alertRestaurantClose: "Restaurante cerrado todos los lunes y domingos.",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      clasicTableReservation: "Prenotazione classica per un tavolo",
      groupFormulaReservation: "Prenotazione per un gruppo con formula",
      numberOfGuestsLabel: "Numero di persone",
      formulaSelectorLabel:"I dettagli delle formule sono disponibili sulla nostra home page. Per ogni formula, indicare la quantità desiderata.",
      eventDateLabel: "Data",
      eventTimeLabel: "Ora",

      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",

      afterSentMessage: `Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve. Controlla la tua casella di posta.`,

      alertRestaurantClose: "Ristorante chiuso tutti i lunedì e domeniche.",
    },
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    tel: "",
    reservationTypeTable: Boolean(true),
    reservationTypeGroup: Boolean(false),
    resarvationType: "UNE TABLE",
    numberOfGuests: "",
    formuleQuantities: {} as Record<string, number>,
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
    reservationState: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Vérifier si le champ est une formule (id numérique)
    if (formules.some(f => f.id.toString() === name)) {
      const id = Number(name);
      setFormData({
        ...formData,
        formuleQuantities: {
          ...formData.formuleQuantities,
          [id]: Number(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFormuleChange = (id: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      formuleQuantities: {
        ...prev.formuleQuantities,
        [id]: Number(value), // on convertit en nombre
      },
    }));
  };


  const [eventDateTXT, setEventDateTXT] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!formRef.current) {
        console.error("Le formulaire n'est pas disponible !");
        return;
    }

    const formElement = formRef.current;

    Promise.all([
        emailjs.sendForm("service_pablo_001", "template_resa_001", formElement, "Hj5zsN3OJSMAXQ9TV"),
        emailjs.sendForm("service_pablo_001", "template_resa_002", formElement, "Hj5zsN3OJSMAXQ9TV")
    ])
    .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
    });
};

    const [openingHours, setOpeningHours] = useState<any[]>([]);
    const [holidays, setHolidays] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Charger les horaires et jours fériés depuis la DB
    useEffect(() => {
      async function fetchData() {
        // Opening hours
        const { data: hoursData, error: hoursError } = await supabase
          .from("opening_hours")
          .select("*")
          .eq("id", 1)
          .single();

        if (!hoursError && hoursData?.hours) {
          setOpeningHours(hoursData.hours); // tableau de 7 éléments correspondant aux jours de la semaine
        }

        // Holidays
        const { data: holidaysData, error: holidaysError } = await supabase
          .from("holidays")
          .select("periods");

        if (!holidaysError && holidaysData) {
          const allHolidayDates: Date[] = [];

          holidaysData.forEach((row: any) => {
            const periods = row.periods; // [{"debut": "...", "fin": "..."}]
            if (Array.isArray(periods)) {
              periods.forEach((p: any) => {
                const start = new Date(p.debut);
                const end = new Date(p.fin);

                // Ajouter tous les jours entre start et end
                for (
                  let d = new Date(start);
                  d <= end;
                  d.setDate(d.getDate() + 1)
                ) {
                  allHolidayDates.push(new Date(d)); // créer une nouvelle instance pour éviter les références
                }
              });
            }
          });

          setHolidays(allHolidayDates);
        }
      }

      fetchData();

      fetchFormules();
    }, []);

    // Vérifier si la date est un jour fermé
    const isDateClosed = (date: Date) => {
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // dimanche=6
      const dayHours = openingHours[dayIndex];
      if (!dayHours) return true;

      // Fermeture totale
      if (dayHours.closedDay) return true;

      // Vérifier jours fériés
      if (holidays.some(h => h.toDateString() === date.toDateString())) return true;

      return false;
    };

    const RESERVATION_LIMITS = {
      midi: {
        start: "12:00",
        end: "14:00"
      },
      soir: {
        start: "19:00",
        end: "23:00"
      }
    };

    // Fonction utilitaire pour convertir "HH:MM" en minutes (gérant le passage à minuit)
    const timeToMinutes = (time: string, afterMidnight: boolean = false) => {
      const [h, m] = time.split(":").map(Number);
      const minutes = h * 60 + m;
      // Si c'est après minuit (heures < 12 dans un contexte du soir), ajouter 24h
      return afterMidnight ? minutes + (24 * 60) : minutes;
    };

    // Modifiez la fonction getAvailableTimes
    const getAvailableTimes = (date: Date) => {
      if (!openingHours.length) return [];
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
      const dayHours = openingHours[dayIndex];
      if (!dayHours || dayHours.closedDay) return [];

      let times: string[] = [];

      const generateSlots = (start: string, end: string, limitStart: string, limitEnd: string) => {
        const slots: string[] = [];
        
        // Détecter si l'heure de fin passe minuit (ex: 02:00 après 19:00)
        const startHour = parseInt(start.split(":")[0]);
        const endHour = parseInt(end.split(":")[0]);
        const afterMidnight = endHour < startHour;
        
        // Convertir les heures en minutes
        const startMinutes = timeToMinutes(start, false);
        const endMinutes = timeToMinutes(end, afterMidnight);
        const limitStartMinutes = timeToMinutes(limitStart, false);
        const limitEndMinutes = timeToMinutes(limitEnd, false);
        
        // Utiliser les limites de réservation au lieu des horaires d'ouverture
        const effectiveStart = Math.max(startMinutes, limitStartMinutes);
        const effectiveEnd = Math.min(endMinutes, limitEndMinutes);
        
        let currentMinutes = effectiveStart;
        
        while (currentMinutes <= effectiveEnd) {
          const h = Math.floor(currentMinutes / 60) % 24; // Modulo 24 pour gérer le passage à minuit
          const m = currentMinutes % 60;
          const twoDigits = (n: number) => n.toString().padStart(2, "0");
          slots.push(`${twoDigits(h)}:${twoDigits(m)}`);
          currentMinutes += 30;
        }
        
        return slots;
      };

      // Midi - avec limites de réservation
      if (!dayHours.closedLunch && dayHours.midi.debut && dayHours.midi.fin) {
        times.push(...generateSlots(
          dayHours.midi.debut, 
          dayHours.midi.fin,
          RESERVATION_LIMITS.midi.start,
          RESERVATION_LIMITS.midi.end
        ));
      }

      // Soir - avec limites de réservation
      if (!dayHours.closedDiner && dayHours.soir.debut && dayHours.soir.fin) {
        times.push(...generateSlots(
          dayHours.soir.debut, 
          dayHours.soir.fin,
          RESERVATION_LIMITS.soir.start,
          RESERVATION_LIMITS.soir.end
        ));
      }

      return times;
    };

    // Handler de sélection de date
    const handleDateChange = (e: any) => {
      const date = new Date(e.target.value);
      if (isDateClosed(date)) {
        alert("Le restaurant est fermé ce jour.");
        e.target.value = "";
        setSelectedDate(null);
        setAvailableTimes([]);
        setSelectedValue("");
        return;
      }

      // Bloquer réservations pour le jour même après 16h
      const today = new Date();
      if (
        date.toDateString() === today.toDateString() && // même jour
        today.getHours() >= 16
      ) {
        alert("Les réservations pour le jour même sont fermées à partir de 16h.");
        setSelectedDate(null);
        setAvailableTimes([]);
        setSelectedValue("");
        return;
      }

      setSelectedDate(date);
      setAvailableTimes(getAvailableTimes(date));
      setSelectedValue("");
    };


    const generateFormulaTableHTML = () => {
      if (!formData.reservationTypeGroup) return "";

      const selectedFormulas = formules
        .map((f) => ({
          ...f,
          quantity: formData.formuleQuantities[f.id] || 0,
        }))
        .filter(f => f.quantity > 0);

      if (!selectedFormulas.length) return "";

      const total = selectedFormulas.reduce((sum, f) => sum + f.quantity * f.prix, 0);

      let tableHTML = `
        <table style="width:100%; border-collapse: collapse; margin:20px 0;">
          <thead>
            <tr style="background-color:#002E6D; color:white;">
              <th style="border:1px solid #ddd; padding:12px; text-align:left;">Formule</th>
              <th style="border:1px solid #ddd; padding:12px; text-align:center;">Quantité</th>
              <th style="border:1px solid #ddd; padding:12px; text-align:right;">Prix unitaire</th>
              <th style="border:1px solid #ddd; padding:12px; text-align:right;">Sous-total</th>
            </tr>
          </thead>
          <tbody>
      `;

      selectedFormulas.forEach((f, idx) => {
        const bgColor = idx % 2 === 0 ? "#f9f9f9" : "white";
        tableHTML += `
          <tr style="background-color:${bgColor};">
            <td style="border:1px solid #ddd; padding:10px;">${f.nom + ' - ' + f.prix}</td>
            <td style="border:1px solid #ddd; padding:10px; text-align:center;">${f.quantity}</td>
            <td style="border:1px solid #ddd; padding:10px; text-align:right;">${f.prix}€</td>
            <td style="border:1px solid #ddd; padding:10px; text-align:right;">${f.quantity * f.prix}€</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
          <tfoot>
            <tr style="background-color:#002E6D; color:white; font-weight:bold;">
              <td colspan="3" style="border:1px solid #ddd; padding:12px; text-align:right;">TOTAL</td>
              <td style="border:1px solid #ddd; padding:12px; text-align:right;">${total}€</td>
            </tr>
          </tfoot>
        </table>
      `;

      return tableHTML;
    };

    const generateFormulesJSON = () => {
      const selectedFormulas = formules.map(f => ({
        id: f.id,
        nom: f.nom,
        prix: f.prix,
        quantity: formData.formuleQuantities[f.id] || 0
      }))
      .filter(f => f.quantity > 0);

      return JSON.stringify(selectedFormulas);
    };

    const totalFormulesGuests = formules.reduce(
      (sum, f) => sum + Number(formData.formuleQuantities[f.id] || 0),
      0
    );

    const invitesValue =
    formData.resarvationType === "UN GROUPE"
      ? totalFormulesGuests
      : formData.numberOfGuests;

    const formulesJSON = generateFormulesJSON();
    const formulesEncoded = encodeURIComponent(formulesJSON);
    const reservationUrl = `https://latelier-de-lecharpe.vercel.app/reservation-autoreply?date=${encodeURIComponent(eventDateTXT)}&heure=${encodeURIComponent(selectedValue)}&invites=${encodeURIComponent(invitesValue)}&nom=${encodeURIComponent(formData.fullName)}&commentaire=${encodeURIComponent(formData.specialRequests)}&email=${encodeURIComponent(formData.email)}&tel=${encodeURIComponent(formData.tel)}&type=${encodeURIComponent(formData.resarvationType)}&formules=${formulesEncoded}`;


    const translation = translations[selectedLanguage as keyof typeof translations];

  return (
    <>
      {succeeded ? (
        <div className="flex flex-col lg:flex-row w-full h-96 justify-center px-4 items-center lg:space-x-3 text-[#002E6D]">
          <BadgeCheck />
          <p className="text-xl italic text-center">
            {translation.afterSentMessage}
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-8 py-16 bg-cream">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            //onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="reservationUrl" value={reservationUrl} />
            <input type="hidden" name="formulesJSON" value={formulesJSON} />
            <input type="hidden" name="eventDateTXT" value={eventDateTXT} />
            <input type="hidden" name="company" value="L'Aterlier de l'Écharpe" />
            <input type="hidden" name="emailCompany" value="pab.ortg@gmail.com" />
            <input type="hidden" name="reservationState" value="EN ATTENTE DE CONFIRMATION" />
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Veuillez noter que votre réservation ne sera confirmée qu’une fois que vous aurez reçu un mail de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !" />
            <input type="hidden" name="formulaTable" value={generateFormulaTableHTML()} />
            <input
              type="hidden"
              name="showFormulaTable"
              value={
                formData.reservationTypeGroup &&
                Object.values(formData.formuleQuantities).some(q => q > 0)
                  ? "OUI"
                  : "NON"
              }
            />
            <input type="hidden" name="reservationType" value={formData.resarvationType} />
            <div className="flex items-center justify-between flex-row pb-8">
              <h3 className="text-blueDark text-xl sm:text-3xl md:text-4xl lg:text-2xl font-medium font-specialElite leading-none">
                {translation.title}
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-md border border-blueDark text-xl px-2 py-1 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="fr">🇫🇷</option>
                <option value="en">🇬🇧</option>
                <option value="es">🇪🇸</option>
                <option value="it">🇮🇹</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-blueDark font-specialElite text-xl tracking-wide"
              >
                {translation.fullNameLabel}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-blueDark font-specialElite text-xl tracking-wide"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-blueDark font-specialElite text-xl tracking-wide"
              >
                TEL
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                required
              />
            </div>

            <div className="w-full flex flex-col justify-between items-center md:items-end space-y-8">
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-row justify-between">
                  <div className="font-specialElite text-blueDark text-lg">
                    {translation.clasicTableReservation}
                  </div>
                  <input
                    type="checkbox"
                    id="reservationType"
                    className="scale-150"
                    checked={formData.reservationTypeTable}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reservationTypeTable: e.target.checked,
                        reservationTypeGroup: false,
                        resarvationType: "UNE TABLE",
                      })
                    }
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="font-specialElite text-blueDark text-lg">
                    {translation.groupFormulaReservation}
                  </div>
                  <input
                    type="checkbox"
                    id="reservationType"
                    className="scale-150"
                    checked={formData.reservationTypeGroup}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reservationTypeGroup: e.target.checked,
                        reservationTypeTable: false,
                        resarvationType: "UN GROUPE",
                      })
                    }
                  />
                </div>
              </div>

              {formData.reservationTypeTable && (
                <div className="w-full">
                  <label
                    htmlFor="numberOfGuests"
                    className="block text-blueDark font-specialElite text-xl tracking-wide"
                  >
                    {translation.numberOfGuestsLabel}
                  </label>
                  <input
                    type="number"
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    min={1}
                    className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                    required
                  />
                </div>
              )}

              {formData.reservationTypeGroup && (
                <div className="w-full">
                  <p className="text-lg font-specialElite text-blueDark pb-4">
                    {translation.formulaSelectorLabel}
                  </p>
                  <div className="flex flex-col gap-3">
                    {formules.map(f => (
                      <div key={f.id} className="flex flex-row items-center justify-between ">
                        <label
                          className="block text-blueDark font-specialElite text-lg tracking-wide whitespace-nowrap"
                        >
                          {f.nom + " - " + f.prix + "€"}
                        </label>
                        <input
                          type="number"
                          id={`formule-${f.id}`}
                          name={f.id.toString()}
                          value={formData.formuleQuantities[f.id] || 0}
                          onChange={(e) => handleFormuleChange(f.id, e.target.value)}
                          min={0}
                          className="mt-1 block w-1/3 py-2 px-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500 start-0"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="number"
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={Object.values(formData.formuleQuantities).reduce((sum, q) => sum + Number(q || 0), 0)}
                    onChange={() => {}}
                    min={1}
                    className="hidden"
                    required
                  />
                </div>
              )}

              <div className="w-full">
                <div className="w-full flex flex-row items-end justify-between">
                  <label
                    htmlFor="eventDate"
                    className="block text-blueDark font-specialElite text-xl tracking-wide"
                  >
                    {translation.eventDateLabel}
                  </label>
                  <input
                    type="date"
                    id="datePicker"
                    name="eventDate"
                    value={selectedDate ? selectedDate.toISOString().split("T")[0] : Date()}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isDateClosed(date)) {
                        alert("Le restaurant est fermé ce jour.");
                        setSelectedDate(null);
                        setAvailableTimes([]);
                        setSelectedValue("");
                        return;
                      }
                      setSelectedDate(date);
                      setAvailableTimes(getAvailableTimes(date));
                      setSelectedValue("");
                      // Format pour EmailJS
                      const twoDigits = (num: number) => num.toString().padStart(2, "0");
                      setEventDateTXT(`${twoDigits(date.getDate())}-${twoDigits(date.getMonth() + 1)}-${date.getFullYear()}`);
                    }}
                    className="mt-1 block w-2/3 px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-row items-end justify-between">
                <label
                  htmlFor="eventTime"
                  className="block text-blueDark font-specialElite text-xl tracking-wide"
                >
                  {translation.eventTimeLabel}
                </label>
                <input
                  type="text"
                  name="eventTime"
                  value={selectedValue}
                  onClick={() => setIsOpen(!isOpen)}
                  readOnly
                  placeholder="Choisir une option"
                  className="mt-1 block w-2/3 px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                />
                {isOpen && selectedDate && (
                  <ul className="absolute w-1/4 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {availableTimes.map((time, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                        onClick={() => {
                          setSelectedValue(time);
                          setIsOpen(false);
                        }}
                      >
                        {time}
                      </li>
                    ))}
                    {availableTimes.length === 0 && (
                      <li className="px-4 py-2 text-gray-400">Aucun horaire disponible</li>
                    )}
                  </ul>
                )}         
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-blueDark font-specialElite text-xl tracking-wide"
              >
                {translation.specialRequestsLabel}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={4}
                value={formData.specialRequests}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blueDark rounded-sm py-3 text-lg font-semibold text-mustard hover:bg-mustard hover:text-blueDark duration-300 cursor-pointer font-specialElite"
            >
              {translation.submitButton}
            </button>
          </form>

          <div className="lg:w-1/3 w-5/6 z-30">
            <img
              src="/img/info/resume-page-cream.jpg"
              alt=""
              className="z-30 "
            />
            <div className="">
              <img
                src="/img/deco/12.png"
                alt=""
                className="z-30 "
              />
            </div>
          </div>

          <img
            src="/top-octopus.webp"
            alt=""
            className="absolute opacity-5 z-0 scale-150 top-20 lg:top-44 left-0 overflow-x-hidden"
          />
        </div>
      )}
    </>
  );
};

export default ReservationForm;
