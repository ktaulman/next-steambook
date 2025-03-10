export interface SearchResult {
    id: number;
    name: string;
    scorePercentage: number;
    totalReviews: number;
    imgSrc: string;
    developer?: string;
    publisher?: string;
    tags?: string[];
    releaseDate?: string;
}

export interface SearchResultCardProps extends SearchResult {
    disableHover?: boolean
}