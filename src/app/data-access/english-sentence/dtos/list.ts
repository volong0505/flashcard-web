
export class EnglishSentenceListRequest {
    keyword?: string;
    page!: number
}

export class EnglishSentenceListResponse {
    list!: EnglishSentenceListItemDto[];
    total!: number
}

export class EnglishSentenceListItemDto {
    _id!: string;
    sentence!: string;
    translation!: string;

}