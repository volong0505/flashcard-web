export class EnglishSentenceUpdateDto {
    _id!: string;
    update!: {
        key: 'sentence' | 'translation' | 'wordIds',
        value: string | string[]
    }
}