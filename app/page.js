import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <h2>Hello everyone</h2>
    <Button>Hello</Button>
    <UserButton/>
   </div>
  );
}
