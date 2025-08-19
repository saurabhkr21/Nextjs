export  type BlogParams = {
  id: string;
};

export type BlogType={
    id: string;
    title: string;
    content: string;
    image_url: string;
    createdAt: string;
    User: {
        id: string;
        name: string;
        email: string;
    };
}
