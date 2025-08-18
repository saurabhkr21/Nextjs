"use client";
import { UserContext } from "@/app/layout";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { blog } from "../../generated/prisma";

const DELETE_BLOG = gql`
  mutation Mutation($deleteBlogId: String!) {
    deleteBlog(id: $deleteBlogId)
  }
`;

export default function BlogCard({ item }: { item: blog }) {
  const { id, title, content, image_url, createdAt } = item;
  const formatDate = (dateInput: string | Date) => {
    const date = new Date(Number(dateInput));
    if (isNaN(date.getTime()))
      return { short: "Invalid Date", full: "", time: "" };
    return {
      short: date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      full: date.toLocaleString(),
      time: date.toLocaleTimeString(),
    };
  };

  const dateInfo = formatDate(createdAt);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      try {
        const data: any = await gqlClient.request(DELETE_BLOG, {
          deleteBlogId: id,
        });
        if (data.deleteBlog) {
          alert("Blog deleted successfully.");
        } else {
          alert("Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  }
  //@ts-ignore
  const { user } = useContext(UserContext);

  const getReadingTime = (text: string) => {
    if (!text || typeof text !== "string") return 1;
    const wordsPerMinute = 100;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return minutes;
  };

  return (
    <article
      className={`
        group max-w-lg mx-auto  rounded-2xl overflow-hidden border transition-all duration-500 ease-out
        hover:scale-[1.02] hover:-translate-y-1 cursor-pointer
      `}
      // onClick={() => onReadMore && onReadMore(item)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url ? image_url : "/placeholder.jpg"}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 `}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Read More Button */}
        <Link
          href={`/blog/${id}`}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <div className="bg-white/90 hover:bg-blue-400 hover:text-red-700 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
            Read More
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </Link>

        {/* Reading Time Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`
            px-2.5 py-1 hover:bg-slate-700 rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1
          `}
          >
            <Clock size={12} />
            {getReadingTime(content)} min read
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h2
          className={`
          text-xl font-bold mb-3 leading-tight line-clamp-1 transition-colors duration-200
          
        `}
        >
          {title}
        </h2>

        {/* Content Preview */}
        <p
          className={`
          text-sm mb-4 leading-relaxed line-clamp-3
          
        `}
        >
          {content.length > 120 ? content.slice(0, 120) + "..." : content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div
            className={`
            text-xs flex items-center gap-1.5 font-medium
          `}
          >
            <Calendar size={14} />
            <time dateTime={String(createdAt)} title={dateInfo.full}>
              {dateInfo.short}
            </time>
          </div>
          {/* Action Indicator */}
          <Link href={`/blog/${id}`} className="text-blue-500 hover:underline">
            <div
              className={`
            opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0
          `}
            >
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>{" "}
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className={`
        h-1 w-0 group-hover:w-full transition-all duration-500 ease-out
       
      `}
      ></div>
    </article>
  );
}
