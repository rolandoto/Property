import PropertybyId from "@/app/ui/PropertybyId";
import PropertyDetailSkeleton from "@/app/ui/skeletons";
import { Suspense } from "react";

export default  async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <main >
        <Suspense   key={id} fallback={<PropertyDetailSkeleton />} >
                <PropertybyId id={id}  />
            </Suspense>
        </main>
    );
}
