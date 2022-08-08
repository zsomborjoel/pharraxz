import { OrderOverview } from "../../services/model/OrderOverview";
import { OrderView } from "../../services/model/OrderView";

const getOrderViews = (oos: OrderOverview[]): OrderView[] => {
    const orderViewsNew = [] as OrderView[];

    if (oos.length > 0) {
        console.log(oos)
        oos.forEach((orderOverview) => {
            console.log(oos)
            orderOverview.orderDetails.forEach((orderDetail) => {
                const orderViewNew = {} as OrderView;

                orderViewNew.orderId = orderOverview.orderId;
                orderViewNew.description = orderOverview.description;
                orderViewNew.id = orderDetail.orderDetailId;
                orderViewNew.product = orderDetail.product;
                orderViewNew.quantity = orderDetail.quantity;
                orderViewNew.orderType = orderDetail.orderType;
                orderViewNew.startDate = orderDetail.startDate;
                orderViewNew.endDate = orderDetail.endDate;
                console.log(orderViewNew)
                orderViewsNew.push(orderViewNew);
            });
        });
    }

    return orderViewsNew;
};

const OrderMapper = {
    getOrderViews,
};

export default OrderMapper;
