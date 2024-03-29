import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ArticlesService } from '../../Services/articles.service';
import { IArticles } from '../../Models/IArticles';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';
import { SlicePipe } from '@angular/common';
import { ReplaceLastLetterPipe } from '../../Pipes/replace-last-letter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    SlicePipe,
    CustomDatePipe,
    ReplaceLastLetterPipe,
    MatPaginatorModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  public articles: IArticles[] = [];
  public hasError: boolean = false;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getAllArticles();
    this.articles.reverse();
  }

  getAllArticles(): void {
    this.articlesService.getAllArticles().subscribe(
      (res) => {
        this.articles = res;
        this.articles.reverse();
      },
      (err) => {
        console.log(err);
        this.hasError = true;
      }
    );
  }
}
