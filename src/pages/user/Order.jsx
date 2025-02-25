import OrderTable from "../../components/user/order/OrderTable";
import SubTitle from "../../components/user/shared/SubTitle";

export default function Order() {
  return (
    <main className="w-[80%] mx-auto mt-6">
        <SubTitle>Order</SubTitle>
        <OrderTable />
    </main>
  )
}
