
import React from 'react';
import { Carousel } from 'react-bootstrap';
import imagen1 from '../../Img/1.png';
import imagen2 from '../../Img/3.png';
import imagen3 from '../../Img/4.png';
import '../../Styles/BootstrapCarousel.css'; // Importar el archivo CSS personalizado
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapCarousel = () => {
  const slides = [
    {
      image: imagen1,
      captionTitle: 'Título de la imagen 1',
      captionText: 'Descripción de la imagen 1',
    },
    {
      image: imagen2,
      captionTitle: 'Título de la imagen 2',
      captionText: 'Descripción de la imagen 2',
    },
    {
      image: imagen3,
      captionTitle: 'Título de la imagen 3',
      captionText: 'Descripción de la imagen 3',
    },
  ];

  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${index}`}
          />
          <Carousel.Caption>
            <h3>{slide.captionTitle}</h3>
            <p>{slide.captionText}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BootstrapCarousel;
