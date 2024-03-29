import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ArticlesService } from '../../Services/articles.service';
import { IArticles } from '../../Models/IArticles';
import { SlicePipe, TitleCasePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    TitleCasePipe,
    SlicePipe,
    MatSnackBarModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  public showBlur: boolean = true;
  public dataSource: IArticles[] = [];
  public hasError: boolean = false;
  columnsToDisplay = ['title', 'author', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IArticles | null | undefined;

  constructor(
    private router: Router,
    public pop_up: MatDialog,
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!confirm('Are you really an Admin')) {
      alert('You should be an Admin for navigate to this page ');
      this.router.navigate(['/', 'user']);
    } else {
      this.showBlur = false;
    }
    this.getArticles();
  }

  openDialog() {
    const dialogRef = this.pop_up.open(AddPopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('dialog result', result);
        this.articlesService.addNewArticle(result).subscribe((res) => {
          console.log('posted result', res);
        });
        this.getArticles();
        this.openSnackBar('Article successfully published');
      } else {
        console.log('result is null');
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  last7Days() {
    let today = new Date();
    let lastSevenDays = [today.toLocaleDateString()];
    let dateOffset;
    for (let i = 1; i < 7; i++) {
      dateOffset = 24 * 60 * 60 * 1000;
      dateOffset *= i;
      today = new Date();
      today.setTime(today.getTime() - dateOffset);
      lastSevenDays.push(today.toLocaleDateString());
    }
    return lastSevenDays;
  }

  getArticles() {
    this.articlesService.getAllArticles().subscribe(
      (res) => {
        let readyDataSource = [];
        this.dataSource = res;
        // This part of the code compares the dates of the articles with the date 7 days ago and returns all the intermediate articles.
        for (let i = 0; i < this.dataSource.length; i++) {
          if (
            Date.parse(
              this.dataSource[i].date.slice(0, 10).replaceAll('-', '/')
            ) >= Date.parse(this.last7Days().slice(-1)[0])
          ) {
            readyDataSource.push(this.dataSource[i]);
          }
        }
        // Here all articles published in the last 7 days are sorted by date
        let sortedDataSource = readyDataSource.sort((p1, p2) =>
          Date.parse(p1.date) < Date.parse(p2.date)
            ? 1
            : Date.parse(p1.date) > Date.parse(p2.date)
            ? -1
            : 0
        );

        this.dataSource = sortedDataSource;
      },
      (err) => {
        console.log(err);
        this.hasError = true;
      }
    );
  }
}
