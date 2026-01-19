import { useEffect, useMemo, useState } from 'react'
import './App.css'

// 1) TU ICONO DE CABECERA (pon tu archivo en src/assets/icons/)
// Cambia el nombre según tu archivo real:
import titleIcon from './assets/icons/name-icon.png'
import nameIcon from './assets/icons/name-icon.png'

// 2) IMÁGENES (empieza con pocas y luego añades)
// ⚠️ Pon tus archivos reales y ajusta los imports.
// Si aún no tienes imágenes, deja 1 placeholder y luego lo cambias.

import finished1 from './assets/art/finished/finished-1.jpg'
import finished2 from './assets/art/finished/finished-2.jpg'
import finished3 from './assets/art/finished/finished-3.jpg'

import sketch1 from './assets/art/sketchbook/page-1.jpg'
import sketch2 from './assets/art/sketchbook/page-2.jpg'
import sketch3 from './assets/art/sketchbook/page-3.jpg'

import craft1 from './assets/art/crafts/craft-1.jpg'
import craft2 from './assets/art/crafts/craft-2.jpg'
import craft3 from './assets/art/crafts/craft-3.jpg'

type Item = { src: string; title: string }

export default function App() {
    const finished: Item[] = useMemo(
        () => [
            { src: finished1, title: 'Finished #1' },
            { src: finished2, title: 'Finished #2' },
            { src: finished3, title: 'Finished #3' },
        ],
        []
    )

    const crafts: Item[] = useMemo(
        () => [
            { src: craft1, title: 'Craft #1' },
            { src: craft2, title: 'Craft #2' },
            { src: craft3, title: 'Craft #3' },
        ],
        []
    )

    const sketchPages = useMemo(() => [sketch1, sketch2, sketch3], [])
    const [page, setPage] = useState(0)

    // Soporte teclado: ← / →
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1))
            if (e.key === 'ArrowRight') setPage((p) => Math.min(sketchPages.length - 1, p + 1))
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [sketchPages.length])

    return (
        <div className="page">
            <header className="header">
                <div className="brand">
                    <img src={titleIcon} alt="Title icon" />
                    <div style={{ textAlign: 'left' }}>
                        <img src={nameIcon} alt="Name icon" />
                        <p className="subtitle">Illustration • Sketchbook • Handmade • Web</p>
                    </div>
                </div>

                <nav className="nav" aria-label="Sections">
                    <a href="#finished">Dibujos</a>
                    <a href="#sketchbook">Sketchbook</a>
                    <a href="#crafts">Artesanía</a>
                    <a href="#contact">Contacto</a>
                </nav>
            </header>

            <main>
                <section id="finished" className="section">
                    <h2>Galería · Dibujos terminados</h2>
                    <p>Una selección de piezas finalizadas. (Aquí puedes añadir una frase sobre técnica/temática.)</p>

                    <div className="grid">
                        {finished.map((it) => (
                            <figure className="card" key={it.title}>
                                <img src={it.src} alt={it.title} loading="lazy" />
                                <figcaption className="cap">{it.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                <section id="sketchbook" className="section">
                    <h2>Sketchbook</h2>
                    <p>Pasa páginas con los botones o con ← → del teclado.</p>

                    <div className="sketchWrap">
                        <div className="sketchFrame">
                            <img
                                src={sketchPages[page]}
                                alt={`Sketchbook page ${page + 1}`}
                                loading="eager"
                            />
                        </div>

                        <div className="sketchControls">
                            <button className="btn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                                ← Anterior
                            </button>

                            <span className="counter">
                Página {page + 1} / {sketchPages.length}
              </span>

                            <button
                                className="btn"
                                onClick={() => setPage((p) => Math.min(sketchPages.length - 1, p + 1))}
                                disabled={page === sketchPages.length - 1}
                            >
                                Siguiente →
                            </button>
                        </div>
                    </div>
                </section>

                <section id="crafts" className="section">
                    <h2>Proyectos artesanos</h2>
                    <p>Arcilla, piezas físicas, procesos y encargos.</p>

                    <div className="grid">
                        {crafts.map((it) => (
                            <figure className="card" key={it.title}>
                                <img src={it.src} alt={it.title} loading="lazy" />
                                <figcaption className="cap">{it.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                <section id="contact" className="section">
                    <h2>Contacto</h2>
                    <p>
                        Email: <a href="mailto:tuemail@ejemplo.com">tuemail@ejemplo.com</a>
                        <br />
                        GitHub: <a href="https://github.com/mesa-maria" target="_blank" rel="noreferrer">mesa-maria</a>
                    </p>
                </section>
            </main>

            <footer className="footer">
                © {new Date().getFullYear()} María Mesa
            </footer>
        </div>
    )
}
