"use client";

import * as React from "react";

import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, MoreHorizontal, Settings, Slice } from "lucide-react";
import { UserEditDialog } from "./user-edit-dialog";
import { useState } from "react";
import { Link } from "next";

export function UsersTable(props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { data, limit } = props;
  const [search , setSearch]= useState("");
  const dataFilter= data?.filter((el) =>el.firstname.includes(search) )


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input onChange={(e) => {setSearch(e.target.value)}} placeholder="Нэрээр хайх..." className="max-w-sm"  />
        
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Зураг</TableHead>
              <TableHead className="w-1">Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFilter?.slice(0, limit).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableHead>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableHead>
                <TableHead>{item.lastname}</TableHead>
                <TableHead>{item.firstname}</TableHead>
                <TableHead>{item.email}</TableHead>
                <TableHead className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.email)}>Copy Email</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setCreateModalOpen(true);
                        setSelectedItem(item)
                      }} >Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={async() => {
                        await fetch(`api/users/${item.id}`,{method: "DELETE"})
                      }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
            <UserEditDialog item={selectedItem} open={createModalOpen} onClose={setCreateModalOpen} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
