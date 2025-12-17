"use client";

import { useState, useEffect } from "react";

export function useFileStorage<T>(type: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data/${type}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const saveData = async (newData: T) => {
    try {
      const response = await fetch(`/api/data/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setData(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      return false;
    }
  };

  return [data, saveData, loading] as const;
}
