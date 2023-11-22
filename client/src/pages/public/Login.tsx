import { useState, FormEvent, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link as LinkBtn,
  Input,
  Checkbox,
} from "@nextui-org/react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { TbBrandFirebase } from "react-icons/tb";

import auth from "~/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ? Services
import { Auth } from "~/services/services.barrel";

// ? Redux
import { useAppDispatch } from "~/utils/hooks/redux.hooks";
import { showAlert } from "~/context/alert/alertSlice";

export default function Login() {
  const navigate = useNavigate();
  // ? Redux States
  const dispatch = useAppDispatch();

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
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.warn("Redirecting User to '/'....");
      navigate("/", { replace: true });
      dispatch(
        showAlert({
          show: true,
          type: "success",
          msg: "Successfully Found Your Account",
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          show: true,
          type: "danger",
          msg: "Error! No User Found",
        })
      );

      console.log(
        "Some Error Occurred while Logging the user using firebase",
        error
      );
    }

    setFormSubmitStatus(false);
  };
  // ? Google Signin
  const handleGoogleSignin = async () => {
    setFormSubmitStatus(true);
    try {
      const response = await Auth.createUserWithGoogle();

      if (response === 201) {
        console.warn("Redirecting User to '/'....");
        navigate("/", { replace: true });
        dispatch(
          showAlert({
            show: true,
            type: "success",
            msg: "Successfully Found Your Account",
          })
        );
      } else {
        dispatch(
          showAlert({
            show: true,
            type: "danger",
            msg: "Error! Check Your Inputs Again..",
          })
        );
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          show: true,
          type: "danger",
          msg: `Error ! Try Again : ${error}`,
        })
      );
    }
    setFormSubmitStatus(false);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-main-text-default">
      <h1 className="text-2xl font-bold text-center text-light-main dark:text-dark-main my-3 capitalize">
        Welcome! Login
      </h1>
      <p className="text-base capitalize flex flex-1 flex-row justify-center items-center ">
        Powered By
        <LinkBtn
          href="https://firebase.google.com/"
          size="md"
          color="warning"
          isExternal={true}
          className="mx-2"
          showAnchorIcon
        >
          <TbBrandFirebase size={25} />
          Firebase
        </LinkBtn>
      </p>
      <form onSubmit={handleFormSubmit}>
        <CardBody>
          <Input
            autoFocus
            endContent={<MdMail className="text-2xl pointer-events-none" />}
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            type="email"
            autoComplete="current-password"
            name="email"
            value={formData.email}
            onChange={handleInputCapture}
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
          />
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
        <CardFooter className="flex flex-col gap-4">
          <Button
            startContent={<FcGoogle size={20} />}
            onClick={handleGoogleSignin}
            fullWidth
            variant="ghost"
            color="secondary"
            size="md"
          >
            Login With Google
          </Button>
        </CardFooter>
        <CardFooter className="flex flex-row justify-end gap-4">
          <Button color="danger" variant="flat" type="reset">
            Reset
          </Button>
          <Button color="primary" type="submit" isLoading={formSubmitStatus}>
            Proceed
          </Button>
        </CardFooter>
        <CardFooter className="flex flex-row justify-end">
          <LinkBtn as={Link} color="primary" to="/signup" size="sm">
            Don't Have Account
          </LinkBtn>
        </CardFooter>
      </form>
    </Card>
  );
}
/**
 * 
 * 
import { FaGithubAlt } from "react-icons/fa";
import { BsMicrosoft } from "react-icons/bs";
import { FaSquareXTwitter, FaSquareFacebook, FaApple } from "react-icons/fa6";

 *  <Button
            startContent={<BsMicrosoft size={20} />}
            onClick={async () => {
              setFormSubmitStatus(true);
              console.log("Signing in with Microsoft........... ");
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="success"
            size="md"
          >
            Login With Microsoft
          </Button>
          <Button
            startContent={<FaSquareXTwitter size={20} />}
            onClick={async () => {
              setFormSubmitStatus(true);
              console.log("Signing in with X........... ");
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="primary"
            size="md"
          >
            Login With X
          </Button>
          <Button
            startContent={<FaGithubAlt size={20} />}
            onClick={() => {
              setFormSubmitStatus(true);
              console.log("Signing in with Github...........");
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="default"
            size="md"
          >
            Login With Github
          </Button>
          <Button
            startContent={<FaApple  size={20} />}
            onClick={() => {
              setFormSubmitStatus(true);
              console.log("Signing in with Apple ...........");
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="warning"
            size="md"
          >
            Login With Apple 
          </Button>
          <Button
            startContent={<FaSquareFacebook size={20} />}
            onClick={async () => {
              setFormSubmitStatus(true);
              console.log("Signing in with Facebook........... ");
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="primary"
            size="md"
          >
            Login With Facebook
          </Button>
 */
