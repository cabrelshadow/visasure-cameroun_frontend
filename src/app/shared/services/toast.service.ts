import { Injectable } from '@angular/core';
import Swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showToast(title: string, text: string, icon: string, timer: number = 4000): void {
    Swal({
      title,
      text,
      icon,
      timer
    });
  }
}
