import eventData from "../../data/events.json" assert { type: "json" };

const getEvents = () => {
  return eventData.events;
};

export default getEvents;
