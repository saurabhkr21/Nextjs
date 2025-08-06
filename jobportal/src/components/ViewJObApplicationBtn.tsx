import { Button, Dialog, Flex, Spinner, Text, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

export default function ViewJobApplicationBtn({ job }) {
    
  const [applicants, setApplicants] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    async function getApplications(){
        setLoading(true);
        const res = await fetch("/api/applicants/"+job.id);
        const data= await res.json();
        if(data?.success){
            setApplicants(data?.data)
        }
        setLoading(false)
    }
    getApplications();

  },[])
  
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Job</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>View Job</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        {
            loading && <p><Spinner /></p>
        }

        <div>
            {
                applicants.map((application)=>{
                    return(
                        <p>{application.user.name}</p>
                    )
                })
            }
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
