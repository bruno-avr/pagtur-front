"use server"

import Breadcrumb from "@/components/breadcrumb";
import ContractDetails from "@/app/parents/[parentId]/contracts/[contractId]/contract-details";

export default async function ContractPage() {
  return (
    <Breadcrumb>
      <div className="container mt-5">
        <div className="row">
          <ContractDetails isParent />
        </div>
      </div>
    </Breadcrumb>
  )
}
