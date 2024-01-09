"use client";
import React, { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import { useDebouncedCallback } from "use-debounce";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const loadOptions = useMemo(() => {
    return async (value: string) => {
      try {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setLoading(true);
        const newOptions = await fetchOptions(value);

        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setLoading(false);
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };
  }, [fetchOptions]);

  const debouncedSelectSearch = useDebouncedCallback(
    loadOptions,
    debounceTimeout
  );

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={(value) => debouncedSelectSearch(value)}
      notFoundContent={loading ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;