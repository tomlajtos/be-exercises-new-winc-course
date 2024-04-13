import userData from "../../data/users.json" assert { type: "json" };

const getUserById = (id) => {
  const user = userData.users.find((user) => user.id === id);
  if (!user) {
    console.error(
      `ERROR: User with id: ${id} does not exist or cannot be accessed!`,
    );
  }
  return user;
};

export default getUserById;
