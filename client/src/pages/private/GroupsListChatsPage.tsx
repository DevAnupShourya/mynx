import ChatProfilePreview from "~/components/profile/ChatProfilePreview";

function GroupsListChatsPage() {
  const chatInGroupsList = [
    {
      groupId: "8a7sd89a7484aghfhf47s89d7",
      groupImage: "https://avatars.githubusercontent.com/u/30373422",
      groupName: "Developers Forum",
      lastChatDate: "2023-05-15",
      lastChatPreview: "Hey, has anyone worked with GraphQL before?",
    },
    {
      groupId: "8a7sd89a74asdadads8da47s89d7",
      groupImage: "https://avatars.githubusercontent.com/u/30373412",
      groupName: "Project X Team",
      lastChatDate: "2023-05-14",
      lastChatPreview: "We need to finalize the API endpoints today.",
    },
    {
      groupId: "8aadsa7484ad6s8da47s89d7",
      groupImage: "https://avatars.githubusercontent.com/u/30373313",
      groupName: "Tech Enthusiasts",
      lastChatDate: "2023-05-13",
      lastChatPreview: "Any recommendations for a good frontend framework?",
    },
    {
      groupId: "8a7sd89a748asdad47s89d",
      groupImage: "https://avatars.githubusercontent.com/u/30373413",
      groupName: "Code Learners",
      lastChatDate: "2023-05-12",
      lastChatPreview:
        "Just finished my first React project. Excited to share!",
    },
    {
      groupId: "8a7sd89a748asdad47s8asd9d7",
      groupImage: "https://avatars.githubusercontent.com/u/30373513",
      groupName: "Open Source Contributors",
      lastChatDate: "2021-02-12",
      lastChatPreview:
        "Looking for collaborators on a new open-source project. Join us!.",
    },
  ];

  return (
    <section className="w-full h-auto flex flex-col gap-2">
      {chatInGroupsList.map((data) => {
        return (
          <ChatProfilePreview
            key={data.groupId}
            id={data.groupId}
            image={data.groupImage}
            lastChatDate={data.lastChatDate}
            lastChatPreview={data.lastChatPreview}
            name={data.groupName}
            isGroup={true}
          />
        );
      })}
    </section>
  );
}

export default GroupsListChatsPage;
