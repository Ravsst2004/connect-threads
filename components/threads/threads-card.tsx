import { IoIosHeartEmpty, IoIosRepeat } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import MoreThreadsCardFeatures from "./more-threads-card-features";
import HorizontalLine from "../ui/horizontal-line";
import { formatDistanceToNow } from "date-fns";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";

interface ThreadsCardProps {
  images?: string[];
  content: string;
  createdAt?: Date;
  userImage: string | null;
  username: string | null;
  threadId: string;
  userId?: string;
  senderEmail?: string | null;
  userCommentId?: string | null | undefined;
}

const ThreadsCard = ({
  threadId,
  userId,
  images,
  content,
  createdAt,
  userImage,
  username,
  senderEmail,
  userCommentId,
}: ThreadsCardProps) => {
  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";

  return (
    <section>
      <HorizontalLine />
      <article className="py-4">
        <div>
          <div className="flex justify-between items-center">
            <div id="user-info" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={userImage || "/images/user-profile.png"}
                  alt="profile"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <h1 className="flex items-center gap-2">
                <Link href={`/@${username}`} className="font-semibold">
                  {username}
                </Link>{" "}
                <span className="text-gray-500 text-xs">{formattedDate}</span>
              </h1>
            </div>
            <MoreThreadsCardFeatures threadId={threadId} />
          </div>
          <Link
            href={`/@${username}/post/${threadId}`}
            id="content"
            className="py-2"
          >
            <p className="pt-2">{content}</p>
            {images && images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`image-${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </Link>
        </div>
        <div className="flex items-start justify-start mt-2 gap-x-3">
          {senderEmail ? (
            <LikeButton
              threadId={threadId as string}
              userId={userId as string}
              senderEmail={senderEmail as string}
            />
          ) : (
            <Link href="/login">
              <button>
                <IoIosHeartEmpty className="h-7 w-7" />
              </button>
            </Link>
          )}
          <CommentButton
            userId={userCommentId as string}
            threadId={threadId as string}
          />
          <IoIosRepeat className="h-7 w-7" />
          <IoIosSend className="h-7 w-7" />
        </div>
      </article>
    </section>
  );
};

export default ThreadsCard;
