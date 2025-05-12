export function getScore(score: number): { highScore: boolean, mediumScore: boolean, lowScore: boolean } {
    const result = { highScore: false, mediumScore: false, lowScore: false }
    if (score >= 80) result.highScore = true;
    else if (score <= 79 && score >= 65) result.mediumScore = true;
    else result.lowScore = true;
    return result
}
