import React, { SetStateAction } from "react";

import { Image as ImageComponent, Button } from "@nextui-org/react";
import { HiPhoto } from "react-icons/hi2";

import {
  FormDataInterface,
  UpdateUserProfileInterface,
} from "~/types/types.barrel";

type FormDataType = FormDataInterface | UpdateUserProfileInterface;
type SetFormDataType =
  | React.Dispatch<React.SetStateAction<FormDataInterface>>
  | React.Dispatch<React.SetStateAction<UpdateUserProfileInterface>>;

export default function CoverImgInput({
  formData,
  setFormData,
}: {
  formData: FormDataType;
  setFormData: SetFormDataType;
}) {
  const [showCoverPic, setShowCoverPic] = React.useState(false);
  const inputCoverPic = React.useRef<HTMLInputElement | null>(null);

  function handleCoverPicChangeBtn() {
    inputCoverPic.current?.click();
  }
  function handleCoverPicChange() {
    setShowCoverPic(true);
    if (inputCoverPic.current?.files?.[0]) {
      const file = inputCoverPic.current.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setFormData({
          ...formData,
          coverURL: event.target?.result as string,
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
    <div id="CoverPicker" className="flex flex-col gap-2">
      <p>Cover Image</p>
      <div
        className={`w-full h-48 flex flex-col items-center justify-center ${
          showCoverPic === true ? "border-none" : "border"
        }  border-dashed rounded-md overflow-hidden`}
      >
        <HiPhoto
          className={`${
            showCoverPic === true ? "hidden" : ""
          } h-12 w-12 text-primary`}
          aria-hidden="true"
        />
        <p
          className={`${
            showCoverPic === true ? "hidden" : ""
          }  text-sm text-default-400`}
        >
          or drag and drop PNG, JPG, GIF up to 2MB
        </p>
        <ImageComponent
          isZoomed
          isBlurred
          className="w-full h-auto border bg-center bg-cover bg-no-repeat"
          src={formData.coverURL}
          alt="Profile Cover Image"
        />
      </div>
      <Button type="button" variant="flat" onClick={handleCoverPicChangeBtn}>
        Change Cover
      </Button>
      <input
        type="file"
        ref={inputCoverPic}
        accept="image/*"
        onChange={handleCoverPicChange}
        style={{ display: "none" }}
        name="coverURL"
      />
    </div>
  );
}
