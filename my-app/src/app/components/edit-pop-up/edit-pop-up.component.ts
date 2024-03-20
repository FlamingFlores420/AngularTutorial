import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../../types';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-pop-up',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-pop-up.component.html',
  styleUrl: './edit-pop-up.component.css',
})
export class EditPopUpComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() product: Product = {
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  specialCharactersValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        control.value
      );

      return hasSpecialCharacters ? { hasSpecialCharacters: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharactersValidator()]],
    price: ['', [Validators.required]],
    rating: [0, []],
    image: ['', []],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, rating, image, price } = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      rating: rating || 0,
      price: price || '',
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
