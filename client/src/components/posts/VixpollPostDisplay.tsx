import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

import useGetCookie from "~/utils/hooks/useGetCookie";

import Toast from "~/components/custom_toast/Toast";
import { updateVixpollPostById } from "~/services/Posts/Posts.services";

// * Title & Poll Options Array with {pollName:string, pollSupporters:string[]}
function VixetPostDisplay({
  title,
  id,
  pollOptions,
}: {
  title: string;
  id: string;
  pollOptions: { pollName: string; pollSupporters: string[] }[];
}) {
  const token = useGetCookie();

  // ? For Updating Poll Values
  const [pollOptionsState, setPollOptionsState] = useState<
    { pollName: string; pollSupporters: string[] }[]
  >(pollOptions || []);

  // ? For Toggling between full and short
  const [showFullTitle, setShowFullTitle] = useState(false);
  const truncatedTitle = showFullTitle ? title : `${title.slice(0, 255)}`;

  // ? Total Number for poll participants
  const [totalCounts, setTotalCounts] = useState(0);

  const handleUpdatePost = async (ithToPlus: number) => {
    try {
      const response = await updateVixpollPostById(ithToPlus, id, token!);
      Toast.success(response?.data.responseData.message);
      // ? Mutating the new poll version
      setPollOptionsState(response?.data.responseData.pollOptions);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.warning(error.response.data.message);
      console.error("Error Updating Vixpoll Post: ", error.response.data.message);
    }
  };

  useEffect(() => {
    if (pollOptionsState) {
      // ? Getting Total Number for poll participants after rendering
      const total = pollOptionsState.reduce(
        (sum, poll) => sum + poll.pollSupporters.length,
        0
      );
      setTotalCounts(total);
    }
  }, [pollOptionsState]);

  return (
    <div>
      <h1 className="text-lg font-bold">
        {truncatedTitle}
        {title.length > 255 && (
          <Button
            size="sm"
            variant="faded"
            onClick={() => {
              setShowFullTitle(!showFullTitle);
            }}
          >
            {showFullTitle ? "Show Less" : "View More"}
          </Button>
        )}
      </h1>
      <div className="flex flex-col gap-2">
        {pollOptionsState?.map((poll, index) => {
          const percentage =
            totalCounts !== 0
              ? (poll.pollSupporters.length / totalCounts) * 100
              : 0;

          return (
            <Button
              variant="faded"
              color="success"
              key={`poll-${index}`}
              startContent={<h2>{poll.pollName}</h2>}
              endContent={<h3>{percentage.toFixed(2)}%</h3>}
              className="justify-between"
              onClick={() => {
                handleUpdatePost(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default VixetPostDisplay;
