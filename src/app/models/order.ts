export class Order {
    id:number | undefined;
    user_id:number | undefined;
    fullname:String | undefined;
    phone_number:String | undefined;
    email:String | undefined;
    address:String | undefined;
    note:String | undefined;
    order_date:Date | any;
    status:boolean | any;
    total_money:number | any;
    shipping_method:String | any;
    shipping_date:Date | any;
    updated_at:Date | any;
    payment_method:String | any;
    active: any;
    avatar: String | undefined;
}
