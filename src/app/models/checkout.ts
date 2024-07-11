import { Order } from "./order";
import { OrderDetail } from "./order-detail";

export interface Checkout {
    order: Order;
    order_details: OrderDetail[];
}
