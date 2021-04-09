import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logoFucapi.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()

            .email('Digite um e-mail válido')

            .required('E-mail obrigatório'),

          password: Yup.string().required('Senha Obrigatoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        // Disparar um toast para a visar um error
        addToast({
          type: 'error',
          title: 'Erro na Autenticação',
          description: 'Erro ao fazer o login, cheque suas credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Fucapi" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit"> Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="create">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
