import { User } from "@prisma/client";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Image from "next/image";

interface ThreadsCardProps {
  images?: string[];
  content: string;
  user: User;
  createdAt?: Date;
}

const ThreadsCard = ({
  images,
  content,
  user,
  createdAt,
}: ThreadsCardProps) => {
  const formattedDate = createdAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section>
      <div className="w-full border-b border-white pt-2" />
      <article className="py-2">
        <div>
          <div id="user-info" className="flex items-center gap-2">
            <Image
              src={"/images/user-profile.png"}
              alt="profile"
              width={30}
              height={30}
            />
            <h1 className="flex items-center gap-4">
              <span className="font-semibold">{user.username}</span>{" "}
              <span className="text-gray-500 ">{formattedDate}</span>
            </h1>
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
