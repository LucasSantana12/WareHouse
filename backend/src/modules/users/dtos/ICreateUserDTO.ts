export default interface ICreateUserDTO {
  name: string;

  email: string;

  matricula: number;

  password: string;

  admin?: boolean;
}
