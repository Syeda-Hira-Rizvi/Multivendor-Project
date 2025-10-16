import { createAction } from "@reduxjs/toolkit";

export const eventCreateRequest = createAction("eventCreateRequest");
export const eventCreateSuccess = createAction("eventCreateSuccess");
export const eventCreateFail = createAction("eventCreateFail");

export const getAlleventsShopRequest = createAction("getAlleventsShopRequest");
export const getAlleventsShopSuccess = createAction("getAlleventsShopSuccess");
export const getAlleventsShopFailed = createAction("getAlleventsShopFailed");

export const deleteeventRequest = createAction("deleteeventRequest");
export const deleteeventSuccess = createAction("deleteeventSuccess");
export const deleteeventFailed = createAction("deleteeventFailed");

export const getAlleventsRequest = createAction("getAlleventsRequest");
export const getAlleventsSuccess = createAction("getAlleventsSuccess");
export const getAlleventsFailed = createAction("getAlleventsFailed");

export const clearErrors = createAction("clearErrors");
