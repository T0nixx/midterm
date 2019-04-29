import { hela, loki, thanos, thor, Ultron } from "./characters";
import { makeHeroMovie } from "./make-hero-movie";

async function main() {
    const makeThorMovie = makeHeroMovie(thor);
    const thorMovie = await makeThorMovie([
        { villain: loki, place: "New York" },
        { villain: hela, place: "Asgard" },
        { villain: thanos, place: "Wakanda" }
    ]);
    const ironManMovie = await makeHeroMovie({ name: "Iron Man", power: 200 })([
        { villain: loki, place: "New York" },
        { villain: Ultron, place: "Sokovia" },
        { villain: thanos, place: "Wakanda" }
    ]);

    console.log(thorMovie);
    console.log(ironManMovie);
}

main().then(() => process.exit(0));
