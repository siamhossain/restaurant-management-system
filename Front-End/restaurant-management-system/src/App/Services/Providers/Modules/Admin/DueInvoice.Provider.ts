import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {ICustomer, IDueInvoice, ISalesOrder, ISupplier} from "@/App/Interfaces/Models";
import {adminRoute} from "@/App/Functions/Custom";

export class DueInvoiceProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getDuesForGrid(rowsPerPage: number, currentPage: number, search: string, participant_type: IDueInvoice['participant_type'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/due-invoices", {prefix: "grid"}),
            {},
            {
                RowsPerPage: rowsPerPage,
                PageNumber: currentPage,
                search_query: search,
                participant_type,
            },
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getCustomerDue(data: {type: "regular" | "installment", customer_uuid?: ICustomer['uuid'], sales_order_code?: ISalesOrder['code']}, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-due"),
            {},
            data,
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
    public static getSupplierDue(supplier_uuid: ISupplier['uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/supplier-due"),
            {},
            {supplier_uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveDue(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/due-invoice", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteDue(uuid: IDueInvoice['uuid'], callback: ((data: any) => void) | undefined = undefined): void{
        HttpRequestProvider.send("delete", adminRoute("/due-invoice", {prefix: "delete"}),
            {},
            {
                uuid,
            },
            (data: any) => {
                if (callback){
                    callback(data);
                }
            });
    }
}