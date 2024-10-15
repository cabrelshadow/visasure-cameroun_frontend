import { Component, inject, input } from '@angular/core';
import { VisaPrise } from '../../models/visa-prise.model';
import { VisaServicePlanService } from '../../services/visa-service-plan.service';

@Component({
  selector: 'app-visa-prise',
  standalone: true,
  imports: [],
  templateUrl: './visa-prise.component.html',
  styleUrl: './visa-prise.component.scss'
})
export class VisaPriseComponent {
  visaPlanSrv = inject(VisaServicePlanService);
  item = input.required<VisaPrise>();
  setVisaPlan() { this.visaPlanSrv.currentPlan = this.item() }
}
