"use client";

import Link from "next/link";
import Icon from "../icons/Icon";

export default function EditProfileButton() {
  return (
    <Link href="/?ob=true">
      <div>
        <Icon type="edit" fill="#757575" />
      </div>
    </Link>
  );
}
