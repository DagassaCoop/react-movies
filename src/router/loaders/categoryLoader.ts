import {
  ECategoryDefaultType,
  ECategoryMovieType,
  ECategoryTVSerieType,
  ICategoriesLoaderOutput,
} from '@/interfaces/categories';
import store from '@/store/store';
import { setRedirectFrom } from '@/store/states/categoriesSlice';

const categoryLoader = async ({ params }: any): Promise<ICategoriesLoaderOutput> => {
  switch (params.categoryType) {
    case ECategoryMovieType[ECategoryMovieType.Movies]:
      store.dispatch(setRedirectFrom(ECategoryMovieType[ECategoryMovieType.Movies]));
      return {
        data: [],
        type: ECategoryMovieType[ECategoryMovieType.Movies],
      };
    case ECategoryTVSerieType[ECategoryTVSerieType['TV Series']]:
      store.dispatch(setRedirectFrom(ECategoryTVSerieType[ECategoryTVSerieType['TV Series']]));
      return {
        data: [],
        type: ECategoryTVSerieType[ECategoryTVSerieType['TV Series']],
      };
  }

  switch (ECategoryDefaultType[params.categoryType as keyof typeof ECategoryDefaultType]) {
    case ECategoryDefaultType.Genres:
      return {
        data: [],
        type: ECategoryDefaultType[ECategoryDefaultType.Genres],
      };
    case ECategoryDefaultType.Peoples:
      return {
        data: [],
        type: ECategoryDefaultType[ECategoryDefaultType.Peoples],
      };
    case ECategoryDefaultType.Countries:
      return {
        data: [],
        type: ECategoryDefaultType[ECategoryDefaultType.Countries],
      };
    default:
      return null;
  }
};

export default categoryLoader;
