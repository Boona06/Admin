import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";

export const UserEditDialog = ({ open, onClose, item }) => {
  const [firstname, setFirstName] =useState('');
  const [lastname, setLastName] =useState('');
  const [email, setEmail] =useState('');
  const saveButton =async () => {
     await fetch(`api/users/${item.id}` , {method: "PUT" , body:JSON.stringify({firstname:firstname,lastname:lastname, email:email,imageUrl:" http://dummyimage.com/206x199.png/dddddd/000000"})})
     onClose(false) 
     console.log(saveButton)
  }
useEffect(() => {
  setFirstName(item?.firstname);
  setLastName(item?.lastname);
  setEmail(item?.email);
}, [item]) 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">name</Label>
            <Input value={firstname} id="name"  onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">lastname</Label>
            <Input value={lastname} id="lastname"  onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input  value={email} id="email" onChange={(e) => setEmail(e.target.value)}  />
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