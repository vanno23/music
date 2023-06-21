interface albumImage {
  url: string,
}

interface trackItems {
  duration_ms: number,
}

interface albumTracks {
  items: trackItems[],
}

interface album {
  id: string,
  release_date: string,
  images: albumImage[],
}


export interface copyrightsData {
  text: string,
}

export interface albumDataProps {
  id: string,
  name: string,
  album_type: string,
  type: string,
  release_date: string,
  total_tracks: number,
  tracks: albumTracks,
  album: album,
  duration_ms: number,
  copyrights: copyrightsData[],
  images: albumImage[],
}

export interface artistDataProps {
  id: string,
  name: string,
  type: string,
  images: albumImage[],
}