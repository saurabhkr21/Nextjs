"use client";
import { ReviewWithDetails } from "@/lib/type";
import { Tabs, TextArea } from "@radix-ui/themes";
import { SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "../../../generated/prisma";

export default function Reviews({
  company,
  reviews,
}: {
  company: company;
  reviews: ReviewWithDetails[];
}) {
  const [content, setContent] = useState("");
  const [reviewsList, setReviewsList] = useState<ReviewWithDetails[]>(
    reviews || []
  );
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/review/${company.id}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setReviewsList(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }
    fetchReviews();
  }, [company.id]);

  async function handleReview() {
    if (!content.trim()) return;
    setIsPosting(true);
    const review = {
      content: content,
      company_id: company.id,
    };
    try {
      const res = await fetch(`http://localhost:3000/api/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const data = await res.json();
      const newReview = data.data;
      if (newReview) {
        const resAll = { ...newReview };
        setReviewsList((prev) => [...prev, resAll]);
        setContent("");
      }
    } catch (err) {
      console.error("Failed to post review:", err);
    } finally {
      setIsPosting(false);
    }
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
        disabled={isPosting || !content.trim()}
        className="flex items-center gap-2 px-2 p-1 bg-btn-primary hover:bg-btn-hover w-fit rounded-md cursor-pointer disabled:opacity-50"
      >
        {isPosting ? (
          "Posting..."
        ) : (
          <>
            Send <SendIcon className="h-4 w-4" />
          </>
        )}
      </button>
      <h2>Top Reviews</h2>
      <div className="flex flex-col gap-2 m-3">
        {(Array.isArray(reviewsList) ? reviewsList : []).map((review, idx) => (
          <div key={review.id || idx} className="shadow-md pb-2">
            <p className="font-semibold text-slate-500 ">{review.user?.name}</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </Tabs.Content>
  );
}
