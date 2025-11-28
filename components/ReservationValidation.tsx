"use client";

import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

interface Formule {
  id: string;
  nom: string;
  prix: number;
  quantity: number;
}

interface ReservationInfo {
  date?: string;
  heure?: string;
  invites?: string;
  nom?: string;
  commentaire?: string;
  email?: string;
  tel?: string;
  type?: string;
  formulesParsed?: Formule[];
}

const ReservationDetails = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null);
  const [reservationState, setreservationState] = useState("CONFIRMÉE");
  const [reservationComment, setReservationComment] = useState(
    "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée. Nous avons hâte de vous accueillir au restaurant pour passer un agréable moment ensemble. À très bientôt !"
  );

  const [shouldSendEmail, setShouldSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  /* -------------------------------------------------- */
  /*  LECTURE PARAMÈTRES URL + PARSING FORMULES         */
  /* -------------------------------------------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    let formulesParsed: Formule[] = [];
    const formulesEncoded = params.get("formulesJSON") || params.get("formules") || "";

    if (formulesEncoded) {
      try {
        formulesParsed = JSON.parse(decodeURIComponent(formulesEncoded));
      } catch (e) {
        console.error("Impossible de parser les formules JSON :", e);
      }
    }

    setReservationInfo({
      date: decodeURIComponent(params.get("date") || ""),
      heure: decodeURIComponent(params.get("heure") || ""),
      invites: decodeURIComponent(params.get("invites") || ""),
      nom: decodeURIComponent(params.get("nom") || ""),
      commentaire: decodeURIComponent(params.get("commentaire") || ""),
      email: decodeURIComponent(params.get("email") || ""),
      tel: decodeURIComponent(params.get("tel") || ""),
      type: decodeURIComponent(params.get("type") || "UNE TABLE"),
      formulesParsed,
    });
  }, []);

  /* -------------------------------------------------- */
  /*  ACTION BOUTONS                                    */
  /* -------------------------------------------------- */

  const handleReservationValid = () => {
    setreservationState("CONFIRMÉE");
    setReservationComment(
      "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée."
    );
    setShouldSendEmail(true);
  };

  const handleReservationRefuse = () => {
    setreservationState("REFUSÉE");
    setReservationComment(
      "Nous vous remercions pour votre demande. Malheureusement, nous ne pouvons pas l'accepter. Merci de votre compréhension."
    );
    setShouldSendEmail(true);
  };

  /* -------------------------------------------------- */
  /*  TABLE HTML EMAIL DYNAMIQUE                        */
  /* -------------------------------------------------- */
  const generateFormulaTableHTML = () => {
    if (!reservationInfo || reservationInfo.type !== "UN GROUPE") return "";
    const formulas = reservationInfo.formulesParsed || [];

    const selected = formulas.filter(f => Number(f.quantity) > 0);
    if (selected.length === 0) return "";

    const total = selected.reduce((sum, f) => sum + f.quantity * f.prix, 0);

    let html = `
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <thead>
          <tr style="background:#002E6D;color:white;">
            <th style="padding:10px;border:1px solid #ddd;text-align:left;">Formule</th>
            <th style="padding:10px;border:1px solid #ddd;text-align:center;">Qté</th>
            <th style="padding:10px;border:1px solid #ddd;text-align:right;">PU</th>
            <th style="padding:10px;border:1px solid #ddd;text-align:right;">Sous-total</th>
          </tr>
        </thead>
        <tbody>
    `;

    selected.forEach((f, i) => {
      const subtotal = f.quantity * f.prix;
      const bg = i % 2 === 0 ? "#f9f9f9" : "white";

      html += `
        <tr style="background:${bg}">
          <td style="padding:10px;border:1px solid #ddd;">${f.nom}</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:center;">${f.quantity}</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:right;">${f.prix}€</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:right;">${subtotal}€</td>
        </tr>
      `;
    });

    html += `
        </tbody>
        <tfoot>
          <tr style="background:#002E6D;color:white;font-weight:bold;">
            <td colspan="3" style="padding:10px;border:1px solid #ddd;text-align:right;">TOTAL</td>
            <td style="padding:10px;border:1px solid #ddd;text-align:right;">${total}€</td>
          </tr>
        </tfoot>
      </table>
    `;

    return html;
  };

  /* -------------------------------------------------- */
  /*  ENVOI EMAIL                                       */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (shouldSendEmail && !emailSent) {
      sendEmail();
      setShouldSendEmail(false);
    }
  }, [shouldSendEmail]);

  const sendEmail = () => {
    if (!formRef.current || !reservationInfo) return;

    const form = formRef.current;
    form.querySelector<HTMLInputElement>('[name="reservationState"]')!.value = reservationState;
    form.querySelector<HTMLInputElement>('[name="reservationComment"]')!.value = reservationComment;
    form.querySelector<HTMLInputElement>('[name="formulaTable"]')!.value = generateFormulaTableHTML();

    emailjs
      .sendForm("service_latelier_001", "template_resa_002", form, "pX7XynyhN5YVSroru")
      .then(() => {
        setEmailSent(true);
        alert("E-mail envoyé !");
      })
      .catch(err => {
        console.error(err);
        alert("Erreur lors de l'envoi.");
      });
  };

  /* -------------------------------------------------- */
  /*  CALCUL TOTAL DYNAMIQUE A L'ÉCRAN                 */
  /* -------------------------------------------------- */
  const calculateTotal = () => {
    if (!reservationInfo || reservationInfo.type !== "UN GROUPE") return 0;
    return reservationInfo.formulesParsed?.reduce((t, f) => t + f.quantity * f.prix, 0) || 0;
  };

  if (!reservationInfo) return <p>Chargement...</p>;

  const isGroup = reservationInfo.type === "UN GROUPE";

  /* -------------------------------------------------- */
  /*  RENDER                                             */
  /* -------------------------------------------------- */
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 shadow-lg bg-white rounded-2xl max-w-2xl w-full">

        <h2 className="text-2xl font-bold text-blue-900 mb-4">Demande de Réservation</h2>

        <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
          <p><strong>Date :</strong> {reservationInfo.date} à {reservationInfo.heure}</p>
          <p><strong>Invités :</strong> {reservationInfo.invites}</p>
          <p><strong>Nom :</strong> {reservationInfo.nom}</p>
          <p><strong>Téléphone :</strong> {reservationInfo.tel}</p>
          <p><strong>Email :</strong> {reservationInfo.email}</p>
          {reservationInfo.commentaire && (
            <p><strong>Commentaire :</strong> {reservationInfo.commentaire}</p>
          )}
        </div>

        {/* ---- TABLEAU FORMULES DYNAMIQUE ---- */}
        {isGroup && reservationInfo.formulesParsed && reservationInfo.formulesParsed.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Détail des formules</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 text-left">Formule</th>
                  <th className="p-3 text-center">Qté</th>
                  <th className="p-3 text-right">PU</th>
                  <th className="p-3 text-right">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                {reservationInfo.formulesParsed
                  .filter(f => f.quantity > 0)
                  .map((f, i) => (
                    <tr key={i} className={i % 2 ? "" : "bg-gray-50"}>
                      <td className="p-2 border">{f.nom}</td>
                      <td className="p-2 border text-center">{f.quantity}</td>
                      <td className="p-2 border text-right">{f.prix}€</td>
                      <td className="p-2 border text-right font-semibold">{f.prix * f.quantity}€</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-900 text-white font-bold">
                  <td colSpan={3} className="p-3 text-right">TOTAL</td>
                  <td className="p-3 text-right">{calculateTotal()}€</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Boutons */}
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={handleReservationRefuse} disabled={emailSent} className="bg-red-500 text-white px-6 py-3 rounded-lg">
            ❌ REFUSER
          </button>
          <button onClick={handleReservationValid} disabled={emailSent} className="bg-green-500 text-white px-6 py-3 rounded-lg">
            ✅ VALIDER
          </button>
        </div>

        {emailSent && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Email envoyé avec succès !
          </div>
        )}
      </div>

      {/* FORMULAIRE EMAILJS */}
      <form ref={formRef}>
        <input type="hidden" name="company" value="L'atelier de l'écharpe" />
        <input type="hidden" name="emailCompany" value="atelier1524@orange.fr" />
        <input type="hidden" name="reservationState" />
        <input type="hidden" name="reservationComment" />
        <input type="hidden" name="eventDateTXT" value={reservationInfo.date} />
        <input type="hidden" name="eventTime" value={reservationInfo.heure} />
        <input type="hidden" name="numberOfGuests" value={reservationInfo.invites} />
        <input type="hidden" name="fullName" value={reservationInfo.nom} />
        <input type="hidden" name="specialRequests" value={reservationInfo.commentaire} />
        <input type="hidden" name="email" value={reservationInfo.email} />
        <input type="hidden" name="tel" value={reservationInfo.tel} />
        <input type="hidden" name="reservationType" value={reservationInfo.type} />
        <input type="hidden" name="formulaTable" />
      </form>
    </div>
  );
};

export default ReservationDetails;
