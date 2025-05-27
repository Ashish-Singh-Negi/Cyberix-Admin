import React from "react";
import OrderCard from "./component/OrderCard";

// import img1 from '@/public/mobile/apple/Natural/pic1.webp'
// import img2 from '@/public/mobile/apple/Black/pic1.webp'

const fakeData = [
  {
    user: "AppleG",
    orderId: "fdsfarakdchbd",
    productName: "Samsung Galaxy S24 Ultra (Titanium Black , 256GB)",
    img:'',
    price: 129999,
    quantity: 1,
    shipped: false,
  },
  {
    user: "MangoG",
    orderId: "fauuhinancfres",
    productName: "Acer Pedrator neo 16,i5 13500HX,RTX 4050 (140W TGP)",
    img:'',
    price: 99999,
    quantity: 1,
    shipped: true,
  },
];

const OrdersPage = () => {
  return (
    <div className="h-full w-full">
      <h1 className="h-10 w-full text-3xl font-medium py-1">Orders</h1>
      <main className="h-[94%] bg-white dark:bg-gray-950 w-full overflow-y-auto rounded-md border-gray-200 dark:border-custom mt-2 flex flex-col">
        <p className="h-12 w-full py-1 text-lg border-y-4 mb-1 border-inherit grid items-center grid-cols-6 font-medium rounded-md">
          <span className="flex justify-center col-span-2">Product</span>
          <span className="flex justify-center">User</span>
          <span className="flex justify-center">Quantity</span>
          <span className="flex justify-center">Price</span>
          <span className="flex justify-center">shipped</span>
        </p>
        <main className="h-full w-full border-gray-500 bg-white dark:bg-gray-950 overflow-y-auto">
          {fakeData.map((order) => (
            <OrderCard
              key={order.price}
              orderId={order.orderId}
              user={order.user}
              productName={order.productName}
              price={order.price}
              quantity={order.quantity}
              shipped={order.shipped}
              img={order.img}
            />
          ))}
        </main>
      </main>
    </div>
  );
};

export default OrdersPage;
