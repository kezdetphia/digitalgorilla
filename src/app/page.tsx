import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const perks = [
  {
    name: 'Instand Delivery',
    
  }
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-mypurple">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-fore">
            Welcome to DigitalGorilla. Every asset on our platform is verified
            by out team to ensure our highest quality standards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 ">
            <Link className={buttonVariants()} href="/products">
              <p className="font-bold">Browse Trending</p>
            </Link>
            <Button variant="ghost" className="font-bold">
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
        {/* TODO : List products */}
      </MaxWidthWrapper>
        <section className="border-t border-gray-200 bg-gray-50">
          <MaxWidthWrapper className="y-20">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              
            </div>
          </MaxWidthWrapper>

        </section>
    </>
  );
}
