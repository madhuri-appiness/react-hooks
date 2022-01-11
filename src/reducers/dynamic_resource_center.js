import { SET_RESOURCE_DATA } from '../actions/types';

const INITIAL_STATE = {
  dynamicResources: [],
  playbookResources:[],
  playbookPDF:[],
  editModal:false,
  countryListArr:[],
  showPromoTileModal: false,
  editPromoTileObj: null,   
  showPromoBannerModal: false,
  editPromoBannerObj: null,
  loading: false
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_RESOURCE_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
