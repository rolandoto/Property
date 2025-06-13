import CustomersTable from "@/app/ui/customers/table";
import {  InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async  function CustomerPage({searchParams}:{searchParams:{query?:string,page?:string}}) {

    const currentPage = Number(searchParams?.page) || 1
    const query = (searchParams?.query) || ""
    
    return <>
            <Suspense  key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <CustomersTable  query={query} />
            </Suspense>
        </>
}