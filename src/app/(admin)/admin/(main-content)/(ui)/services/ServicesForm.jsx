"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { generateSlug } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ServiceForm = ({ id }) => {
  const [service, setService] = useState(null);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/get/${id}`
        );

        setService(res?.data);
        setExistingImages(res?.data?.image || []);
      } catch (err) {
        toast.error("Failed to load service details");
      }
    };
    fetchService();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/get`
        );
        setCategories(res?.data?.data || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"), // ✅ string only
    about: Yup.string(),
    features: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Feature title is required"),
        detail: Yup.string().required("Feature detail is required"),
      })
    ),
  });

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("slug", generateSlug(values.title));
      formData.append("category", values.category); // ✅ always string (id)
      formData.append("about", values.about);
      formData.append("features", JSON.stringify(values.features));

      images.forEach((file) => {
        formData.append("image", file);
      });

      formData.append("existingImages", JSON.stringify(existingImages));

      if (id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/edit/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service updated successfully!");
        router.push("/admin/services/all-services");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/post`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service created successfully!");
        router.push("/admin/services/all-services");
      }

      resetForm();
      setImages([]);
      setExistingImages([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving service");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Service" : "Create Service"}
      </h2>

      <Formik
        initialValues={{
          title: service?.title || "",
          description: service?.description || "",
          category: service?.category?._id || "", // ✅ fix applied here
          about: service?.about || "",
          features: service?.features || [{ title: "", detail: "" }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-5">
            {/* Title */}
            <div>
              <label className="block font-medium">Title</label>
              <Field
                name="title"
                className="w-full border p-2 rounded-md"
                placeholder="Service title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Slug */}
            {values.title && (
              <div>
                <label className="block font-medium">
                  Slug (auto-generated)
                </label>
                <input
                  type="text"
                  value={generateSlug(values.title)}
                  readOnly
                  className="w-full border p-2 rounded-md bg-gray-100 text-gray-600"
                />
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block font-medium">Category</label>
              <Field
                as="select"
                name="category"
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border p-2 rounded-md"
                placeholder="Service description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* About */}
            <div>
              <label className="block font-medium">About</label>
              <Field
                as="textarea"
                name="about"
                className="w-full border p-2 rounded-md"
                placeholder="More details..."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block font-medium">Features</label>
              <FieldArray name="features">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-start border p-3 rounded-md"
                      >
                        <div className="flex-1">
                          <Field
                            name={`features[${index}].title`}
                            placeholder="Feature title"
                            className="w-full border p-2 rounded-md mb-1"
                          />
                          <ErrorMessage
                            name={`features[${index}].title`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex-1">
                          <Field
                            as="textarea"
                            name={`features[${index}].detail`}
                            placeholder="Feature detail"
                            className="w-full border p-2 rounded-md mb-1"
                          />
                          <ErrorMessage
                            name={`features[${index}].detail`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push({ title: "", detail: "" })}
                      className="bg-green-500 text-white px-4 py-1 rounded-md"
                    >
                      + Add Feature
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Existing Images</h3>
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border rounded-md overflow-hidden"
                    >
                      <img
                        src={img.url}
                        alt={img.fileName}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div>
              <label className="block font-medium">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 border rounded-md cursor-pointer"
              />
              {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-3">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border rounded-md overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              {isSubmitting
                ? "Saving..."
                : service
                ? "Update Service"
                : "Create Service"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceForm;
