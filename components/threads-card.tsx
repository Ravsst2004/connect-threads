import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MoreThreadsCardFeatures from "./threads/more-threads-card-features";

interface ThreadsCardProps {
  images?: string[];
  content: string;
  createdAt?: Date;
  userImage: string | null;
  username: string | null;
  threadId?: string;
}

const ThreadsCard = ({
  threadId,
  images,
  content,
  createdAt,
  userImage,
  username,
}: ThreadsCardProps) => {
  const formattedDate = createdAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <section>
      <div className="w-full border-b border-primary dark:border-white pt-2" />
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
              <h1 className="flex items-center gap-4">
                <Link href={`/@${username}`} className="font-semibold">
                  {username}
                </Link>{" "}
                <span className="text-gray-500 ">{formattedDate}</span>
              </h1>
            </div>
            <MoreThreadsCardFeatures threadId={threadId} />
          </div>
          <div id="content" className="py-2">
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
        <div className="flex items-start justify-start mt-2 gap-2">
          <Heart />
          <MessageCircle />
          <Repeat2 />
          <Send />
        </div>
      </article>
    </section>
  );
};

export default ThreadsCard;
