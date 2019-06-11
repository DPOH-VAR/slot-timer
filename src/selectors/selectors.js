import { createSelector } from "reselect";


export const getSlots = state => state.slots;
export const getSlotsCount = createSelector([getSlots], slots => slots.length );
export const getSlotOptionsModalIndex = state => state.slotOptionsModal.index;
export const getSlotOptionsModalSlot = createSelector([getSlots, getSlotOptionsModalIndex], (slots ,index) => slots[index]);
export const getSlotDates = createSelector([getSlots], slots => slots.map(slot => slot ? slot.date : 0).filter(_=>_));
export const getSlotOptionsModalSlotDateText = createSelector([getSlotOptionsModalSlot], slot => {
	if (!slot || !slot.date) return '';
	const date = new Date(slot.date);
	const y = String(date.getUTCFullYear()).padStart(4, '0');
	const m = String(date.getUTCMonth() + 1).padStart(2, '0');
	const d = String(date.getUTCDate()).padStart(2, '0');
	const hh = String(date.getUTCHours()).padStart(2, '0');
	const mm = String(date.getUTCMinutes()).padStart(2, '0');
	const ss = String(date.getUTCSeconds()).padStart(2, '0');
	return `${y}${m}${d}T${hh}${mm}${ss}Z`;
});

const eventTitle = "Не забудьте забрать ребенка";
const eventDescription = "Спасибо, что посещаете наш центр. Не забудьте забрать ребенка";
const eventLocation = "Детский центр \"Панда\"";

export const getOptions = state => state.options;

export const getSlotOptionsQrCodeData = createSelector(
	[getSlotOptionsModalSlot, getSlotOptionsModalIndex, getSlotOptionsModalSlotDateText, getOptions],
	(slot, index, dateText, options) => {
		if (!slot || !slot.date) return '';
		return `
			BEGIN:VEVENT
				SUMMARY:${options.title}
				LOCATION:${options.location}
				DESCRIPTION:${options.description}
				DTSTART:${dateText}
				DTEND:${dateText}
				BEGIN:VALARM
			        TRIGGER;RELATED=START:-PT5M
			        ACTION:DISPLAY
			        DESCRIPTION:Reminder
				END:VALARM
			END:VEVENT
		`.replace(/^\s*\n\s*|\s*\n\s*$/g, "").replace(/\n\s*/g, "\n");
	},
);


export const getOptionsModalOpened = createSelector([getOptions], options => options.opened);