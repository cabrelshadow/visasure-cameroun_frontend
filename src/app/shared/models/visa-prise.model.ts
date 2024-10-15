export interface VisaPrise {
    id: number;
    price: string;
    label: string;
    desc: string
}


export interface VisaOperation {
  id?: number;
  type: number;
  email: string;
  reason: string;
  lastName: string;
  travelDate: Date;
  isMinor: boolean;
  firstName: string;
  phoneNumber: string;
  passportExpiry: Date;
  flightTicket: string | null; // Ajout d'une propriété pour le billet d'avion
  passportPhoto: string | null; // Ajout d'une propriété pour le passeport
  vaccinationCard: string | null; // Ajout d'une propriété pour le carnet de vaccination
  friendlyNumberCountry: string;
  parentalAuthorization?: string | null; // Ajout d'une propriété pour l'autorisation parentale
}

export enum VisaTypeOperation {
  COURT_SEJOUR = 100,
  LONG_SEJOUR = 200,
  VISA_EXPRESS = 300,
}


export interface Base64File {
  base64String: string;  // Contient le contenu de l'image encodé en base64
  fileName: string;      // Contient le nom du fichier
}
