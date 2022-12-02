const getReciverName = (loggedUser, users) => {
  if (loggedUser._id === users[0]._id) {
    return users[1].name;
  }
  return users[0].name;
};

export default getReciverName;
