function validation(values) {
  let error = {};
  const email_pattern =
    /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})+$/;
  //   const password_pattern =
  //     /^(?=^[ -~]{6,64}$)(?=.*([a-z][A-Z]))(?=.*[0-9])(.*[ -/|:-@|\[-`|{-~]).+$/;

  if (values.email === "") {
    error.email = "Email should not be empty";
    //   } else if (!email_pattern.test(values.email)) {
    //     error.email = "Email didn't match";
    //   }
  } else {
    error.email = "";
  }

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
    //   } else if (!password_pattern.test(values.password)) {
    //     error.password = "Password didn't match";
    //   }
  } else {
    error.password = "";
  }

  return error;
}

export default validation;
