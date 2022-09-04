export interface Product {
    id: string | null;
    name: string | null;
    atc: string | null;
    supplierId: number | null;
    packaging: string | null;
    description: string | null;
    distributor: string | null;
    inn: string | null;
    releasable: boolean | null;
    releasableBy: string | null;
}
