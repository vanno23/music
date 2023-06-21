import FetchData from "./FetchData";

const spotifyApi = {
  getBrowse: (type) => {
      const url = type;
      return FetchData(url);
    }
  }
export default spotifyApi;