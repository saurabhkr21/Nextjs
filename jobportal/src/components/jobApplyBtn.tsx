import React from 'react'
import { Button } from '@radix-ui/themes';
import {SendIcon} from 'lucide-react';

export default function jobApplyBtn({job}:{job: {id: string}}) {
    async function handleApply() {
        // Logic to handle job application
        try{
            const response = await fetch(`/api/job/apply/${job?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if(data.success){
                alert("Application submitted successfully!");
            }else{
                alert(data.data?.message || "Something went wrong, please try again later");
            }
        }catch(err) {
            console.error("Error applying for job:", err);
            alert("Failed to submit application. Please try again.");
        }
    }
  return (
    <div>
      <button 
        onClick={handleApply}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      > 
        <SendIcon size={16} /> Apply Now
      </button>
    </div>
  )
}

