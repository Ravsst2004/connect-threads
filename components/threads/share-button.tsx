import React from "react";
import { IoIosSend } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SocialShareMedia from "./social-media-share";

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton = ({ url, title }: ShareButtonProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <IoIosSend className="h-7 w-7" />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <SocialShareMedia url={url} title={title} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShareButton;
