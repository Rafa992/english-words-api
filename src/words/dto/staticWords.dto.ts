export class WordDto {
    order: number;
    en: string;
    transcription: string;
    ru: string;
    ruFull: string;
    learned: boolean;
    unlearned: boolean;
    repetitions: number;
};
  
export class EditWordDto extends WordDto {
    id: string;
}
