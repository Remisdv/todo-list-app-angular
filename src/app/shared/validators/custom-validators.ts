import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredAndMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || value.trim().length === 0) {
      return { required: true };
    }

    if (value.length < minLength) {
      return { 
        minLength: { requiredLength: minLength, actualLength: value.length } 
      };
    }

    return null;
  };
}

export function bannedWordsValidator(bannedWords: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const foundWord = bannedWords.find(word => 
      value.toLowerCase().includes(word.toLowerCase())
    );

    return foundWord ? { bannedWord: { word: foundWord } } : null;
  };
}