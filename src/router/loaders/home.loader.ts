// Services
import { getRandomBackgroundImage } from "@/services/tmdb.service"

export interface IHomeLoaderOutput {
  imageLink: string;
}

const homeLoader = async (): Promise<IHomeLoaderOutput> => {
  const imagePath = await getRandomBackgroundImage();
  const imageLink = import.meta.env.VITE_TMDB_IMAGES_LOCATION_URL + import.meta.env.VITE_TMDB_IMAGE_BG_SIZE + imagePath;


  return {
    imageLink
  }
}

export default homeLoader;