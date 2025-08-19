'use server'
type Users = {
    name: string;
    email: string;
    password: string;
};
const Users = [
    { name: 'Saurabh Kumar', email: 'saurabh7221@gmail.com', password: '12345' },
    { name: 'Aishwarya Verma', email: 'aishwaryaverma284@gmail.com', password: 'aish123' }
];

export async function handleSubmitServer(obj: Users) {
    const user = Users.find(
        u => u.email === obj.email && u.password === obj.password
    );
    return user || null;
}