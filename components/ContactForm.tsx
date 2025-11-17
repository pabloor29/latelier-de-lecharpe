"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState , useEffect , useRef } from "react";
import CustomTimePicker from "./CustomTimePicker";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";


registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {
  const translations = {
    fr: {
      title: "Demande de reservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      numberOfGuestsLabel: "Nombre de personnes",
      eventDateLabel: "Date",
      infoDateLabel: "(Fermé lundi et dimanche)",
      infoDateLabelSummer: "(Fermé dimanche et lundi midi)",
      infoDateLabelHollidays: "(Fermé en novembre, décembre, janvier et février)",
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
      numberOfGuestsLabel: "Number of people",
      eventDateLabel: "Date",
      infoDateLabel: "(Closed on Monday and Sunday)",
      infoDateLabelSummer: "(Closed on Sunday and Monday lunchtime)",
      infoDateLabelHollidays: "(Closed in November, December, January, and February)",
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
      numberOfGuestsLabel: "Numero de personas",
      eventDateLabel: "Fecha",
      infoDateLabel: "(Cerrado los lunes y domingos)",
      infoDateLabelSummer: "(Cerrado el domingo y el lunes al mediodía)",
      infoDateLabelHollidays: "(Cerrado en noviembre, diciembre, enero y febrero)",
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
      numberOfGuestsLabel: "Numero di persone",
      eventDateLabel: "Data",
      infoDateLabel: "(Chiuso il lunedì e la domenica)",
      infoDateLabelSummer: "(Chiuso la domenica e il lunedì a pranzo)",
      infoDateLabelHollidays: "(Chiuso a novembre, dicembre, gennaio e febbraio)",
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
    numberOfGuests: "",
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
    reservationType: "repas",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData.eventDate, formData.eventTime);
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const {
      fullName,
      email,
      numberOfGuests,
      eventDate,
      eventTime,
      specialRequests,
      reservationType,
    } = formData;

    const mailTo = "floridablanca22@gmail.com";
    const subject = `Table Reservation - Le ${eventDate} à ${eventTime}`;
    const body = `Full Name: ${fullName}\nEmail: ${email}\nNumber of Guests: ${numberOfGuests}\nDate and Time: ${eventDate}, ${eventTime}\nSpecial Requests: ${specialRequests}\nReservation Type: ${reservationType}`;

    window.location.href = `mailto:${mailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSucceeded(true);
  };

  const [eventDateTXT, setEventDateTXT] = useState("");

  useEffect(() => {
    const dateInput = document.getElementById("datePicker");

    const handleDateChange = (e: any) => {
      const date = new Date(e.target.value);
      setSelectedDate(date);
      const day = date.getDay();
      const numDay = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const twoDigits = (num: number) => num.toString().padStart(2, "0");

      setEventDateTXT(`${twoDigits(numDay)}-${twoDigits(month)}-${year}`);

      if ((day == 0 && month == 7) || (day == 0 && month == 8))
      {
        e.target.value = "";
      }
      else if ((day === 0 || day === 1) && (month != 7) && (month != 8))
      {
        e.target.value = "";
      }
      else if (month == 11 || month == 12 || month == 1 || month == 2)
      {
        e.target.value = "";
      }
    };

    if (dateInput)
    {
      dateInput.addEventListener("change", handleDateChange);
    }

    return () => {
      if (dateInput)
      {
        dateInput.removeEventListener("change", handleDateChange);
      }
    };
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
        console.error("Le formulaire n'est pas disponible !");
        return;
    }

    const formElement = formRef.current;

    Promise.all([
        emailjs.sendForm("service_floridablanca", "template_resa_001", formElement, "sCSQ7jBUlaWzqKf5_"),
        emailjs.sendForm("service_floridablanca", "template_resa_002", formElement, "sCSQ7jBUlaWzqKf5_")
    ])
    .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
    });
};

    const [isOpen, setIsOpen] = useState(false); 
    const [selectedValue, setSelectedValue] = useState("");
  
    const optionsTimeAllDay = ["12:00", "12:30", "13:00", "13:30", "14:00",
                              "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
                              ];

    const optionsTimeHalfDayEvening = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
                               ];
  
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
    };
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };

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
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-8 py-16">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            //onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="eventDateTXT" value={eventDateTXT} />
            <input type="hidden" name="company" value="FLORIDABLANCA" />
            <input type="hidden" name="emailCompany" value="floridablanca22@gmail.com" />
            <input type="hidden" name="reservationType" value="EN ATTENTE DE CONFIRMATION" />
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Veuillez noter que votre réservation ne sera confirmée qu’une fois que vous aurez reçu un mail de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !" />
            <div className="flex items-center justify-between lg:flex-row flex-col-reverse">
              <h3 className="text-[#002E6D] text-7xl font-medium font-spaceTransit leading-none">
                {translation.title}
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-md border border-[#597ba8] text-xl px-2 py-1 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
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
                className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
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

            <div className="flex flex-col lg:flex-row justify-between items-center md:items-end lg:space-x-10 space-y-8 lg:space-y-0">
              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="numberOfGuests"
                  className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
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

              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="eventDate"
                  className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
                >
                  {translation.eventDateLabel}
                </label>
                <input 
                  type="date" 
                  id="datePicker" 
                  name="eventDate" 
                  required
                  className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setSelectedDate(newDate);       // ✅ met à jour la date sélectionnée
                    setSelectedValue("");           // ✅ réinitialise l’horaire
                    setEventDateTXT(() => {
                      const day = newDate.getDate();
                      const month = newDate.getMonth() + 1;
                      const year = newDate.getFullYear();
                      const twoDigits = (n: number) => n.toString().padStart(2, "0");
                      return `${twoDigits(day)}-${twoDigits(month)}-${year}`;
                    });
                  }}
                />
                { selectedDate.getMonth() + 1 === 7 || selectedDate.getMonth() + 1 === 8 ? (
                  <p className="absolute w-content text-sm pt-1">
                    {translation.infoDateLabelSummer}
                  </p>
                ) : selectedDate.getMonth() + 1 === 11 || selectedDate.getMonth() + 1 === 12 || selectedDate.getMonth() + 1 === 1 || selectedDate.getMonth() + 1 === 2 ? (
                  <p className="absolute w-content text-sm pt-1">
                    {translation.infoDateLabelHollidays}
                  </p>
                ):(
                  <p className="absolute w-content text-sm pt-1">
                    {translation.infoDateLabel}
                  </p>
                )
                }
              </div>

              <div className="relative lg:w-1/2 w-full">
                <label
                  htmlFor="eventTime"
                  className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
                >
                  {translation.eventTimeLabel}
                </label>
                <input
                  type="text"
                  name="eventTime"
                  value={selectedValue}
                  onClick={toggleDropdown}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  placeholder="Choisir une option"
                />
                
                {isOpen && 
                (
                  selectedDate.getDay() === 1 ? (
                    <ul
                      className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {optionsTimeHalfDayEvening.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                          onClick={() => handleSelect(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  ):(
                    <ul
                      className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {optionsTimeAllDay.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                          onClick={() => handleSelect(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )
                )}            
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-lg font-medium text-[#002E6D] font-spaceTransit text-4xl tracking-wide"
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
              className="w-full bg-[#002E6D] rounded-sm py-3 text-lg font-semibold text-white hover:bg-[#295DA6] duration-300 cursor-pointer"
            >
              {translation.submitButton}
            </button>
          </form>

          <div className="lg:w-1/3 w-5/6 z-30">
            <img
              src="/IMG_0228.webp"
              alt=""
              className="shadow-[25px_15px_0_0_#002E6D] z-30"
            />
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
