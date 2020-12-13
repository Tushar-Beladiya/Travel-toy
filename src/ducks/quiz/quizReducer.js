// import {
//   CONSTANTS
// } from "../constants";

export const initialState = {
  quizData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case CONSTANTS:
    //   return {
    //     ...state,
    //     quizData: {
    //       ...state.quizData,
    //       ...action.payload
    //     },
    //   };
    default:
      return state;
  }
}