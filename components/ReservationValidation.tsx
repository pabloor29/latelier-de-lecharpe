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
  tel?: string;
  type?: string;
  formule1?: string;
  formule2?: string;
  formule3?: string;
  formule4?: string;
  formule5?: string;
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const info = {
      date: decodeURIComponent(params.get("date") || ""),
      heure: decodeURIComponent(params.get("heure") || ""),  
      invites: decodeURIComponent(params.get("invites") || ""),
      nom: decodeURIComponent(params.get("nom") || ""),
      commentaire: decodeURIComponent(params.get("commentaire") || ""),
      email: decodeURIComponent(params.get("email") || ""),
      tel: decodeURIComponent(params.get("tel") || ""),
      type: decodeURIComponent(params.get("type") || "UNE TABLE"),
      formule1: params.get("f1") || "0",
      formule2: params.get("f2") || "0",
      formule3: params.get("f3") || "0",
      formule4: params.get("f4") || "0",
      formule5: params.get("f5") || "0",
    };
    
    console.log("Informations récupérées:", info);
    setReservationInfo(info);
  }, []);

  const handleReservationValid = () => {
    setreservationState("CONFIRMÉE");
    setReservationComment(
      "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée. Nous avons hâte de vous accueillir au restaurant pour passer un agréable moment ensemble. À très bientôt !"
    );
    setShouldSendEmail(true);
  };

  const handleReservationRefuse = () => {
    setreservationState("REFUSÉE");
    setReservationComment(
      "Nous vous remercions pour votre réservation. Malheureusement, nous ne pouvons pas l'accepter pour le moment. Nous sommes désolés pour ce contretemps et espérons avoir l'occasion de vous accueillir une prochaine fois. N'hésitez pas à reprogrammer votre réservation à une autre date. À bientôt !"
    );
    setShouldSendEmail(true);
  };

  const generateFormulaTableHTML = () => {
    if (!reservationInfo || reservationInfo.type !== "UN GROUPE") return "";
    
    const formulas = [
      { label: "Formule à 32€", quantity: reservationInfo.formule1 || "0", price: 32 },
      { label: "Formule à 35€", quantity: reservationInfo.formule2 || "0", price: 35 },
      { label: "Formule à 38€", quantity: reservationInfo.formule3 || "0", price: 38 },
      { label: "Formule à 49€", quantity: reservationInfo.formule4 || "0", price: 49 },
      { label: "Formule à 55€", quantity: reservationInfo.formule5 || "0", price: 55 },
    ];

    const selectedFormulas = formulas.filter(f => Number(f.quantity) > 0);
    
    if (selectedFormulas.length === 0) return "";

    const total = selectedFormulas.reduce(
      (sum, f) => sum + Number(f.quantity) * f.price, 
      0
    );

    let tableHTML = `
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #002E6D; color: white;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Formule</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Quantité</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Prix unitaire</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Sous-total</th>
          </tr>
        </thead>
        <tbody>
    `;

    selectedFormulas.forEach((formula, index) => {
      const subtotal = Number(formula.quantity) * formula.price;
      const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';
      tableHTML += `
        <tr style="background-color: ${bgColor};">
          <td style="border: 1px solid #ddd; padding: 10px;">${formula.label}</td>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${formula.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">${formula.price}€</td>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">${subtotal}€</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
        <tfoot>
          <tr style="background-color: #002E6D; color: white; font-weight: bold;">
            <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;">TOTAL</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${total}€</td>
          </tr>
        </tfoot>
      </table>
    `;

    return tableHTML;
  };

  useEffect(() => {
    if (shouldSendEmail && !emailSent) {
      sendEmail();
      setShouldSendEmail(false);
    }
  }, [shouldSendEmail, reservationState, reservationComment, emailSent]);

  const sendEmail = () => {
    if (!formRef.current || !reservationInfo) {
      console.error("Le formulaire ou les infos ne sont pas disponibles !");
      return;
    }

    const formElement = formRef.current;
    
    // Mise à jour des champs avant envoi
    const reservationStateInput = formElement.querySelector('[name="reservationState"]') as HTMLInputElement;
    const reservationCommentInput = formElement.querySelector('[name="reservationComment"]') as HTMLInputElement;
    const formulaTableInput = formElement.querySelector('[name="formulaTable"]') as HTMLInputElement;

    if (reservationStateInput) reservationStateInput.value = reservationState;
    if (reservationCommentInput) reservationCommentInput.value = reservationComment;
    if (formulaTableInput) formulaTableInput.value = generateFormulaTableHTML();

    console.log("Envoi email avec:", {
      type: reservationState,
      reservationState: reservationInfo.type,
      tel: reservationInfo.tel,
      formulaTable: generateFormulaTableHTML()
    });

    emailjs.sendForm("service_pablo_001", "template_resa_002", formElement, "Hj5zsN3OJSMAXQ9TV")
      .then(() => {
        setEmailSent(true);
        alert(`E-mail de ${reservationState === "CONFIRMÉE" ? "confirmation" : "refus"} envoyé avec succès !`);
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert(`Échec de l'envoi !`);
      });
  };

  const calculateTotal = () => {
    if (!reservationInfo || reservationInfo.type !== "UN GROUPE") return 0;
    
    const formulas = [
      { quantity: reservationInfo.formule1, price: 32 },
      { quantity: reservationInfo.formule2, price: 35 },
      { quantity: reservationInfo.formule3, price: 38 },
      { quantity: reservationInfo.formule4, price: 49 },
      { quantity: reservationInfo.formule5, price: 55 },
    ];

    return formulas.reduce((sum, f) => sum + Number(f.quantity || 0) * f.price, 0);
  };

  if (!reservationInfo) return <p className="text-center mt-10">Chargement...</p>;

  const isGroupReservation = reservationInfo.type === "UN GROUPE";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 text-center shadow-lg bg-white rounded-2xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Demande de Réservation</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-lg font-semibold text-blue-900">
            Type: {reservationInfo.type}
          </p>
        </div>

        <div className="text-left space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>📅 Date :</strong> {reservationInfo.date || "Non précisé"} à {reservationInfo.heure || "Non précisé"}
          </p>
          <p className="text-gray-700">
            <strong>👥 Nombre d'invités :</strong> {reservationInfo.invites || "Non précisé"}
          </p>
          <p className="text-gray-700">
            <strong>👤 Nom :</strong> {reservationInfo.nom || "Non précisé"}
          </p>
          <p className="text-gray-700">
            <strong>📞 Téléphone :</strong> {reservationInfo.tel || "Non précisé"}
          </p>
          <p className="text-gray-700">
            <strong>✉️ Email :</strong> {reservationInfo.email || "Non précisé"}
          </p>
          {reservationInfo.commentaire && (
            <p className="text-gray-700">
              <strong>💬 Commentaire :</strong> {reservationInfo.commentaire}
            </p>
          )}
        </div>

        {isGroupReservation && (
          <div className="mt-6 mb-4">
            <h3 className="text-xl font-semibold mb-3 text-blue-900">Détail des formules</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="border border-gray-300 p-3 text-left">Formule</th>
                    <th className="border border-gray-300 p-3 text-center">Quantité</th>
                    <th className="border border-gray-300 p-3 text-right">Prix unitaire</th>
                    <th className="border border-gray-300 p-3 text-right">Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  {Number(reservationInfo.formule1) > 0 && (
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-2">Formule à 32€</td>
                      <td className="border border-gray-300 p-2 text-center">{reservationInfo.formule1}</td>
                      <td className="border border-gray-300 p-2 text-right">32€</td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">{Number(reservationInfo.formule1) * 32}€</td>
                    </tr>
                  )}
                  {Number(reservationInfo.formule2) > 0 && (
                    <tr>
                      <td className="border border-gray-300 p-2">Formule à 35€</td>
                      <td className="border border-gray-300 p-2 text-center">{reservationInfo.formule2}</td>
                      <td className="border border-gray-300 p-2 text-right">35€</td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">{Number(reservationInfo.formule2) * 35}€</td>
                    </tr>
                  )}
                  {Number(reservationInfo.formule3) > 0 && (
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-2">Formule à 38€</td>
                      <td className="border border-gray-300 p-2 text-center">{reservationInfo.formule3}</td>
                      <td className="border border-gray-300 p-2 text-right">38€</td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">{Number(reservationInfo.formule3) * 38}€</td>
                    </tr>
                  )}
                  {Number(reservationInfo.formule4) > 0 && (
                    <tr>
                      <td className="border border-gray-300 p-2">Formule à 49€</td>
                      <td className="border border-gray-300 p-2 text-center">{reservationInfo.formule4}</td>
                      <td className="border border-gray-300 p-2 text-right">49€</td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">{Number(reservationInfo.formule4) * 49}€</td>
                    </tr>
                  )}
                  {Number(reservationInfo.formule5) > 0 && (
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-2">Formule à 55€</td>
                      <td className="border border-gray-300 p-2 text-center">{reservationInfo.formule5}</td>
                      <td className="border border-gray-300 p-2 text-right">55€</td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">{Number(reservationInfo.formule5) * 55}€</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-900 text-white font-bold">
                    <td colSpan={3} className="border border-gray-300 p-3 text-right text-lg">TOTAL</td>
                    <td className="border border-gray-300 p-3 text-right text-lg">{calculateTotal()}€</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {emailSent ? (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-semibold">✅ Email envoyé avec succès !</p>
            <p className="text-sm">Le client a reçu un email de {reservationState === "CONFIRMÉE" ? "confirmation" : "refus"}.</p>
          </div>
        ) : (
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReservationRefuse}
              disabled={emailSent}
            >
              ❌ REFUSER
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReservationValid}
              disabled={emailSent}
            >
              ✅ VALIDER
            </button>
          </div>
        )}
      </div>
      
      <form ref={formRef}>
        <input type="hidden" name="company" value="L'Atelier de l'Écharpe" />
        <input type="hidden" name="emailCompany" value="pab.ortg@gmail.com" />
        <input type="hidden" name="reservationState" value={reservationState} />
        <input type="hidden" name="reservationComment" value={reservationComment} />
        <input type="hidden" name="eventDateTXT" value={reservationInfo.date || ""} />
        <input type="hidden" name="eventTime" value={reservationInfo.heure || ""} />
        <input type="hidden" name="numberOfGuests" value={reservationInfo.invites || ""} />
        <input type="hidden" name="fullName" value={reservationInfo.nom || ""} />
        <input type="hidden" name="specialRequests" value={reservationInfo.commentaire || ""} />
        <input type="hidden" name="email" value={reservationInfo.email || ""} />
        <input type="hidden" name="tel" value={reservationInfo.tel || ""} />
        <input type="hidden" name="resarvationType" value={reservationInfo.type || ""} />
        <input type="hidden" name="formule1" value={reservationInfo.formule1 || "0"} />
        <input type="hidden" name="formule2" value={reservationInfo.formule2 || "0"} />
        <input type="hidden" name="formule3" value={reservationInfo.formule3 || "0"} />
        <input type="hidden" name="formule4" value={reservationInfo.formule4 || "0"} />
        <input type="hidden" name="formule5" value={reservationInfo.formule5 || "0"} />
        <input type="hidden" name="formulaTable" value="" />
      </form>
    </div>
  );
};

export default ReservationDetails;