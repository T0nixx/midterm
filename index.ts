import { hela, loki, thanos, thor } from "./characters";
import { makeHeroMovie } from "./make-hero-movie";

async function main() {
    const makeThorMovie = makeHeroMovie(thor);
    const thorMovie = await makeThorMovie([
        { villain: loki, place: "New York" },
        { villain: hela, place: "Asgard" },
        { villain: thanos, place: "Wakanda" }
    ]);

    console.log(thorMovie);
}

main().then(() => process.exit(0));