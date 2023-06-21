interface images {
  url: string,
}

export interface playlistData {
  id: string,
  name: string,
  type: string,
  followers: number,
  images: images[],
  owner: {display_name: string},
}
export interface addedAt {
  added_at: string,
}