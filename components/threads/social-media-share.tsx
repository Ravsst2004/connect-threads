"use client";

import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiDiscord } from "react-icons/si";

type SocialMediaSite =
  | "facebook"
  | "whatsapp"
  | "twitter"
  | "linkedin"
  | "email"
  | "discord";

interface SocialShareMediaProps {
  url: string;
  title: string;
  image?: string;
  desc?: string;
  hashtags?: string;
  provider?: string;
  emailaddress?: string;
  cemailaddress?: string;
  bccemailaddress?: string;
}

const SocialShareMedia: React.FC<SocialShareMediaProps> = ({ url, title }) => {
  const renderSocialIcon = (site: SocialMediaSite) => {
    switch (site) {
      case "facebook":
        return <FaFacebook className="text-blue-600 hover:text-blue-800" />;
      case "whatsapp":
        return <FaWhatsapp className="text-green-500 hover:text-green-700" />;
      case "twitter":
        return <FaTwitter className="text-blue-400 hover:text-blue-600" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-700 hover:text-blue-900" />;
      case "email":
        return <SiGmail className="text-red-500 hover:text-red-700" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <FacebookShareButton url={url}>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors">
            {renderSocialIcon("facebook")}
          </div>
        </FacebookShareButton>
        <WhatsappShareButton url={url} title={title}>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors">
            {renderSocialIcon("whatsapp")}
          </div>
        </WhatsappShareButton>
        <TwitterShareButton url={url} title={title}>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors">
            {renderSocialIcon("twitter")}
          </div>
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors">
            {renderSocialIcon("linkedin")}
          </div>
        </LinkedinShareButton>
        <EmailShareButton url={url} subject={title} body={url}>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors">
            {renderSocialIcon("email")}
          </div>
        </EmailShareButton>
      </div>
    </>
  );
};

export default SocialShareMedia;
