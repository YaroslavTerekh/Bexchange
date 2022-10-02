import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTrim'
})
export class TextTrimPipe implements PipeTransform {

  transform(value: string): string {
    if(!value)
      return '';
      
    return value.substring(0, 200) + '...';
  }

}
