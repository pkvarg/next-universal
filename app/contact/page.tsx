'use client';
import React, { useState } from 'react';
//import CalcNavbar from '../components/calculator/CalcNavbar'
import axios from 'axios';
import { toast } from 'react-hot-toast';
//import { Footer } from '../components'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const x = process.env.NEXT_PUBLIC_EXTRA_ONE;
  const y = process.env.NEXT_PUBLIC_EXTRA_TWO;
  const [passwordGroupOne, setPasswordGroupOne] = useState(x);
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y);

  //console.log(name, email, phone, message);

  const HOST = process.env.NEXT_PUBLIC_HOST;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('subbbbb');
    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      toast.error('Nastala chyba.');
    }
    try {
      console.log('..email is sending..');
      const { data } = await axios.post(
        // `https://api.pictusweb.com/api/md/contact`,
        '/api/email',
        {
          name,
          email,
          phone,
          message,
          url: '',
          messageType: 'contact-message',
        },
      );

      console.log(data);

      if (data.message === 'Success') toast.success('Správa úspešne odoslaná');
      // setName('');
      // setEmail('');
      // setPhone('');
      // setMessage('');
    } catch (error: any) {
      if (error) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  };
  return (
    <>
      {/* <CalcNavbar /> */}
      <h1 className="mt-12 text-center text-[30px] font-bold text-[#0376b7]">
        Kontaktujte ma
      </h1>
      <div className="mx-4 mt-12 bg-white text-gray-900 lg:mx-[25%]">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col justify-start">
            <label className="py-2 font-bold">
              Meno
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[50px] border border-gray-300 pl-[5px]"
              required
            />
          </div>
          <div className="flex flex-col justify-start">
            <label className="py-2 font-bold">
              Email
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[50px] border border-gray-300 pl-[5px]"
              required
            />
          </div>
          <div className="flex flex-col justify-start">
            <label className="py-2 font-bold">
              Telefón
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[50px] border border-gray-300 pl-[5px]"
              required
            />
          </div>
          <div className="flex flex-col justify-start">
            <label className="py-2 font-bold">
              Vaša správa
              <span className="ml-1 text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-[150px] border border-gray-300 pl-[5px]"
              rows={10}
            ></textarea>
          </div>
          <div className="mt-4 flex flex-row items-center gap-4 lg:gap-2">
            <input type="checkbox" required />
            <p>Pred odoslaním musíte súhlasiť so spracovaním osobných údajov</p>
          </div>

          <input
            className="form-control"
            type="text"
            defaultValue={passwordGroupOne}
            onChange={(e) => setPasswordGroupOne(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            defaultValue={passwordGroupTwo}
            onChange={(e) => setPasswordGroupTwo(e.target.value)}
          />

          <button
            type="submit"
            className="mt-8 w-[100%] bg-[#0376b7] py-3 text-white hover:border hover:border-[#0376b7] hover:bg-white hover:text-[#0376b7] lg:mt-4 lg:w-[20%]"
          >
            Odoslať
          </button>
        </form>
      </div>
      <div className="relative mt-4 h-[50px]">{/* <Footer /> */}</div>
    </>
  );
};

export default Contact;
