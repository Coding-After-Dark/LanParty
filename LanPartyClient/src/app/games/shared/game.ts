export interface IGame {
    id: number;
    title: string;
    slug: string;
    genre: string;
    description: string;
    imageUrl: string;
    playerCount: number;
    state: states;
    percentage: number;
}

export enum states {
    isReady = 0,
    isDownloading = 1,
    isCompleted = 2
}
