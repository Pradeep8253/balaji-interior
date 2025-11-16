"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/utils";

const CategoryForm = ({ fetchCategories }) => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [categoryData, setCategoryData] = useState();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: categoryData?.name || "",
      slug: categoryData?.slug || "",
      description: categoryData?.description || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (isEditing) {
          await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/edit/${id}`,
            values
          );
          toast.success("Category updated successfully!");
        } else {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/post`,
            values
          );
          toast.success("Category created successfully!");
          formik.resetForm();
        }

        fetchCategories();
      } catch (error) {
        toast.error("Failed to post/update category.");
      }
    },
  });

  useEffect(() => {
    if (formik.values.name && !isEditing) {
      formik.setFieldValue("slug", generateSlug(formik.values.name));
    }
  }, [formik.values.name, isEditing]);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchCategory = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/get/${id}`
          );
          setCategoryData(data?.data);
        } catch (error) {
          toast.error("Failed to fetch category.");
        }
      };
      fetchCategory();
    } else {
      setIsEditing(false);
      formik.resetForm();
    }
  }, [id]);

  const renderField = (label, name, type = "text", disabled = false) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={disabled}
        className={`${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
          formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
        }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );

  const renderTextarea = (label, name, rows = 4) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
          formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
        }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="px-4">
        <CardHeader className="mb-3">
          <h1 className="text-2xl font-semibold">
            {isEditing ? "Edit Category" : "Add Category"}
          </h1>
        </CardHeader>

        <form onSubmit={formik.handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Name", "name")}
            {renderField("Slug", "slug", "text", true)}
          </div>
          <div>{renderTextarea("Description", "description", 3)}</div>

          <div className="flex justify-end space-x-2">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="cursor-pointer text-white"
            >
              {isEditing ? "Update Category" : "Add Category"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/service-categories")}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="border-t border-gray-200 my-1 px-4" />
      </div>
    </div>
  );
};

export default CategoryForm;
