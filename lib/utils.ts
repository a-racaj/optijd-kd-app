// Dit bestand bevat de cn functie voor mijn OpTijd app.
// De cn functie combineert CSS class namen met behulp van clsx en tailwind-merge.
// Het zorgt ervoor dat class namen efficiënt worden samengevoegd en conflicten worden opgelost.

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}