"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function AddToCartButton() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Button onClick={() => setIsSuccess(true)} size="lg" className="w-full">
      {isSuccess ? 'Added': 'Add to Cart'}
    </Button>
  );
}
