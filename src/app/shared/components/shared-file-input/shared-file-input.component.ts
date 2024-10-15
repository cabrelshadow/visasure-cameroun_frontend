import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ToastService } from '../../services/toast.service';

const maxFileSize = 5;

@Component({
  selector: 'app-shared-file-input',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './shared-file-input.component.html',
  styleUrl: './shared-file-input.component.scss',
})
export class SharedFileInputComponent {
  constructor(private toastService: ToastService) {}
  @Input() label: string = ''; // Texte du label
  @Input() id: string = ''; // Identifiant unique du champ

  @Output() fileContent = new EventEmitter<{
    content: string | ArrayBuffer | null | undefined;
    fileName: string;
  }>(); // Émet les données du fichier
  file: File | null = null;

  fileName: string = ''; // Nom du fichier sélectionné
  maxSizeInBytes = maxFileSize * 1024 * 1024; // 5 Mo
  allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Vérification du type
      if (!this.allowedTypes.includes(file.type)) {
        this.toastService.showToast(
          'Le type de fichier non prise en charge.',
          'Mauvais format de données',
          'error'
        );
        return;
      }

      // Vérification de la taille
      if (file.size > this.maxSizeInBytes) {
        this.toastService.showToast(
          `Fichier trop volumineux. La taille maximale autorisée est de ${maxFileSize} Mo.`,
          'Mauvais format de données',
          'error'
        );
        return;
      }

      this.fileName = file.name; // Stocker le nom du fichier
      // Lire le contenu du fichier avec FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent.emit({
          content: e.target?.result,
          fileName: this.fileName,
        }); // Émettre le contenu du fichier au parent
      };
      // reader.readAsText(file); // Lire le fichier en tant que texte (modifiable selon le type de fichier)
      reader.readAsDataURL(file);
    }
  }
}
