import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, ellipsis: string = '...'): string {
    if (!value) return ''; // Retourne une chaîne vide si la valeur est nulle
    if (value.length <= limit) return value; // Pas de troncature si la longueur est inférieure à la limite

    return value.substring(0, limit) + ellipsis;
  }
}
