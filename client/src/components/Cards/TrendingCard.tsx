import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  ScrollShadow,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

import { HiTrendingUp } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartDislikeCircleOutline } from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";

const TrendingCardWords = [
  {
    word: "Blockchain",
    posts: "15K",
    place: "Worldwide",
  },
  {
    word: "Artificial Intelligence",
    posts: "12K",
    place: "USA",
  },
  {
    word: "Machine Learning",
    posts: "10K",
    place: "Worldwide",
  },
  {
    word: "Cybersecurity",
    posts: "9K",
    place: "IND",
  },
  {
    word: "Web Development",
    posts: "8K",
    place: "Worldwide",
  },
  {
    word: "Data Science",
    posts: "7K",
    place: "EU",
  },
  {
    word: "Cloud Computing",
    posts: "6K",
    place: "CHN",
  },
  {
    word: "Mobile App Development",
    posts: "5K",
    place: "Worldwide",
  },
  {
    word: "DevOps",
    posts: "4K",
    place: "RUS",
  },
  {
    word: "UX/UI Design",
    posts: "4K",
    place: "AUS",
  },
];

function TrendingCard() {
  return (
    <Card
      radius="lg"
      className={`bg-main-text-default h-5/6 backdrop-blur-3xl`}
    >
      <CardHeader>
        <h1 className="text-xl font-semibold tracking-widest capitalize text-light-main dark:text-dark-main">
          What’s happening
        </h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <ScrollShadow hideScrollBar className="w-full h-full">
          {TrendingCardWords.map((word) => {
            return (
              <div className="w-full my-1">
                <div className="flex items-center justify-between">
                  <h1 className="flex items-center justify-between gap-1 text-sm font-medium -tracking-wider capitalize dark:text-dark-default text-light-default ">
                    <HiTrendingUp className="text-2xl text-warning" /> |{" "}
                    {word.place}
                  </h1>
                  <Popover
                    radius="sm"
                    shadow="lg"
                    size="sm"
                    placement="bottom"
                    className={``}
                  >
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        radius="full"
                        color="danger"
                        variant="light"
                        role="button"
                      >
                        <BsThreeDotsVertical />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-main-text-default py-5 gap-2">
                      <Button
                        fullWidth
                        variant="flat"
                        color="warning"
                        as={RouterLink}
                        to={"/#"}
                        startContent={
                          <IoHeartDislikeCircleOutline className="text-warning text-3xl" />
                        }
                      >
                        Not interested in this
                      </Button>
                      <Button
                        fullWidth
                        variant="flat"
                        color="danger"
                        as={RouterLink}
                        to={"/#"}
                        startContent={
                          <MdOutlineDangerous className="text-danger text-3xl" />
                        }
                      >
                        This trend is harmful or spammy
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>

                <Link
                  as={RouterLink}
                  to={`/trending?q=${word.word}`}
                  color="secondary"
                  className="w-full h-auto"
                >
                  <h1 className="text-lg font-thin tracking-widest capitalize">
                    {word.word}
                  </h1>
                </Link>
                <h2 className="text-sm dark:text-dark-default text-light-default capitalize">
                  {word.posts} Posts
                </h2>
              </div>
            );
          })}
        </ScrollShadow>
      </CardBody>
      <CardFooter className="px-0">
        <Button
          fullWidth
          as={RouterLink}
          to={"/trending"}
          color="primary"
          variant="flat"
          radius="none"
        >
          Show More
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TrendingCard;
