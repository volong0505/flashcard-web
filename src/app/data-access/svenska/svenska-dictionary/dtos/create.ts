export class SvenskaDictionaryCreateDto {
    word!: string;
    translation!: string;
    definition?: string;
    usageNote?: string;
    topics?: string[];
    category?: string; // part of speech and more: idiom, structure .v.v}
}