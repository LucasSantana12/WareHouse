export default interface ICreateLoanDTO {
  qtd: number;

  tomb?: number;

  user_id: string;

  product_id: string;

  returned?: boolean;
}
