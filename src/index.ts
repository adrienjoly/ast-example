import * as fs from "fs";

type Song = {
  name: string;
};

async function loadSongs(): Promise<Song[]> {
  return await JSON.parse(
    (await fs.promises.readFile("data/songs.json")).toString()
  ).map((songFromFile: Song) => ({
    name: songFromFile.name,
  }));
}

let loadedSongs: Promise<Song[]> | undefined;

/** @deprecated */
async function getSongs(): Promise<Song[]> {
  if (!loadedSongs) loadedSongs = loadSongs(); // lazy caching, for speed optimization
  return loadedSongs;
}

async function countSongs(): Promise<number> {
  return (await require("../data/songs.json")).length;
}

// 1st-level caller (reported by existing eslint plugins)
async function getOfficialVideos(): Promise<Song[]> {
  return (await getSongs()).filter((song) =>
    song.name.match(/official video/i)
  );
}

// 2nd-level caller (NOT reported by existing eslint plugins)
async function searchOfficialVideos(searchTerm: string): Promise<Song[]> {
  return (await getOfficialVideos()).filter((song) =>
    song.name.match(searchTerm)
  );
}

// other 1st-level caller
async function countVideos(): Promise<number> {
  return await countSongs();
}

(async () => {
  console.log(await searchOfficialVideos("Alvvays"));
  console.log(`total videos: ${await countVideos()}`);
})();
