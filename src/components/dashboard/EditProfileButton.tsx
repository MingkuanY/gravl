"use client";

import Icon from "../icons/Icon";

export default function EditProfileButton({
  setEditProfile,
}: {
  setEditProfile: Function;
}) {
  return (
    <div onClick={() => setEditProfile(true)}>
      <Icon type="edit" fill="#757575" />
    </div>
  );
}
