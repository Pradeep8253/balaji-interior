"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PortfolioForm = ({ id }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/get/${id}`
        );

        setPortfolio(res?.data?.data);
        setExistingImages(res?.data?.data?.image || []);
      } catch (err) {
        toast.error("Failed to load portfolio details");
      }
    };
    fetchPortfolio();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      images.forEach((file) => {
        formData.append("image", file);
      });

      formData.append("existingImages", JSON.stringify(existingImages));

      if (id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/edit/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Portfolio updated successfully!");
        router.push("/admin/portfolio/all-portfolio");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/post`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Portfolio created successfully!");
        router.push("/admin/portfolio/all-portfolio");
      }

      resetForm();
      setImages([]);
      setExistingImages([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving portfolio");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Portfolio" : "Create Portfolio"}
      </h2>

      <Formik
        initialValues={{
          title: portfolio?.title || "",
          description: portfolio?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label className="block font-medium">Title</label>
              <Field
                name="title"
                className="w-full border p-2 rounded-md"
                placeholder="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border p-2 rounded-md"
                placeholder="description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

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
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 "
              >
                {isSubmitting
                  ? "Saving..."
                  : portfolio
                  ? "Update Portfolio"
                  : "Create Portfolio"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioForm;
