
export class EnglishLearningVocabularyDto {
    _id!: string;
    vocabularyId!: string;
    cardType!: string;
    word!: string;
    translation!: string;
    definition!: string;
    ipa!: string;
    usageNote!: string;
    level!: string;
    category!: string;
}


export class GetEnglishFlashcardRequest {
    flashcardId?: string;
    qualityNumber?: 1 | 2 | 3 | 4

}