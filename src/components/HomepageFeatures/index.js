import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Comparte objetos',
    description: (
      <>
        Publica artículos para prestar, donar o intercambiar con otros usuarios de tu comunidad de forma sencilla.
      </>
    ),
  },
  {
    title: 'Mensajería directa',
    description: (
      <>
        Coordina préstamos y donaciones mediante el chat integrado entre usuarios, sin salir de la plataforma.
      </>
    ),
  },
  {
    title: 'Reputación y valoraciones',
    description: (
      <>
        Sistema de puntuaciones para generar confianza entre usuarios y fomentar un intercambio seguro.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
