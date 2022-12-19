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

// 3rd-level caller (NOT reported by existing eslint plugins)
(async () => {
  console.log(await searchOfficialVideos("Alvvays"));
})();
