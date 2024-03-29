import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-popup',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-popup.component.html',
  styleUrl: './add-popup.component.scss',
})
export class AddPopupComponent {
  public disableBtn: boolean = true;

  popupForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [
      Validators.required,
      Validators.maxLength(150),
    ]),
    // Here the title field limited(150 characters),
    // but in template I also use "slice pipe" and "replace last letter pipe"(custom) for limiting title field.
    author: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    date: new FormControl(null),
  });

  constructor(
    public dialogRef: MatDialogRef<AddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getCurrentDate(): any {
    return new Date();
  }

  formSubmit(): void {
    this.data = {
      id: this.popupForm.value.id,
      title: this.popupForm.value.title,
      author: this.popupForm.value.author,
      content: this.popupForm.value.content,
      date: this.popupForm.value.date ?? this.getCurrentDate(),
    };
    this.dialogRef.close(this.data ?? null);
  }

  allowSubmit() {
    if (this.popupForm.status === 'VALID') {
      this.disableBtn = false;
    } else {
      this.disableBtn = true;
    }
  }

  getInputErrors(input: any): any {
    if (input.hasError('required')) {
      return 'The Field Is Required';
    } else if (
      input.hasError('maxlength') &&
      input.errors.maxlength.requiredLength === 150
    ) {
      return 'The Title Field Most Contain Maximum 150 symbols';
    }
  }
}
