import jwt from "jsonwebtoken";

type Data = {
  id: string;
};

export const createToken = (data: Data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token;
};


export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data as Data;
  } catch (err) {
    return null;
  }
};
