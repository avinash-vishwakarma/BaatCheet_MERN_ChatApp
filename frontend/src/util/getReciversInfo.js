const getReciverInfo = (loggedUser, users) => {
  if (loggedUser._id === users[0]._id) {
    return users[1];
  }
  return users[0];
};

export default getReciverInfo;
