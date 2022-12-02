const getFirstName = (fullname) => {
  const fullnameArray = fullname.split(" ");
  return fullnameArray[0];
};

export default getFirstName;
