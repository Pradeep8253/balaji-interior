"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import CategoryForm from "../../CategoryForm";
import CategoryDetails from "../../CategoryDetails";

function Page() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/get`
      );
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card className="m-2">
      <CategoryForm fetchCategories={fetchCategories} />
      <CategoryDetails
        categories={categories}
        setCategories={setCategories}
        fetchCategories={fetchCategories}
      />
    </Card>
  );
}

export default Page;
