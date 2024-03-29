import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticles } from '../Models/IArticles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesURL: string = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get<IArticles[]>(this.articlesURL);
  }

  addNewArticle(data: IArticles) {
    return this.http.post<IArticles[]>(this.articlesURL, data);
  }
}
