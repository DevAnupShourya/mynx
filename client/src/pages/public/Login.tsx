import { useState, FormEvent, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link as LinkBtn,
  Input,
  Checkbox,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { MdMail } from "react-icons/md";

// ? Redux
import { useAppDispatch } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/redux/user/userSlice";
import { Toast } from "~/components/components.barrel";
import { toast as reactToast } from "react-toastify";

// ? Services
import { Auth } from "~/services/services.barrel";

export default function Login() {
  const navigate = useNavigate();
  // ? Redux States
  const dispatch = useAppDispatch();
  const [, setCookie] = useCookies(["secret_text"]);

  // ? States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

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
      const resFromServer = await Auth.authenticateUser(formData);

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

      reactToast.loading("Please Wait!!", { toastId: "login_form_waiting" });

      dispatch(
        updateUserData({
          authStatus: "authenticated",
          mail: resFromServer.data.responseData.userAvailable.email,
          name: resFromServer.data.responseData.userAvailable.name,
          userImg: resFromServer.data.responseData.userAvailable.avatarURL,
          username: resFromServer.data.responseData.userAvailable.username,
        })
      );

      navigate("/", { replace: true });

      reactToast.done("login_form_waiting");

      Toast.success("Successfully Found Your Account");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(`Error : ${error.response.data.message}`);
      console.error("Error :", error.response.data.message);
    }
    setFormSubmitStatus(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Card
        radius="sm"
        shadow="lg"
        className="bg-main-text-main m-36 max-md:m-24 max-sm:min-w-[320px] min-w-[500px]"
      >
        <CardHeader className="justify-center">
          <h1 className="text-2xl font-bold tracking-widest capitalize text-light-main dark:text-dark-main">
            Login
          </h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            autoFocus
            endContent={<MdMail className="text-2xl pointer-events-none" />}
            label="Email"
            placeholder="Enter your email"
            type="email"
            autoComplete="current-password"
            name="email"
            value={formData.email}
            isRequired={true}
            onChange={handleInputCapture}
            variant="bordered"
          />
          <br />
          <Input
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
            variant="bordered"
            autoComplete="current-email"
            name="password"
            value={formData.password}
            onChange={handleInputCapture}
            isRequired={true}
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <LinkBtn as={Link} color="danger" to="/login/pwd-reset" size="sm">
              Forgot password?
            </LinkBtn>
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-end gap-4">
          <Button color="primary" type="submit" isLoading={formSubmitStatus}>
            Proceed
          </Button>
        </CardFooter>
        <Divider />
        <CardFooter className="flex flex-row justify-end">
          <LinkBtn as={Link} color="warning" to="/signup" size="sm">
            Don't Have Account!
          </LinkBtn>
        </CardFooter>
      </Card>
    </form>
  );
}
