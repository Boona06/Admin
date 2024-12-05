import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const UserCreateDialog = ({ open, onClose }) => {
  const [firstName, setFirstName] =useState('');
  const [lastName, setLastName] =useState('');
  const [email, setEmail] =useState('');
  const saveButton =async () => {
     await fetch("api/users" , {method: "POST" , body:JSON.stringify({firstname:firstName,lastname:lastName, email:email,imageUrl:" http://dummyimage.com/206x199.png/dddddd/000000"})})
  }
 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input value={firstName} id="name" placeholder="Нэрээ оруулаарай" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input value={lastName} id="username" placeholder="Хэрэглэгчийн нэр" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input  value={email}id="username" placeholder="Цахим хаягаа оруулаарай" onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onClose(false)} variant="outline" type="button">
            Cancel
          </Button>
          <Button onClick={ saveButton} type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
