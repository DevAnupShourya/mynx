import { PostCard , PageTitle } from "~/components/components.barrel";

const postData = [
  {
    author: "Joe Rogan",
    username: "Joe_Rogan",
    time: "1 hour",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    comments: "114",
    views: "114K",
    postURL: "/Joe_Rogan/a8978dsa8s7add32s15",
    text: "Just had a great conversation with an amazing guest on the podcast!",
    images: ["", ""],
  },
  {
    author: "Elon Musk",
    username: "Elon_Musk",
    time: "2 hours",
    avatarUrl: "https://i.pravatar.cc/150?u=b5e4db0a0c3445a98bd",
    comments: "205",
    views: "205K",
    postURL: "/Elon_Musk/c53b7s9a8d4e321sa21",
    text: "Working on some exciting projects. Stay tuned!",
    images: ["", ""],
  },
  {
    author: "Bill Gates",
    username: "Bill_Gates",
    time: "3 hours",
    avatarUrl: "https://i.pravatar.cc/150?u=de3cb54b7a9a0a6310c",
    comments: "89",
    views: "89K",
    postURL: "/Bill_Gates/98sa7d4f5a321sa33",
    text: "Reflecting on the latest advancements in technology and their impact on society.",
    images: ["", "", "", "", "", ""],
  },
  {
    author: "Mark Zuckerberg",
    username: "Mark_Zuckerberg",
    time: "4 hours",
    avatarUrl: "https://i.pravatar.cc/150?u=9a8sd79e432s1f3e2a",
    comments: "150",
    views: "150K",
    postURL: "/Mark_Zuckerberg/2a89s7d8a7s4d32",
    text: "Excited about the future of social media and its role in connecting people around the world.",
    images: ["", "", "", "", ""],
  },
  {
    author: "Satya Nadella",
    username: "Satya_Nadella",
    time: "5 hours",
    avatarUrl: "https://i.pravatar.cc/150?u=1s3d2f1e6a8s7d9a8",
    comments: "120",
    views: "120K",
    postURL: "/Satya_Nadella/123s4d5f6a7s8d9",
    text: "Empowering every person and every organization on the planet to achieve more.",
    images: [""],
  },
];

export default function FeedPage() {
  return (
    <>
      <PageTitle title="Feed"/>
      <section className="w-full h-full flex flex-wrap gap-5">
        {postData.map((post) => {
          return <PostCard {...post} />;
        })}
      </section>
    </>
  );
}
