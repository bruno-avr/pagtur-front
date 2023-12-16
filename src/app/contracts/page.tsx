"use server"

import Breadcrumb from "@/components/breadcrumb";
import ContractCards from "../parents/[parentId]/contracts/contract-cards";

export default async function Parent() {
  return (
    <Breadcrumb hasAddButton>
      <div className="container mt-5">
        <div className="row">
          <ContractCards isParent />
        </div>
      </div>
    </Breadcrumb>
  )
}
