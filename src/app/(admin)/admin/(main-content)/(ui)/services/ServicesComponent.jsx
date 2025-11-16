"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";

function ServicesComponent() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getall`
      );
      setServices(res?.data || []);
    } catch (error) {
      console.log("Error fetching services", error);
      toast.error("Failed to fetch services.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (confirmDelete) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/delete/${id}`
        );
        toast.success("Service deleted successfully!");
        fetchServices();
      } catch (error) {
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/services/edit/${id}`);
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="w-64 px-4">
          <Input
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Title </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices?.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service?._id}>
                    <TableCell className="space-y-1">
                      <div className="font-semibold">{service?.title}</div>
                      <div className="text-sm text-gray-600">
                        Category: {service?.category?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Created:{" "}
                        {service?.createdAt
                          ? moment(service.createdAt).format(
                              "DD/MM/YYYY HH:mm A"
                            )
                          : "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Updated:{" "}
                        {service?.updatedAt
                          ? moment(service.updatedAt).format(
                              "DD/MM/YYYY HH:mm A"
                            )
                          : "N/A"}
                      </div>
                    </TableCell>

                    <TableCell className="max-w-[300px] break-words whitespace-normal">
                      {service?.description}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {service?.image?.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt={img.fileName}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(service?._id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(service?._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No services found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </div>
  );
}

export default ServicesComponent;
