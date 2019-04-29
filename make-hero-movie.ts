import { getVillainImage } from "./get-villain-image";
import { Scene, Character, Movie } from "./interfaces";

export const makeHeroMovie = (hero: Character) => async (scenes: Scene[]): Promise<Movie[]> => {
    return scenes.reduce((promise, {villain, place}) => {
        return promise.then(async (results) => {
            console.log(`Here comes ${villain.name} in ${place}`);
            const image = await getVillainImage(villain.name);
            return [
                ...results,
                {
                    villainName: villain.name,
                    image,
                    win: hero.power > villain.power
                }
            ];
        });
    }, Promise.resolve<Movie[]>([]));
};
