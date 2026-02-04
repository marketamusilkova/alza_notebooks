
export interface Product {
  id: number;
  code: string;
  img: string;
  name: string;
  spec: string;
  price: string;
  cprice: string | null;
  priceWithoutVat: string;
  avail: string;
  avail_postfix: string;
  avail_color: string;
  rating: number;
  advertising?: string;
}

export interface ApiResponse {
  err: number;
  msg: string | null;
  data: Product[];
}

export type SortOption = 'TOP' | 'NEJPRODAVANEJSI' | 'NEJLEVNEJSI' | 'NEJDRAZSI';

export const CATEGORIES = [
  'Vše', 'Macbook', 'Herní', 'Kancelářské', 'Profesionální', 'Stylové',
  'Základní', 'Dotykové', 'Na splátky', 'VR Ready', 'IRIS Graphics',
  'Brašny, batohy', 'Příslušenství'
];