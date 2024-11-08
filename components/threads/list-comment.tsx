import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import HorizontalLine from "../ui/horizontal-line";
import MoreThreadsCardFeatures from "./more-threads-card-features";

interface ListCommentProps {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  threadId: string;
  userId: string;
  username?: string;
  userImage: string | null;
}

const ListComment = ({
  content,
  createdAt,
  images,
  username,
  userImage,
  threadId,
}: ListCommentProps) => {
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
          <div id="content" className="pt-2">
            <p>{content}</p>
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
          </div>
        </div>
      </article>
    </section>
  );
};

export default ListComment;
