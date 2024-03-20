import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  @ViewChild('deleteButton') deletebutton: any;

  onDeleteConfirm() {
    this.confirmationService.confirm({
      target: this.deletebutton.el.nativeElement,
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  onEdit() {
    this.edit.emit(this.product);
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }
}
