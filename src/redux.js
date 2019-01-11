// action types
const FETCH_CREW_PERSONNEL_REQUEST = "FETCH_CREW_PERSONNEL_REQUEST";
const FETCH_CREW_PERSONNEL_SUCCESS = "FETCH_CREW_PERSONNEL_SUCCESS";
const FETCH_CREW_PERSONNEL_FAILURE = "FETCH_CREW_PERSONNEL_FAILURE";

// reducer with initial state
const initialState = {
  fetching: false,
  crewPersonnel: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CREW_PERSONNEL_REQUEST:
      return { ...state, fetching: true, error: null };
    case FETCH_CREW_PERSONNEL_SUCCESS:
      return { ...state, fetching: false, crewPersonnel: action.crewPersonnel };
    case FETCH_CREW_PERSONNEL_FAILURE:
      return { ...state, fetching: false, crewPersonnel: null, error: action.error };
    default:
      return state;
  }
}