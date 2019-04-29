export interface Character {
    name: string;
    power: number;
}

export interface Scene {
    villain: Character;
    place: string;
}

export interface Movie {
    villainName: string;
    image: string;
    win: boolean;
}
