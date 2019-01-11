import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* crewPersonnelWatcherSaga() {
  yield takeLatest("FETCH_CREW_PERSONNEL_REQUEST", crewPersonnelWorkerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchCrewPersonnel() {
  return axios({
    method: "get",
    url: "https://randomuser.me/api/?nat=gb&results=5"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* crewPersonnelWorkerSaga() {
  try {
    const response = yield call(fetchCrewPersonnel);
    const results = response.data.results;

    const crewPersonnel = results.map(crewMember => ({
      ...crewMember,
      hiringStatus: "applied",
      filtered: false
    }));

    // dispatch a success action to the store with the crew personnel
    yield put({ type: "FETCH_CREW_PERSONNEL_SUCCESS", crewPersonnel });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "FETCH_CREW_PERSONNEL_FAILURE", error });
  }
}