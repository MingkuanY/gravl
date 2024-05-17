"use client";

import Icon from "../icons/Icon";

export default function EditProfileButton() {
  const editProfile = () => {};

  return (
    <div onClick={() => editProfile()}>
      <Icon type="edit" fill="#757575" />
    </div>
  );
}
