import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

// API
import { getMovieGenres } from '@/api/tmbd.api';

// Interfaces
import {
  EFilterType,
  EFilterSection,
  IFiltersViewStructure,
  IFiltersUpdates,
  TFilter,
} from '@/interfaces/filters.interface';

// Services
import {
  checkIsActive,
  createGenresFilters,
  createReleaseDateTypesFilters,
  getExistFilterById,
} from '@/services/filters.service';

// Assets
import releaseDates from '@/assets/config/releaseTypes.json';

interface IFiltersStore {
  filtersViewStructure: IFiltersViewStructure;
  isActive: boolean;
  filtersUpdates: IFiltersUpdates;
  readyForUpdate: boolean;
}

export const fetchGenres = createAsyncThunk('filters/fetchGenres', async () => {
  const apiGenres = await getMovieGenres();
  return apiGenres;
});

export const fetchReleaseDateTypes = createAsyncThunk('filters/fetchReleaseDateTypes', async () => {
  // TODO: update to fetch when DB for configs ready
  const { types } = releaseDates;
  return types;
});

const initialState: IFiltersStore = {
  filtersViewStructure: {
    [EFilterSection.genre]: [],
    [EFilterSection.releaseDate]: {
      allReleases: {
        id: v4(),
        section: EFilterSection.releaseDate,
        type: EFilterType.minInfo,
        isActive: true,
        data: {
          id: v4(),
          title: 'All releases',
        },
      },
      allCountries: {
        id: v4(),
        section: EFilterSection.releaseDate,
        type: EFilterType.minInfo,
        isActive: true,
        data: {
          id: v4(),
          title: 'All countries',
        },
      },
      country: {
        id: v4(),
        section: EFilterSection.releaseDate,
        type: EFilterType.country,
        isActive: false,
        data: {
          english_name: '',
          iso_3166_1: '',
          native_name: '',
        },
      },
      releaseDateTypes: [],
      releaseFrom: {
        id: v4(),
        section: EFilterSection.releaseDate,
        type: EFilterType.releaseDate,
        isActive: false,
        data: {
          id: v4(),
          title: 'from',
          date: '',
          api: 0,
        },
      },
      releaseTo: {
        id: v4(),
        section: EFilterSection.releaseDate,
        type: EFilterType.releaseDate,
        isActive: false,
        data: {
          id: v4(),
          title: 'to',
          date: '',
          api: 1,
        },
      },
    },
    [EFilterSection.language]: {
      id: v4(),
      isActive: false,
      section: EFilterSection.language,
      type: EFilterType.language,
      data: {
        iso_639_1: 'xx',
        english_name: 'No Language',
        name: 'No Language',
      },
    },
    [EFilterSection.voteCount]: {
      id: v4(),
      section: EFilterSection.voteCount,
      type: EFilterType.voteCount,
      isActive: false,
      data: {
        id: v4(),
        value: [0, 100],
      },
    },
    [EFilterSection.voteAverage]: {
      id: v4(),
      section: EFilterSection.voteAverage,
      type: EFilterType.voteAverage,
      isActive: false,
      data: {
        id: v4(),
        value: 0,
      },
    },
  },
  isActive: false,
  filtersUpdates: {},
  readyForUpdate: false,
};

const filters = createSlice({
  name: 'filters',
  initialState,
  // Actions
  reducers: {
    setReadyStatus(state, action: PayloadAction<boolean>) {
      state.readyForUpdate = action.payload;
    },
    setFilterUpdate(state, action: PayloadAction<TFilter>) {
      const filter = getExistFilterById(state.filtersViewStructure, action.payload.id);
      if (!filter) return;

      if (JSON.stringify(filter) === JSON.stringify(action.payload)) {
        if (state.filtersUpdates[action.payload.id]) delete state.filtersUpdates[action.payload.id];
      } else {
        state.filtersUpdates[action.payload.id] = action.payload;
      }
    },
    removeFilterUpdates(state, action: PayloadAction<string[]>) {
      action.payload.forEach((id) => {
        if (state.filtersUpdates[id]) delete state.filtersUpdates[id];
      });
    },
    updateFiltersViewStructure(state) {
      for (const key in state.filtersUpdates) {
        const filter = state.filtersUpdates[key];
        const existFilter = getExistFilterById(state.filtersViewStructure, filter.id);
        if (!existFilter) return;

        existFilter.isActive = filter.isActive;
        existFilter.data = filter.data;
      }

      state.isActive = checkIsActive(state.filtersViewStructure);
      state.filtersUpdates = {};
    },
  },
  // Async actions
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      const genres = createGenresFilters(action.payload);
      state.filtersViewStructure[EFilterSection.genre] = genres;
    });
    builder.addCase(fetchReleaseDateTypes.fulfilled, (state, action) => {
      const releaseDates = createReleaseDateTypesFilters(action.payload);
      state.filtersViewStructure[EFilterSection.releaseDate].releaseDateTypes = releaseDates;
    });
  },
});

export const { setReadyStatus, setFilterUpdate, removeFilterUpdates, updateFiltersViewStructure } =
  filters.actions;

export default filters.reducer;
