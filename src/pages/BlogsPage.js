import React from 'react';
import '../styles/style.css';
import '../styles/style_blogs.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogsPage() {
  return (
    <div className="blogs-page">
      <Header />

      <main className="blogs-main-content">
        <div className="blogs-container">
          <h1>Noticias importantes</h1>
          <div className="blog-case">
            <div className="case-text">
              <h2>Respostería</h2>
              <p>La palabra repostería viene del latín repositorius que significa restaurar o reponer, 
                        refiriéndose a aquéllos hambrientos que vienen con el estómago vacío para que se lo repongan. Mientras que la etimología de la palabra pastel proviene de la palabra griega pasté que era como se conocía a la mezcla de harina y salsa.</p>
            </div>
            <div className="case-image">
              <img src="https://scholalatina.it/wp-content/uploads/2020/09/Cur-lingua-latina-discatur_.jpg" alt="Latin" />
            </div>
          </div>

          <div className="blog-case">
            <div className="case-text">
              <h2>Origen pastelería</h2>
              <p>Los primeros indicios que se tienen de la existencia de la pastelería datan de la antigua Mesopotamia y de Egipto.</p>
            </div>
            <div className="case-image">
              <img src="https://content-historia.nationalgeographic.com.es/medio/2018/02/27/paseo-por-egipto__1280x720.jpg" alt="Egipto" />
            </div>
          </div>
          <div className="blog-case">
            <div className="case-text">
              <h2>Ingrediente más utilizado</h2>
              <p>A pesar de los millones de ingredientes que existen, el más utilizado es indiscutiblemente el azúcar.</p>
            </div>
            <div className="case-image">
              <img src="https://empresasiansa.cl/content/uploads/2024/06/17.%C2%BFQue-es-azucar-sacarosa_hero.jpg" alt="Azucar" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
