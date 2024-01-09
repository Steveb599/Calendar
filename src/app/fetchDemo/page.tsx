'use client';
import { useState } from 'react';
import DebounceSelect from './fetchUsers';
import { useForm, Controller, FieldError } from 'react-hook-form';

interface UserValue {
  label: string;
  value: string;
}

interface selectRHFProps {
  control: any;
  name: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    return body.results.map(
      (user: {
        name: { first: string; last: string };
        login: { username: string };
      }) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }),
    );
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  }
}

const SelectTrainees = () => {
  const [value, setValue] = useState<UserValue[]>([]);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm();

  const RHFDebouncedSelect = (props: selectRHFProps) => {
    return (
      <>
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <>
              <DebounceSelect
                mode="multiple"
                className="w-full"
                value={value}
                placeholder="תבחר מתאמנים"
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  setValue(newValue as UserValue[]);
                }}
              />
              {errors.trainees && (
                <div>{(errors.trainees as FieldError).message}</div>
              )}
            </>
          )}
        />
      </>
    );
  };

  return (
    <div className="p-16">
      <RHFDebouncedSelect control={control} name="trainees" />
    </div>
  );
};

export default SelectTrainees;
