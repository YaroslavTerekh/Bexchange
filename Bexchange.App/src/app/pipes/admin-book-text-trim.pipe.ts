import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminBookTextTrim'
})
export class AdminBookTextTrimPipe implements PipeTransform {

  transform(value: string): string {
    return 'null';
  }

}
