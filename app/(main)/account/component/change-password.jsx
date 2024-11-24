"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  /* handle change function */
  const handleChange = (event) => {
    event.preventDefault();
    const field = event.target.name;
    const value = event.target.value;

    setPasswordState({ ...passwordState, [field]: value });
  };

  /* handle Form Submit */

  const doPasswordChage = async (event) => {
    event.preventDefault();
    console.log(passwordState);
  };
  return (
    <div>
      <h5 className='text-lg font-semibold mb-4'>Change password :</h5>
      <form onSubmit={doPasswordChage}>
        <div className='grid grid-cols-1 gap-5'>
          <div>
            <Label className='mb-2 block'>Old password :</Label>
            <Input
              type='password'
              placeholder='Old password'
              name='oldPassword'
              id='oldPassword'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className='mb-2 block'>New password :</Label>
            <Input
              type='password'
              placeholder='New password'
              name='newPassword'
              id='newPassword'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className='mb-2 block'>Re-type New password :</Label>
            <Input
              type='password'
              placeholder='Re-type New password'
              required
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className='mt-5 cursor-pointer' type='submit'>
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
