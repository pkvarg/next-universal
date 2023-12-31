'use client';
import React, { useEffect, useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { status, data: sessionData } = useSession();
  const userName = sessionData?.user?.name;
  const userEmail = sessionData?.user?.email;
  // TODO ALLOW UNIQUE EMAIL ONLY
  const uniqueEmail = process.env.NEXT_PUBLIC_UNIQUE_USER_EMAIL;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [editedId, setEditedId] = useState<number>();
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const [allUsers, setAllUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});

  const handleRegister = async (e: any) => {
    e.preventDefault();
    console.log('submitting');
    if (password !== passwordRepeat)
      return toast.error('Opakované heslo musí byť totožné');
    const data = await axios.post('/api/register', {
      email,
      name,
      password,
    });
    if (data?.data.message) toast.error(data?.data.message);
    console.log(data);
  };

  // Register Gmail User if first time

  useEffect(() => {
    if (status === 'authenticated') {
      const registerGmailUser = async () => {
        await axios.post('/api/register', {
          email: userEmail,
          name: userName,
        });
      };
      registerGmailUser();
    }
  }, [status]);

  const getAllUsers = async () => {
    const data = await axios.get('/api/register');
    setAllUsers(data?.data.users);
    setShowAllUsers(true);
  };

  const editUser = async (userId: number) => {
    const data = await axios.get(`api/edit/${userId}`);
    setEditedUser(data.data.user);
    setEditedId(data.data.user.id);
    setEditedName(data.data.user.name);
    setEditedEmail(data.data.user.email);
    setShowAllUsers(false);
    setShowEditUser(true);
  };

  const handleEditUser = async (userId: number) => {
    const data = await axios.patch(`api/edit/${userId}`, {
      name: editedName,
      email: editedEmail,
    });
    if (data.status === 200) {
      setShowEditUser(false);
      getAllUsers();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    console.log(userId);
    try {
      const data = await axios.delete(`api/edit/${userId}`);
      if (data.data.message === 'Success') {
        setShowEditUser(false);
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {status === 'authenticated' ? (
        <div className="p-4">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <button onClick={getAllUsers} className="my-2 bg-green-400">
            Get All Users
          </button>
          {showAllUsers &&
            allUsers !== undefined &&
            allUsers.map(
              (user: {
                id: number;
                email: string | undefined;
                name: string | undefined;
              }) => (
                <div
                  key={user.id}
                  className="flex w-[30%] flex-row justify-between gap-4 bg-gray-400 text-blue-800"
                >
                  <p>{user.email}</p>
                  <p>{user.name}</p>
                  <p>{user.id}</p>
                  <button onClick={() => editUser(user.id)}>Edit</button>
                </div>
              ),
            )}

          {showEditUser && editedUser && editedId && (
            <div className="flex w-[30%] flex-row justify-between gap-4 bg-gray-300 text-blue-800">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />

              <button
                onClick={() => handleEditUser(editedId)}
                className="bg-green-500 px-8"
              >
                Save
              </button>
              <button
                onClick={() => handleDeleteUser(editedId)}
                className="bg-red-500 px-8"
              >
                Delete
              </button>
              <button onClick={() => setShowEditUser(false)}>Cancel</button>
            </div>
          )}
          <div
            className="my-2 h-[70px] w-[30%] bg-red-800 text-[45px] text-white hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </div>
        </div>
      ) : (
        <>
          <div
            className="h-[70px] w-[30%] bg-red-800 text-[45px] text-white hover:cursor-pointer"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </div>

          <form
            onSubmit={handleRegister}
            className="ml-4 mt-4 flex w-[30%] flex-col gap-2 bg-gray-300 p-2"
          >
            <h1>Registrácia</h1>
            <input
              type="text"
              placeholder="meno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="opakovať heslo"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
            />

            <button type="submit" className="w-[100px] bg-green-400">
              OK
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
