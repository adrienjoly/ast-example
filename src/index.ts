type Song = {
  name: string;
};

async function getSongs(): Promise<Song[]> {
  return require("../data/songs.json");
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
  return (await getSongs()).length;
}

(async () => {
  console.log(await searchOfficialVideos("Alvvays"));
  console.log(`total videos: ${await countVideos()}`);
})();
