import { Link } from "react-router-dom";
import { Link as LinkBtn, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main id="hero" className="mx-auto w-2/3 ">
      <div className="mb-4 max-sm:mb-6 flex justify-center">
        <div className="relative rounded-full px-3 py-1 text-base leading-6 text-light-default dark:text-dark-default ring-1 text-center">
          Welcoming Contributions on &nbsp;
          <LinkBtn
            as={Link}
            to={"https://github.com/DevAnupShourya/vixel"}
            color="secondary"
            underline="hover"
            isExternal
            showAnchorIcon
          >
            Github
          </LinkBtn>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-8xl font-bold tracking-widest uppercase ps_font text-light-main dark:text-dark-main">
          World
          <br />
          in
          <br />
          Pixels
        </h1>
        <h3 className="mt-6 text-4xl font-semibold tracking-wider capitalize ps_font">
          the ultimate social media platform.
        </h3>
        <p className="mt-6 text-sm font-medium -tracking-wider capitalize">
          social media platform designed to connect individuals through a
          vibrant and visually captivating experience. With an intuitive
          interface and cutting-edge features, Vixel empowers users to express
          their creativity, share their life moments, and engage with a global
          community. Whether you're an aspiring photographer, artist, or simply
          looking to connect with like-minded individuals, Vixel offers a unique
          platform to showcase your talents and foster meaningful connections.
          Join us today and embark on a journey where the world unfolds pixel by
          pixel.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            as={Link}
            to={"/login"}
            variant="shadow"
            color="primary"
            size="lg"
          >
            Join
          </Button>
        </div>
      </div>
    </main>
  );
}
