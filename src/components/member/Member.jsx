"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDown, ArrowUp, User } from "lucide-react";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortData, setSortData] = useState("");
  const itemsPerPage = 25;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/user/get`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortData?.key,
            sortDirection: sortData?.direction,
            search: search || searchTerm,
            orignalPage: true,
          },
        }
      );
      setUsers(response?.data.users);
      setTotalPages(response?.data.totalPages);
      setTotal(response?.data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (search) {
      setSearchTerm(search);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.replace(`${pathname}?${params.toString()}`);
    }
    fetchUsers();
  }, [currentPage, sortData, searchTerm]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortData?.key === key && sortData?.direction === "asc") {
      direction = "desc";
    }
    setSortData({ key, direction });
  };

  const shortByIcon = (column) => {
    if (sortData?.key !== column) return null;
    return sortData?.direction === "asc" ? <ArrowUp /> : <ArrowDown />;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/user/deleteUser/${id}`
        );
        toast.success("Member deleted successfully!");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete Member.");
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/member/edit/${id}`);
  };

  return (
    <div className="flex flex-col space-y-4 ">
      <div className="w-60">
        <Input
          className="mb-3"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center">
                <User />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  User {shortByIcon("name")}
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("userType")}
              >
                <div className="flex items-center">
                  Status {shortByIcon("userType")}
                </div>
              </TableHead>
              <TableHead
                className="text-center cursor-pointer"
                onClick={() => requestSort("dou")}
              >
                <div className="flex items-center justify-center">
                  Activity {shortByIcon("dou")}
                </div>
              </TableHead>
              <TableHead
                className="text-center cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                <div className="flex items-center justify-center">
                  Signup Date {shortByIcon("createdAt")}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Avatar className="h-10 w-10 mx-auto">
                    <AvatarImage src={user?.profileImg?.url} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    {user?.name + " ("}
                    {user?.pressreleaseCounts &&
                      Object.values(user?.pressreleaseCounts).reduce(
                        (acc, val) => acc + val,
                        0
                      ) + ") "}
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>{user?.userName}</div>
                    <div>{user?.email}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-between whitespace-nowrap">
                    <div>{user?.userType}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    Last login
                  </div>
                  <div className="whitespace-nowrap">
                    {moment(user?.updatedAt).format("DD MMM YYYY  h:mm a")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="whitespace-nowrap">
                    {moment(user?.createdAt).format("DD MMM YYYY h:mm a ")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <FaRegEdit
                      className="mr-3 cursor-pointer"
                      onClick={() => handleEdit(user?._id)}
                    />
                    <MdOutlineDeleteForever
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(user?._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-3 px-2 sm:px-4">
        <div className="text-sm mb-3 sm:mb-0">
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, total)} of {total} Members
        </div>
        <div className="cursor-pointer">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Members;
