export type CompanyWithDetails = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  owner: {
    email: string;
    name: string;
    avatar_url: string;
  };
  jobs: {
    id: string;
    title: string;
    description: string;
    location: string;
    company: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      email: string;
    };
    job: Job;
    status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  }[];
};
export type Application = {
  id: string;
  user: {
    id: string;
    email: string;
  };
  company: CompanyWithDetails;
  job: Job;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
};

export type ReviewWithDetails = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  company: CompanyWithDetails;
  content: string;
  createdAt: Date;
};

export type JobWithDetails = {
  id: string;
  title: string;
  description: string;
  location: string;
  company: CompanyWithDetails;
};

export type JJobWithCompanyId = Job & {
  company:{
    id: string;
    name: string;
  }
};

export type Job = {
  id: string | null;
  job_title: string | null;
  job_description?: string | null;
  job_salary?: number | string | null;
  employment_type?: string | null;
  job_publisher?: string | null;
  employer_logo?: string | null;
  employer_name?: string | null;
  jobId?: string | null;
  location?: string | null;
  company: {
    id: string;
    name: string | null;
    image_url: string | null;
  };
};

export type EditJob = {
  id: string;
  job_title: string ;
  job_type: string ;
  job_description: string ;
  job_salary: number | string;
  employment_type: string;
  job_location: string;
  employer_name: string;
  employer_logo: string;
  company?: {
    id?: string;
    name?: string ;
    image_url?: string ;
  };
};
