interface albumImage {
  url: string,
}
interface image {
  images: albumImage[],
}

export interface LibraryDataProps {
  id: string,
  name: string,
  type: string,
  followers: {total: number},
  images: albumImage[],
  owner: {display_name: string},
  tracks?: {total: string},
  album?: image,
  artists?: {name: string}[],
}