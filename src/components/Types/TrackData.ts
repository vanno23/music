interface album {
  images: {url: string}[]
  name: string,
}

interface artists {
  name: string,
  id: string,
}

export interface tracksData {
  id: string,
  name: string,
  duration_ms: number,
  album?: album,
  artists: artists[],
  type?: string,
}