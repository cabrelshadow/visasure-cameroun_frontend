import { Injectable } from '@angular/core';
import { VisaPrise } from '../models/visa-prise.model';

@Injectable({
  providedIn: 'root'
})
export class VisaServicePlanService {
  currentPlan: VisaPrise = {
    id: 1,
    label: 'E-visa de Court sejour', 
    price: '233 €', 
    desc: 'Séjour maximun de 180 joursDurée de validité de 6 moisMultiple entrée'
  };
}
