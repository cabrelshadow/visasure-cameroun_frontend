import gsap from 'gsap';
import { Base64File, VisaTypeOperation } from '../models/visa-prise.model';


export const showLoader = () => {
  gsap.to('.overlay-modal', {
    display: 'flex',
  });
}

export const hideLoader = () => {
  gsap.to('.overlay-modal', {
    display: 'none',
  });
}


export const validateForm = (object: any) => {
  const errors: string[] = [];

  const {
    travelDate,
    email,
    phoneNumber,
    friendlyNumberCountry,
    firstName,
    lastName,
    passportExpiry
  } = object;

  // Vérification des champs requis
  if (
    !travelDate ||
    !email ||
    !phoneNumber ||
    !friendlyNumberCountry ||
    !firstName ||
    !lastName
  ) {
    errors.push('Tous les champs sont requis.');
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Format d'email invalide.");
  }

  // Validation du numéro de téléphone (uniquement des chiffres et longueur de 9 chiffres)
  const phoneRegex = /^\d{09}$/; // Assurez-vous que cela correspond à la longueur souhaitée
  if (!phoneRegex.test(phoneNumber)) {
    errors.push('Numéro de téléphone invalide (doit contenir 9 chiffres).');
  }

  // Validation du préfixe international (country code) (optionnel)
  const friendlyNumberCountryRegex = /^\d+$/;
  if (
    friendlyNumberCountry &&
    !friendlyNumberCountryRegex.test(friendlyNumberCountry)
  ) {
    errors.push(
      'Le numéro de votre contact invalide (doit contenir uniquement des chiffres).'
    );
  }

  // Validation de la date de voyage (doit être dans le futur)
  const travelDateParsed = new Date(travelDate);
  if (travelDateParsed <= new Date()) {
    errors.push('La date de voyage doit être supérieur à la date actuelle.');
  }

  // Validation de la date d'expiration du passeport (doit être >= 6 mois à partir d'aujourd'hui)
  const passportExpiryDate = new Date(passportExpiry);
  const today = new Date();
  const sixMonthsFromToday = new Date(today.setMonth(today.getMonth() + 6));

  if (passportExpiryDate < sixMonthsFromToday) {
    errors.push(
      "La date d'expiration du passeport doit être dans au moins 6 mois."
    );
  }

  return errors;
}


export const getTypeOperation = (valueType:number) => {
  let type;
  switch (valueType) {
    case 1:
      type = VisaTypeOperation.COURT_SEJOUR;
      break;
    case 2:
      type = VisaTypeOperation.VISA_EXPRESS;
      break;
    case 3:
      type = VisaTypeOperation.LONG_SEJOUR;
      break;
  }
  return type
}


export const getBase64Files = (isMinor: boolean, object: any) => {
  const { flightTicket, parentalAuthorization, passportPhoto, vaccinationCard } = object;

  const base64Files: Base64File[] = isMinor
    ? [
        {
          base64String: flightTicket?.content,
          fileName: flightTicket?.fileName,
        },
        {
          base64String: parentalAuthorization?.content,
          fileName: parentalAuthorization?.fileName,
        },
        {
          base64String: passportPhoto?.content,
          fileName: passportPhoto?.fileName,
        },
        {
          base64String: vaccinationCard?.content,
          fileName: vaccinationCard?.fileName,
        },
      ]
    : [
        {
          base64String: flightTicket?.content,
          fileName: flightTicket?.fileName,
        },
        {
          base64String: passportPhoto?.content,
          fileName: passportPhoto?.fileName,
        },
        {
          base64String: vaccinationCard?.content,
          fileName: vaccinationCard?.fileName,
        },
      ];

  return base64Files.filter(file => file.base64String); // Retirer les fichiers sans contenu
}

