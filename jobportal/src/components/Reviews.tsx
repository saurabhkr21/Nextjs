//@ts-nocheck
"use client";
import { Tabs, TextArea } from "@radix-ui/themes";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { Company, Review } from "../../../generated/prisma";

export default function Reviews({
  company,
  reviews,
}: {
  company: Company;
  reviews: Review;
}) {
  const [content, setContent] = useState("");
  const [reviewsList, setReviewsList] = useState(reviews);

  async function handleReview() {
    const review = {
      content: content,
      company_id: company.id,
    };
    const res = await fetch("http://localhost:3000/api/review", {
      method: "POST",
      body: JSON.stringify(review),
    });
    const data = await res.json();
    const newReview = data.data;
    setReviewsList((prev) => [newReview, ...prev]);
  }

  return (
    <Tabs.Content value="reviews" className="flex flex-col gap-4 ">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        size={"3"}
        placeholder="Post a review…"
      />
      <button
        onClick={handleReview}
        className="flex items-center gap-2 px-2 p-1 bg-btn-primary hover:bg-btn-hover w-fit rounded-md cursor-pointer"
      >
        Send <SendIcon className="h-4 w-4" />
      </button>
      <h2>Top Reviews</h2>
      <div className="flex flex-col gap-2">
        {reviewsList?.map((review) => (
          <div key={review.content} >{review.content}</div>
        ))}
      </div>
    </Tabs.Content>
  );
}