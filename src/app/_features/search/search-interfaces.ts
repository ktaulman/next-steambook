export interface SearchResult {
    id: number;
    name: string;
    scorePercentage: number;
    totalReviews: number;
    imgSrc: string;
}

export interface SearchResultCardProps extends SearchResult {
    disableHover?: boolean
}