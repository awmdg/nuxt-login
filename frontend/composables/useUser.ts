export function useUser() {
  function model({
    _id = "",
    givenName = "",
    middleName = "",
    surname = "",
    address = {
      country: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      postalCode: ""
    },
    email = "",
    password = "",
    type = "",
    role = "",
    organization = "",
    status = "",
    createdAt = "",
    updatedAt = "",
  }: Partial<TUser> = {}): TUser {
    return {
      givenName,
      middleName,
      surname,
      address: {
        country: address.country || "",
        address1: address.address1 || "",
        address2: address.address2 || "",
        city: address.city || "",
        province: address.province || "",
        postalCode: address.postalCode || "",
      },
      email,
      password,
      type,
      role,
      organization,
      status,
      createdAt,
      updatedAt,
      _id,
    };
  }

  return {
    model
  };
}