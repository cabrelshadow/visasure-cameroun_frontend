import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisaOperationService {
  
  private apiUrl = environment.apiUrl;

  constructor() {}

  // Méthode pour insérer des données
  async insertVisa(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/visa-insert`, data);
      return response.data; // Retourne la réponse du serveur
    } catch (error) {
      console.error('Erreur lors de l\'insertion du visa:', error);
      throw error; // Relève l'erreur pour le traitement ultérieur
    }
  }
}
