import { Product } from "..";

export interface IAppContext {
  headline: string;
  products: Product[] | undefined;
}
