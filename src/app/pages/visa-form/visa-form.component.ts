import { getBase64Files,getTypeOperation,hideLoader,showLoader,validateForm} from '../../shared/helpers/visa-form.helper';
import { SharedFileInputComponent } from '../../shared/components/shared-file-input/shared-file-input.component';
import { VisaPriseComponent } from '../../shared/components/visa-prise/visa-prise.component';
import { VisaServicePlanService } from '../../shared/services/visa-service-plan.service';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { VisaOperationService } from '../../shared/services/visa-operation.service';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { VisaOperation, VisaPrise } from '../../shared/models/visa-prise.model';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { UploadService } from '../../shared/services/upload.service';
import { ToastService } from '../../shared/services/toast.service';
import {ToastrService } from 'ngx-toastr';
import gsap from 'gsap';


@Component({
  selector: 'app-visa-form',
  standalone: true,
  imports: [
    FooterComponent,
    NavBarComponent,
    VisaPriseComponent,
    SharedFileInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './visa-form.component.html',
  styleUrl: './visa-form.component.scss',
})
export class VisaFormComponent implements OnInit {

  compteur = signal(1);
  compteurRadio = signal(1);
  uploadedFiles: Array<{ name: string }> = [];

  fileName: string = '';
  fileContent: string | ArrayBuffer | null = '';
  errorMessage: string = '';

  visaForm: FormGroup;
  visaOperation!: VisaOperation;
  fileContents = {
    parentalAuthorization: null,
    passport: null,
    vaccinationCard: null,
    flightTicket: null,
  };

  @ViewChild('parentalAuthorization') parentalAuth!: SharedFileInputComponent;
  @ViewChild('passportPhoto') passportPhoto!: SharedFileInputComponent;
  @ViewChild('vaccinationCard') vaccinationCard!: SharedFileInputComponent;
  @ViewChild('flightTicket') flightTicket!: SharedFileInputComponent;

  listVisa: VisaPrise[] = [
    {
      id: 1,
      label: 'E-visa de Court sejour',
      price: '233 €',
      desc: 'Séjour allant de 1 a  180 jours Multiple entrée (obtenue en 4 jours ouvrable)',
    },
    {
      id: 2,
      label: 'E-visa  Court sejour Express ',
      price: '345 €',
      desc: 'obtenez votre visa en 48 heures Multiple entrée (obtenue en 2 jours ouvrable)',
    },
    {
      id: 3,
      label: 'E-visa de  long sejour',
      price: '406 €',
      desc: 'Séjour de 180 jours a 360 jours Multiple entrée (obtenue en 4 jours ouvrable)',
    },
  ];

  visaPlan = inject(VisaServicePlanService);

  constructor(
    private fb: FormBuilder,
    private visaOperationSrv: VisaOperationService,
    private uploadSrv: UploadService,
    private visaPlanSrv: VisaServicePlanService,
    private toastService: ToastService,
    private toastr: ToastrService
  ) {
    this.visaForm = this.fb.group({
      reason: ['', Validators.required],
      type: [''],
      travelDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      passportExpiry: ['', Validators.required],
      friendlyNumberCountry: ['', Validators.required],
      isMinor: [false],
      flightTicket: [null],
      passportPhoto: [null],
      vaccinationCard: [null],
      parentalAuthorization: [null],
    });
  }

  ngOnInit(): void {}

  cleanInput(controlName: string, value: string): void {
    // Supprimer les caractères non alphanumériques
    const cleanedValue = value.replace(/[^0-9a-zA-Z]/g, '');

    // Mettre à jour la valeur du contrôle
    this.visaForm
      .get(controlName)
      ?.setValue(cleanedValue, { emitEvent: false });
  }

  cleanNumericInput(controlName: string, value: string): void {
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Conserver uniquement les chiffres
    this.visaForm
      .get(controlName)
      ?.setValue(cleanedValue, { emitEvent: false });
  }

  isMinor(isMinor: boolean, e: any) {
    this.resetInputRadio();
    e.target.checked = true;
    this.compteurRadio.set(2);
    this.visaForm.patchValue({
      isMinor,
    });
  }

  isNotMinor(isMinor: boolean, e: any) {
    this.resetInputRadio();
    e.target.checked = true;
    this.compteurRadio.set(1);
    this.visaForm.patchValue({
      isMinor,
    });
  }

  resetInputRadio() {
    const result = document.querySelectorAll("input[type='radio']") as any;
    result.forEach((element: HTMLInputElement) => {
      element.checked = false;
    });
  }

  handleFileContent(label: string, fileContent: any): void {
    if (label === 'passportPhoto') {
      this.visaForm.patchValue({
        passportPhoto: fileContent,
      });
    } else if (label === 'parentalAuthorization') {
      this.visaForm.patchValue({
        parentalAuthorization: fileContent,
      });
    } else if (label === 'vaccinationCard') {
      this.visaForm.patchValue({
        vaccinationCard: fileContent,
      });
    } else if (label === 'flightTicket') {
      this.visaForm.patchValue({
        flightTicket: fileContent,
      });
    } else {
      console.log('le cas ne corrrespond pas!');
    }
  }

  async submitPayment() {
    const validationErrors = validateForm(this.visaForm.value);

    if (validationErrors.length > 0) {
      // Affichez les messages d'erreur, par exemple dans une notification
      this.toastr.warning('Erreur de validation', validationErrors.join(' '));
      return; // Empêche la soumission si des erreurs sont présentes
    }

    showLoader();
    const type = getTypeOperation(this.visaPlanSrv.currentPlan.id);
    this.visaForm.patchValue({ type });

    try {
      const isMinor = this.visaForm.value.isMinor;
      const base64Files = getBase64Files(isMinor, this.visaForm.value);

      for (const file of base64Files) {
        await this.uploadSrv.insertImage(file);
      }

      this.removeContentFromFields([
        'parentalAuthorization',
        'flightTicket',
        'passportPhoto',
        'vaccinationCard',
      ]);

      const visa = await this.visaOperationSrv.insertVisa(this.visaForm.value);
      if (visa) {
        hideLoader();
        this.resetForm();
        this.toastService.showToast(
          'Opération réussie',
          visa.message,
          'success'
        );
        setTimeout(() => window.location.reload(), 2500);
      }
    } catch (error: any) {
      hideLoader();
      this.toastService.showToast(
        error.response?.data?.message?.title || 'Erreur',
        error.response?.data?.message?.message || 'Une erreur est survenue.',
        'error'
      );
    }
  }

  resetForm(): void {
    this.visaForm.reset({
      reason: '',
      type: '',
      travelDate: '',
      email: '',
      phoneNumber: '',
      lastName: '',
      firstName: '',
      passportExpiry: '',
      friendlyNumberCountry: '',
      isMinor: false,
      flightTicket: null,
      passportPhoto: null,
      vaccinationCard: null,
      parentalAuthorization: null,
    });
  }

  removeContentFromFields(fieldNames: string[]): void {
    fieldNames.forEach((fieldName) => {
      const field = this.visaForm.get(fieldName)?.value;

      if (field && typeof field === 'object') {
        delete field.content;
        this.visaForm.get(fieldName)?.setValue(field);
      }
    });
  }

  subscribeToFormChanges() {
    this.visaForm.get('lastName')?.valueChanges.subscribe((value) => {
      this.cleanInput('lastName', value);
    });

    this.visaForm.get('firstName')?.valueChanges.subscribe((value) => {
      this.cleanInput('firstName', value);
    });

    this.visaForm.get('phoneNumber')?.valueChanges.subscribe((value) => {
      this.cleanNumericInput('phoneNumber', value);
    });

    this.visaForm
      .get('friendlyNumberCountry')
      ?.valueChanges.subscribe((value) => {
        this.cleanNumericInput('friendlyNumberCountry', value);
      });
  }

  nextStep() {
    const validationErrors = validateForm(this.visaForm.value);

    if (validationErrors.length > 0) {
      // Affichez les messages d'erreur, par exemple dans une notification
      this.toastr.error('Erreur de validation', validationErrors.join(' '));
      return; // Empêche la soumission si des erreurs sont présentes
    }
    gsap.to('.row-form', {
      xPercent: -100,
      duration: 0.5,
    });
    this.compteur.set(2);
  }
  prevStep() {
    gsap.to('.row-form', {
      xPercent: 0,
      duration: 0.5,
    });
    this.compteur.set(1);
  }
}
