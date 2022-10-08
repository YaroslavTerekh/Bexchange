import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTrim'
})
export class TextTrimPipe implements PipeTransform {

  transform(text: string, value: number): string {
    if(!text)
      return '';
      
    return text.substring(0, value) + '...';
  }

}
