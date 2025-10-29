import { Suspense } from "react";
import {ProductCardsSkeleton } from "./ui/skeletons";
import PropertyList from "./ui/Property";

export default  async function Page({searchParams}:{searchParams:{query?:string,page?:string ,   minprice?: string;maxprice?: string;}}) {

 const query = (searchParams?.query) || ""
 const minprice=  (searchParams?.minprice) || ""
 const maxprice =  (searchParams?.maxprice) || ""

  return (
     <main className=" mx-auto px-6 py-8">
      <h2 className="text-sm text-gray-500 mb-2">RESULTADO DE LA BÚSQUEDA:</h2>
      <h1 className="text-3xl font-bold mb-4">{query}</h1>
       <Suspense   key={query} fallback={<ProductCardsSkeleton />} >
         <div className="grid grid-cols-2 lg:grid-cols-4  ">
              <PropertyList minprice={minprice}  maxprice={maxprice}  query={query}  />
           </div>
        </Suspense>
    </main>
  );
}
