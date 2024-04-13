import eventData from "../../data/events.json" assert { type: "json" };

const getEventById = (id) => {
  const event = eventData.events.find((event) => event.id === id);
  if (!event) {
    console.error(
      `ERROR: The event with id:${id} does not exist or cannot be accessed!`,
    );
  }
  return event;
};

export default getEventById;
