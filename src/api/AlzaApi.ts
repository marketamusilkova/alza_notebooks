import type { ApiResponse, Product } from "../types";

const TARGET_URL = "https://www.alza.cz/Services/RestService.svc/v2/products";
const PROXY_URL = "https://corsproxy.io/?";
const API_URL = `${PROXY_URL}${encodeURIComponent(TARGET_URL)}`;

// ID 18855843 ze zadání nevrací notebooky, proto jsem použila ID 18842920, které odpovídá reálné kategorii Notebooky v Alza API.

//Pro tento příklad jsem se rozhodla načíst jen 5 stránek...
const MAX_PAGES = 5;

export const fetchNotebooks = async (): Promise<Product[]> => {
  const allProducts: Product[] = [];
  let page = 1;

  while (page <= MAX_PAGES) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterParameters: {
          id: 18842920,
          isInStockOnly: false,
          newsOnly: false,
          wearType: 0,
          orderBy: 0,
          page: page,
          params: [],
          producers: [],
          sendPrices: true,
          type: "category",
          typeId: "0",
          branchId: "",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP chyba! Status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (result.err > 0) {
      throw new Error(result.msg ?? "Alza API vrátilo chybu");
    }

    const products = result.data ?? [];

    if (products.length === 0) {
      break;
    }

    allProducts.push(...products);
    page++;
  }

  return allProducts;
};
