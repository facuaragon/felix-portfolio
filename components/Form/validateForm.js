"use client";

import { formErrors } from "@/utils/data";

export const validations = (form) => {
  const errors = {};
  if (!form.name) {
    errors.name = formErrors.name[language];
  } else {
    errors.name = "";
  }
  if (!form.email) {
    errors.email = formErrors.email.required[language];
  } else if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      form.email
    )
  ) {
    errors.email = formErrors.email.format[language];
  } else {
    errors.email = "";
  }
  if (!form.phone) {
    errors.phone = formErrors.phone.required[language];
  } else if (!/^[0-9]*$/.test(form.phone)) {
    errors.phone = formErrors.phone.format[language];
  } else {
    errors.phone = "";
  }
  if (!form.message) {
    errors.message = formErrors.message[language];
  } else {
    errors.message = "";
  }
  return errors;
};
