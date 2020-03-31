import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.scss';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();


  async function handleRegister(_, e) {
    e.preventDefault();


    const data ={
      name,
      email,
      whatsApp,
      city,
      uf
    }

    try {
      const response = api.post('ongs', data)
      swal.fire({
        text: `Seu id foi criado: ${response.data.id}`,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      })
      history.push('/')
    } catch (err) {
      swal.fire({
        icon: 'error',
        text: 'Erro no cadastro, tente novamente',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo Be The Hero"/>

            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e veja como esse projeto funciona!</p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041"/>
                Login
            </Link>
            </section>
          <form onSubmit={handleSubmit(handleRegister)}>
            <input
              name="name"
              ref={register({
                required: 'Nome obrigatório',
                pattern: {
                  value:  /^[A-Za-z]+$/i,
                  message: 'Nome inválido'
                }
                })}
              placeholder="* Nome da ONG"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <span className="error">
              {errors.name && errors.name.message}
            </span>
            <input
              type="email"
              name="email"
              placeholder="* E-mail"
              ref={register({
                required: 'Email obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email inválido"
                }})}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <span className="error">
              {errors.email && errors.email.message}
            </span>

            <input
              placeholder="* WhatsApp"
              minLength="12"
              maxLength="12"
              name="phoneNumber"
              ref={register({
                required: 'Número obrigatório',
                })}
              value={whatsApp}
              onChange={e => setWhatsApp(e.target.value.replace(/\D/,''))}
            />
             <span className="error">
              {errors.phoneNumber && errors.phoneNumber.message}
            </span>

          <div className="input-group">
            <input
              placeholder="Cidade "
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              maxLength="2"
              minLength="2"
              placeholder="UF"
              name="uf"
              style={{width: 80}}
              value={uf}
              onChange={e => setUf(e.target.value.toUpperCase())}
            />
          </div>

           <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  )
}

export default Register