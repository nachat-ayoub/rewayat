module.exports.isEmpty = ([state, setState]) => {
  const isEmpty = state.value.trim() === "";
  if (isEmpty)
    setState({
      ...state,
      valid: false,
      error: `this field is required.`,
      focused: true,
    });
  return isEmpty;
};

module.exports.isLessThen = ([state, setState], minLength) => {
  const isLessThen = state.value.trim().length < minLength;
  if (isLessThen) {
    setState({
      ...state,
      valid: false,
      error: `min length is ${minLength} characters.`,
      focused: true,
    });
  }

  return isLessThen;
};

module.exports.isBigThen = ([state, setState], maxLength) => {
  const isBigThen = state.value.trim().length > maxLength;
  if (isBigThen) {
    setState({
      ...state,
      valid: false,
      error: `max length is ${maxLength} characters.`,
      focused: true,
    });
  }

  return isBigThen;
};

module.exports.isValidUsername = ([state, setState]) => {
  const isValidUsername = !/[^a-z0-9_]/.test(state.value.trim());
  if (!isValidUsername) {
    setState({
      ...state,
      valid: false,
      error: `${state.value.trim()} is not a valid username.`,
      focused: true,
    });
  }

  return isValidUsername;
};

module.exports.isEmail = ([state, setState]) => {
  const isEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      state.value
    );

  if (!isEmail) {
    setState({
      ...state,
      valid: false,
      error: `this email is not valide.`,
      focused: true,
    });
  }
  return isEmail;
};

module.exports.areMatch = ([state, setState], val1) => {
  const matched = state.value === val1;

  if (!matched)
    setState({
      ...state,
      valid: false,
      error: `passwords does not match.`,
      focused: true,
    });
  return matched;
};
