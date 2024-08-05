export interface IImagesResponse {
  backdrops: IImageBackdrop[]
  id: number
  logos: IImageLogo[]
  posters: IImagePoster[]
}

export interface IImageBackdrop {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface IImageLogo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface IImagePoster {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count?: number
  width?: number
  "": any
}