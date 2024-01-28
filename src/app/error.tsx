"use client";

import { title } from "@/components/stateless/primitives";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col max-w-lg text-center justify-center">
        <h2 className={clsx(title(), "pb-5")}>Something went wrong!</h2>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </section>
  );
}
