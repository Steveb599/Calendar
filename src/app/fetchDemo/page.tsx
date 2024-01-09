"use client";
import { useState } from "react";
import DebounceSelect from "./fetchUsers";
import { useForm, Control, FieldError } from "react-hook-form";

interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5");
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
      })
    );
  } catch (error) {
    console.error("Error fetching user list:", error);
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

  const debouncedControl = control as Control;

  return (
    <div className="p-16">
      <DebounceSelect
        mode="multiple"
        {...(debouncedControl as any)}
        name="trainees"
        className="w-full"
        value={value}
        placeholder="תבחר מתאמנים"
        fetchOptions={fetchUserList}
        onChange={(newValue) => {
          setValue(newValue as UserValue[]);
        }}
      />
      {errors.trainees && (errors.trainees as FieldError).message}
    </div>
  );
};

export default SelectTrainees;
