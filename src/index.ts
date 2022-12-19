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

// 1st-level caller (reported by existing eslint plugins)
async function getOfficialVideos(): Promise<Song[]> {
  return (await loadSongs()).filter((song) =>
    song.name.match(/official video/i)
  );
}

// 2nd-level caller (NOT reported by existing eslint plugins)
async function searchOfficialVideos(searchTerm: string): Promise<Song[]> {
  return (await getOfficialVideos()).filter((song) =>
    song.name.match(searchTerm)
  );
}

// 3rd-level caller (NOT reported by existing eslint plugins)
(async () => {
  console.log(await searchOfficialVideos("Alvvays"));
})();
