"use client";

import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

interface ReservationInfo {
  date?: string;
  heure?: string;
  invites?: string;
  nom?: string;
  commentaire?: string;
  email?: string;
}

const ReservationDetails = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null);
  const [reservationType, setReservationType] = useState("CONFIRMÉE");
  const [reservationComment, setReservationComment] = useState(
    "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée. Nous avons hâte de vous accueillir au restaurant pour passer un agréable moment ensemble. À très bientôt !"
  );

  const [shouldSendEmail, setShouldSendEmail] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReservationInfo({
      date: params.get("date") || "",
      heure: params.get("heure") || "",  
      invites: params.get("invites") || "",
      nom: params.get("nom") || "",
      commentaire: params.get("commentaire") || "",
      email: params.get("email") || "",
    });
  }, []);

  const handleReservationValid = () => {
    setReservationType("CONFIRMÉE");
    setReservationComment(
      "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée. Nous avons hâte de vous accueillir au restaurant pour passer un agréable moment ensemble. À très bientôt !"
    );

    setShouldSendEmail(true);

    // sendEmail();

    //alert('Confirmation de réservation.');
  };

  const handleReservationRefuse = () => {
    setReservationType("REFUSÉE");
    setReservationComment(
      "Nous vous remercions pour votre réservation. Malheureusement, nous ne pouvons pas l'accepter pour le moment. Nous sommes désolés pour ce contretemps et espérons avoir l'occasion de vous accueillir une prochaine fois. N'hésitez pas à reprogrammer votre réservation à une autre date. À bientôt !"
    );

    setShouldSendEmail(true);

    //sendEmail();

    //alert('Refus de réservation.');
  };

  useEffect(() => {
    if (shouldSendEmail) {
      sendEmail();
      setShouldSendEmail(false);
    }
  }, [shouldSendEmail, reservationType, reservationComment]);

  const sendEmail = () => {
    if (!formRef.current) {
      console.error("Le formulaire n'est pas disponible !");
      return;
    }

    const formElement = formRef.current;
    const reservationTypeInput = formElement.querySelector('[name="reservationType"]') as HTMLInputElement;
    const reservationCommentInput = formElement.querySelector('[name="reservationComment"]') as HTMLInputElement;

    if (reservationTypeInput && reservationCommentInput) {
      reservationTypeInput.value = reservationType;
      reservationCommentInput.value = reservationComment;
    }

    emailjs.sendForm("service_floridablanca", "template_resa_002", formElement, "sCSQ7jBUlaWzqKf5_")
      .then(() => {
        formRef.current?.reset();
        // alert(`E-mail envoyé avec succès !`);
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
        // alert(`Echec de l'envoie !`);
      });
  };

  // Utilisation de la gestion conditionnelle ici
  if (!reservationInfo) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 text-center shadow-lg bg-white rounded-2xl max-w-sm">
        <h2 className="text-xl font-semibold">Demande de Réservation</h2>
        <p className="text-gray-600 mt-2">
          <strong>📅 Date :</strong> {reservationInfo?.date || "Non précisé"} à {reservationInfo?.heure || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>👥 Nombre d'invités :</strong> {reservationInfo?.invites || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>👤 Nom :</strong> {reservationInfo?.nom || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>💬 Commentaire :</strong> {reservationInfo?.commentaire || "Aucun commentaire"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>✉️ Email :</strong> {reservationInfo?.email || "Non précisé"}
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleReservationRefuse}
          >
            REFUSER
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleReservationValid}
          >
            VALIDER
          </button>
        </div>
      </div>
      <form ref={formRef}>
        <input type="hidden" name="company" value="FLORIDABLANCA" />
        <input type="hidden" name="emailCompany" value="floridablanca22@gmail.com" />
        <input type="hidden" name="reservationType" value={reservationType} />
        <input type="hidden" name="reservationComment" value={reservationComment} />
        <input type="hidden" name="eventDateTXT
        " value={reservationInfo?.date || ""} />
        <input type="hidden" name="eventTime" value={reservationInfo?.heure || ""} />
        <input type="hidden" name="numberOfGuests" value={reservationInfo?.invites || ""} />
        <input type="hidden" name="fullName" value={reservationInfo?.nom || ""} />
        <input type="hidden" name="specialRequests" value={reservationInfo?.commentaire || ""} />
        <input type="hidden" name="email" value={reservationInfo?.email || ""} />
      </form>
    </div>
  );
};

export default ReservationDetails;
