import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLastLetter',
  standalone: true,
})
export class ReplaceLastLetterPipe implements PipeTransform {
  str: any;
  transform(value: string): string {
    // This part of the code is written in such a way that when slice pipe cutting text, the last word is displayed completely or not displayed at all.
    // It also replaces the last letter with "...", 
    // this could have been done using css but I decided to use a pipe
    if (value.length < 90) {
      value.slice(0, -1) + '...';
      return value;
    } else {
      this.str = value.split(' ');
      this.str.pop();
      this.str = this.str.join(' ') + ' ';
      return this.str.slice(0, -1) + '...';
    }
  }
}
