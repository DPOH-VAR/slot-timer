import { createSelector } from "reselect";


export const getSlots = state => state.slots;
export const getSlotCount = state => state.slots.length;
export const getSlotOptionsModalIndex = state => state.slotOptionsModal.index;
export const getSlotDates = createSelector([getSlots], slots => slots.map(slot => slot ? slot.date : 0).filter(_=>_));