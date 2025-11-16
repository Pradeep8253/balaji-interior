"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function RecentOrders() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/press-release/payment/get`,
        {
          params: {
            limit: 5,
          },
        }
      );

      setPayments(response?.data?.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSeeAll = () => {
    router.push("/admin/orders");
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="flex flex-col  p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div className="flex justify-end gap-2" onClick={handleSeeAll}>
          <Button className="buttonClassPrimary">See all</Button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Interior Design</TableHead>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs">Price</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {payments?.map((payment) => (
              <TableRow key={payment?._id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={
                          payment?.pressReleaseId?.featuredImg?.url ||
                          "/images/no-pic.jpg"
                        }
                        className="h-12 w-12 object-cover"
                        alt="Press Image"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm max-w-xs whitespace-normal break-words flex">
                        <Link
                          href={`/admin/press-release/edit/${payment?.pressReleaseId?.slug}`}
                          className="no-underline text-gray-900 "
                        >
                          <div className="font-medium text-sm">
                            {payment?.pressReleaseId?.heading}
                          </div>
                        </Link>
                        <Link
                          href={`${
                            process.env.NEXT_PUBLIC_MAIN_ORIGIN
                          }/${payment?.pressReleaseId?.category?.slug
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${payment?.pressReleaseId?.slug}`}
                          target="_blank"
                          className="inline-block ml-3 mb-1 items-end"
                        >
                          <FaExternalLinkAlt size={12} />
                        </Link>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        <strong> OrderId :</strong> {payment?.orderId}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        <strong> PaymentId :</strong> {payment?.paymentId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Date :{" "}
                        {moment(payment?.createdAt).format(
                          "DD MMM YYYY h:mm a"
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {payment?.pressReleaseId?.category?.name}
                </TableCell>
                <TableCell className="text-sm">{payment?.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment?.status === "success"
                        ? "success"
                        : payment?.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                    className={
                      payment?.status === "success"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer"
                        : payment?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {payment?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
