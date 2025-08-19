//@ts-nocheck
import { useState } from "react";
import JobApplyBtn from "./jobApplyBtn";

export default function ApplyDeleteBtn({ hasApplied }) {
  const [userHasApplied, setUserHasApplied] = useState(false);
  function handleDeleteBtn(){
    
  }
  return (
    <div>
      {!userHasApplied && (
        <JobApplyBtn job={job} setUserHasApplied={setUserHasApplied} />
      )}
      {userHasApplied && <button onClick={handleDeleteBtn}>Delete Application</button>}
    </div>
  );
}
 