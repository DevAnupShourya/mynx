import { Avatar, Button } from "@nextui-org/react";
import { SetStateAction, useRef } from "react";
import { CgProfile } from "react-icons/cg";

import {
  FormDataInterface,
  UpdateUserProfileInterface,
} from "~/types/types.barrel";

type FormDataType = FormDataInterface | UpdateUserProfileInterface;
type SetFormDataType =
  | React.Dispatch<React.SetStateAction<FormDataInterface>>
  | React.Dispatch<React.SetStateAction<UpdateUserProfileInterface>>;

function AvatarInput({
  formData,
  setFormData,
}: {
  formData: FormDataType;
  setFormData: SetFormDataType;
}) {
  const avatarInput = useRef<HTMLInputElement | null>(null);

  function clickAvatarInput() {
    avatarInput.current?.click();
  }

  function handleAvatarChange() {
    if (avatarInput.current?.files?.[0]) {
      const file = avatarInput.current.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setFormData({
          ...formData,
          avatarURL: event.target?.result as string,
        } as SetStateAction<FormDataInterface> &
          SetStateAction<UpdateUserProfileInterface>);
      };

      reader.onerror = (event) => {
        console.warn(event.target + " Got Error!!!");
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <p>Avatar Image</p>
      <div className="flex flex-row gap-2 items-center">
        <Avatar
          showFallback
          src={formData.avatarURL}
          size="lg"
          fallback={
            <CgProfile
              className="animate-pulse w-6 h-6 text-default-500"
              fill="currentColor"
            />
          }
        />
        <Button type="button" variant="flat" onClick={clickAvatarInput}>
          Change Avatar
        </Button>
        <input
          type="file"
          ref={avatarInput}
          name="avatarSrc"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>
      <p className="text-sm text-default-400">Less than 1MB</p>
    </>
  );
}

export default AvatarInput;
