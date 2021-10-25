import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespaces'
})
export class RemovewhitespacesPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    //return value.replace(/ /g, '');   //to remove white spaces 
    
    //return value.replace(/ .*/,'');   //To get the first word of string

    /*
    let firstChar=value.charAt(0);  //first character of a string
    return firstWord;
    */

    //find first word and make it uppercase
    let firstWord=value.split(" ")[0];
    return firstWord;
  }

}
