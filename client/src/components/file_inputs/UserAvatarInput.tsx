import { Avatar, Button } from "@nextui-org/react";
import { SetStateAction, useRef } from "react";

import { CgProfile } from "react-icons/cg";

import {
  FormDataInterface,
  UpdateUserProfileInterface,
} from "~/types/user.types";

// ? Using this Component in Creation and Updation both time with state
type FormDataType = FormDataInterface | UpdateUserProfileInterface;
type SetFormDataType =
  | React.Dispatch<React.SetStateAction<FormDataInterface>>
  | React.Dispatch<React.SetStateAction<UpdateUserProfileInterface>>;

function UserAvatarInput({
  formData,
  setFormData,
}: {
  formData: FormDataType;
  setFormData: SetFormDataType;
}) {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  function handleAvatarChange() {
    if (avatarInputRef.current?.files?.[0]) {
      const file = avatarInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        // ? Mutating The State of Parent Form State
        setFormData({
          ...formData,
          avatarURL: event.target?.result as string,
        } as SetStateAction<FormDataInterface> &
          SetStateAction<UpdateUserProfileInterface>);
      };

      reader.onerror = (event) => {
        console.error(`Error : ${event.target}`);
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
        <Button
          type="button"
          variant="flat"
          onClick={() => {
            avatarInputRef.current?.click();
          }}
        >
          Change Avatar
        </Button>
        <input
          type="file"
          ref={avatarInputRef}
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

export default UserAvatarInput;
