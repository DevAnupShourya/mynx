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

import { MdMail } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { TbBrandFirebase } from "react-icons/tb";

import { AvatarInput, CoverImgInput } from "~/components/components.barrel";
import { FormDataInterface } from "~/types/types.barrel";
import { Countries } from "~/utils/data/data.barrel";

// ? Services
import { Auth } from "~/services/services.barrel";

// ? Redux
import { useAppDispatch } from "~/utils/hooks/redux.hooks";
import { showAlert } from "~/context/alert/alertSlice";
// import { updateUserData } from "~/context/user/userSlice";

function Signup() {
  const navigate = useNavigate();
  // ? Redux States
  const dispatch = useAppDispatch();
  // const userState = useAppSelector((state) => state.user);

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

      if (usernamesResponse === 404) {
        window.alert(
          "Your username must not contain spaces or special characters or spaces."
        );
      } else if (usernamesResponse === 403) {
        window.alert("This username is not available to use.");
      } else {
        const response = await Auth.createUser(formData);
        if (response.status === 201) {
          console.warn('Redirecting User to \'/\'....')
          navigate("/");
          dispatch(
            showAlert({
              show: true,
              type: "success",
              msg: "Successfully Created Your Account",
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
      <Card className="w-full h-auto max-w-lg mx-auto bg-main-text-default">
        <CardHeader className="block">
          <h1 className="text-2xl font-bold text-center text-light-main dark:text-dark-main my-3 capitalize">
            Welcome! Create Account
          </h1>
          <p className="text-sm mt-1 leading-6 text-center my-4">
            This information will be displayed <br /> publicly so be careful
            what you share.
          </p>
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
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          <Input
            name="name"
            autoFocus
            type="text"
            label="Name"
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

        <Divider />

        {/* <CardBody className="flex flex-col gap-4">
          <Button
            startContent={<FcGoogle size={20} />}
            onClick={async () => {
              setFormSubmitStatus(true);
              try {
                // * Saving User in firebase
                const { user: savedUser } = await signInWithPopup(
                  auth,
                  provider
                );

                // * Saving User in Global Redux State [User]
                dispatch(
                  updateUserData({
                    ...userState,
                    name: savedUser.displayName!,
                    mail: savedUser.email!,
                    username: savedUser.displayName!,
                    dateJoined: savedUser.metadata.creationTime!,
                    userImg: savedUser.photoURL!,
                  })
                );

                console.log("Created User In Firestore.");
                // ? saving in firebase with just password , email
                // ? saving in my db with more data

                // ? Navidate to dasboard with /
              } catch (error) {
                console.log("Error While Signing in with google", error);
              }
              setFormSubmitStatus(false);
            }}
            type="submit"
            fullWidth
            variant="ghost"
            color="secondary"
            size="md"
          >
            Create Account With Google
          </Button>
        </CardBody> */}

        <CardBody className="flex flex-row justify-end gap-4">
          <Button color="danger" variant="flat" type="reset">
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

/**
 * <Button
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
            Create Account With Microsoft
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
            Create Account With X
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
            Create Account With Github
          </Button>
          <Button
            startContent={<FaApple size={20} />}
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
            Create Account With Apple
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
            Create Account With Facebook
          </Button>
 */
