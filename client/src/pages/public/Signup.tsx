import { useState, FormEvent, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Link as LinkBtn,
  Input,
  Checkbox,
  Textarea,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { MdMail } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { BiSolidRename } from "react-icons/bi";
import { BsFillFileEarmarkRichtextFill } from "react-icons/bs";

import { AvatarInput, CoverImgInput } from "~/components/components.barrel";
import { FormDataInterface } from "~/types/types.barrel";
import { Countries } from "~/utils/data/data.barrel";

// ? Services
import { Auth } from "~/services/services.barrel";

// ? Redux
import { useAppDispatch } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/context/user/userSlice";
import { showAlert } from "~/context/alert/alertSlice";

function Signup() {
  const navigate = useNavigate();
  // ? Redux States
  const dispatch = useAppDispatch();

  // ? States
  const [formData, setFormData] = useState<FormDataInterface>({
    username: "",
    bio: "",
    avatarURL: "",
    coverURL: "",
    name: "",
    country: "",
    gender: "",
    password: "",
    email: "",
  });

  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

  const [, setCookie] = useCookies(["secret_text"]);

  // ? Handlers
  const handleInputCapture = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ? Form Submit
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitStatus(true);
    try {
      const usernamesResponse = await Auth.checkUsernameAvailability(
        formData.username
      );

      if (usernamesResponse === 400) {
        dispatch(
          showAlert({
            show: true,
            type: "danger",
            msg: `Error ! Your username must not contain spaces or special characters.`,
          })
        );
      } else if (usernamesResponse === 403) {
        dispatch(
          showAlert({
            show: true,
            type: "danger",
            msg: `Error ! This username is not available to use.`,
          })
        );
      } else {
        const resFromServer = await Auth.createUser(formData);

        dispatch(
          showAlert({
            show: true,
            type: "warning",
            msg: "Please Wait!! Creating your account ",
          })
        );

        if (resFromServer?.status === 202) {
          dispatch(
            showAlert({
              show: true,
              type: "warning",
              msg: "Almost Done",
            })
          );

          setCookie("secret_text", resFromServer?.data.responseData.token, {
            path: "/",
            maxAge: 28 * 24 * 60 * 60 * 1000,
          });

          dispatch(
            updateUserData({
              authStatus: "loading",
              mail: "",
              name: "",
              userImg: "",
              username: "",
            })
          );

          dispatch(
            showAlert({
              show: true,
              type: "success",
              msg: "Successfully Created Your Account!",
            })
          );
          navigate("/", { replace: true });
        } else {
          dispatch(
            showAlert({
              show: true,
              type: "danger",
              msg: `Error! ${resFromServer?.data.message}`,
            })
          );
        }
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          show: true,
          type: "danger",
          msg: `Error ! Check your inputs again : ${error}`,
        })
      );
    }
    setFormSubmitStatus(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Card
        radius="sm"
        shadow="lg"
        className="bg-main-text-main  max-sm:min-w-[320px] min-w-[500px]"
      >
        <CardHeader className="flex-col justify-center">
          <h1 className="text-center text-2xl font-bold tracking-widest capitalize text-light-main dark:text-dark-main my-3">
            Create Account
          </h1>
          <p className=" text-center mt-1 my-4 text-sm font-medium -tracking-wider capitalize">
            This information will be displayed <br /> publicly so be careful
            what you share.
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          <Input
            name="name"
            autoFocus
            type="text"
            label="Name"
            endContent={
              <BiSolidRename className="text-2xl pointer-events-none" />
            }
            placeholder="Elon Musk"
            labelPlacement="inside"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            isRequired={true}
            value={formData.name}
            min={3}
            max={40}
          />

          <Input
            name="username"
            variant="flat"
            type="text"
            label="Username"
            placeholder="@elonmusk"
            endContent={
              <BsFillFileEarmarkRichtextFill className="text-2xl pointer-events-none" />
            }
            labelPlacement="inside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-primary text-small">vixel.com/</span>
              </div>
            }
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            isRequired={true}
            value={formData.username}
            min={5}
            max={50}
          />

          <Input
            name="email"
            endContent={<MdMail className="text-2xl pointer-events-none" />}
            label="Email"
            placeholder="Enter your email"
            variant="flat"
            type="email"
            autoComplete="current-password"
            isRequired={true}
            value={formData.email}
            onChange={handleInputCapture}
          />
          <Input
            name="password"
            endContent={
              <div
                onClick={() => {
                  setPasswordView(!passwordView);
                }}
                className="cursor-pointer"
              >
                {passwordView === true ? (
                  <IoMdEye className="text-2xl pointer-events-none" />
                ) : (
                  <IoMdEyeOff className="text-2xl pointer-events-none" />
                )}
              </div>
            }
            label="Password"
            placeholder="Enter your password"
            type={passwordView === true ? "text" : "password"}
            variant="flat"
            autoComplete="current-email"
            isRequired={true}
            value={formData.password}
            onChange={handleInputCapture}
          />

          <AvatarInput formData={formData} setFormData={setFormData} />
          <CoverImgInput formData={formData} setFormData={setFormData} />

          <Textarea
            name="bio"
            isRequired={true}
            label="Bio"
            labelPlacement="inside"
            placeholder="I Am A Freak and I Own X."
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
            }}
            value={formData.bio}
            min={10}
            max={100}
          />

          <Select
            label="Your Gender"
            fullWidth
            name="gender"
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
            }}
            isRequired={true}
            value={formData.gender}
          >
            <SelectItem className="bg-def" key="male" value="male">
              Male
            </SelectItem>
            <SelectItem className="bg-def" key="female" value="female">
              Female
            </SelectItem>
            <SelectItem
              className="bg-def"
              key="transgender"
              value="transgender"
            >
              Transgender
            </SelectItem>
          </Select>

          <Select
            name="country"
            isRequired={true}
            label="Select Your Country"
            fullWidth
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
            }}
            value={formData.country}
          >
            {Countries.map((country: string) => (
              <SelectItem
                className="bg-main-text-default"
                key={country}
                value={country}
              >
                {country}
              </SelectItem>
            ))}
          </Select>

          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <LinkBtn as={Link} color="primary" to="/login/pwd-reset" size="sm">
              Forgot password?
            </LinkBtn>
          </div>
        </CardBody>
        <CardBody className="flex flex-row justify-end gap-4">
          <Button
            color="danger"
            variant="flat"
            type="reset"
            onClick={() => {
              setFormData({
                username: "",
                bio: "",
                avatarURL: "",
                coverURL: "",
                name: "",
                country: "",
                gender: "",
                password: "",
                email: "",
              });
            }}
          >
            Reset
          </Button>
          <Button color="primary" type="submit" isLoading={formSubmitStatus}>
            Create
          </Button>
        </CardBody>

        <CardFooter className="flex flex-row justify-end">
          <LinkBtn as={Link} color="primary" to="/login" size="sm">
            Already Have Account
          </LinkBtn>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Signup;
