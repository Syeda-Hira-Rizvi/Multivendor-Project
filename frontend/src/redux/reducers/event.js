// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: true,
// };

// export const eventReducer = createReducer(initialState, {
//   eventCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   eventCreateSuccess: (state, action) => {
//     state.isLoading = false;
//     state.event = action.payload;
//     state.success = true;
//   },
//   eventCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   // get all events of shop
//   getAlleventsShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAlleventsShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.events = action.payload;
//   },
//   getAlleventsShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // delete event of a shop
//   deleteeventRequest: (state) => {
//     state.isLoading = true;
//   },
//   deleteeventSuccess: (state, action) => {
//     state.isLoading = false;
//     state.message = action.payload;
//   },
//   deleteeventFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // get all events 
//   getAlleventsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAlleventsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allEvents = action.payload;
//   },
//   getAlleventsFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   clearErrors: (state) => {
//     state.error = null;
//   },
// });





// UPDATED REDUCER WITH BUILDER NOTATION INSTEAD OF OBJECT NOTATION WHICH IS BEING DEPRECATED FROM VERSION 1.9.0 OF REDUXJS/TOOLKIT
import { createReducer } from "@reduxjs/toolkit";
import {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAlleventsShopRequest,
  getAlleventsShopSuccess,
  getAlleventsShopFailed,
  deleteeventRequest,
  deleteeventSuccess,
  deleteeventFailed,
  getAlleventsRequest,
  getAlleventsSuccess,
  getAlleventsFailed,
  clearErrors,
} from "../constants/eventConstants";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // create event
    .addCase(eventCreateRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(eventCreateSuccess, (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase(eventCreateFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // get all events of shop
    .addCase(getAlleventsShopRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAlleventsShopSuccess, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase(getAlleventsShopFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // delete event
    .addCase(deleteeventRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteeventSuccess, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(deleteeventFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all events
    .addCase(getAlleventsRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAlleventsSuccess, (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase(getAlleventsFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // clear errors
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});

