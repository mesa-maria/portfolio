import { useEffect, useMemo, useState } from 'react'
import './App.css'

// ICONOS / LABELS
import namePng from './assets/icons/name-icon.png'

// DIBUJOS TERMINADOS
import finished1 from './assets/art/finished/finished-1.jpg'
import finished2 from './assets/art/finished/finished-2.jpg'
import finished3 from './assets/art/finished/finished-3.jpg'

// SKETCHBOOK
import sketch1 from './assets/art/sketchbook/page-1.jpg'
import sketch2 from './assets/art/sketchbook/page-2.jpg'
import sketch3 from './assets/art/sketchbook/page-3.jpg'

// ANIMACIONES (MP4)
import anim1 from './assets/art/animations/animation-1.mp4'
import anim2 from './assets/art/animations/animation-2.mp4'

// ARTESANÍA
import craftA1 from './assets/art/crafts/craft-a-1.jpg'
import craftA2 from './assets/art/crafts/craft-a-2.jpg'
import craftA3 from './assets/art/crafts/craft-a-3.jpg'

type Item = { src: string }
type CraftProject = { title: string; photos: string[] }

function MiniCarousel({ photos, altBase }: { photos: string[]; altBase: string }) {
    const [i, setI] = useState(0)
    const prev = () => setI((x) => (x === 0 ? photos.length - 1 : x - 1))
    const next = () => setI((x) => (x === photos.length - 1 ? 0 : x + 1))

    return (
        <div className="miniCarousel">
            <button className="btn small" onClick={prev} aria-label="Anterior">
                ←
            </button>

            <img className="miniImg" src={photos[i]} alt={`${altBase} ${i + 1}`} loading="lazy" />

            <button className="btn small" onClick={next} aria-label="Siguiente">
                →
            </button>
        </div>
    )
}

export default function App() {
    // Terminados sin títulos
    const finished: Item[] = useMemo(
        () => [{ src: finished1 }, { src: finished2 }, { src: finished3 }],
        []
    )

    const sketchPages = useMemo(() => [sketch1, sketch2, sketch3], [])
    const [page, setPage] = useState(0)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    // Modal para ver imágenes grandes (terminados / lo que quieras)
    const [openImg, setOpenImg] = useState<string | null>(null)

    // Teclado ← →
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1))
            if (e.key === 'ArrowRight') setPage((p) => Math.min(sketchPages.length - 1, p + 1))
            if (e.key === 'Escape') setOpenImg(null)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [sketchPages.length])

    // Artesanía: proyectos con varias fotos
    const craftProjects: CraftProject[] = useMemo(
        () => [
            { title: 'Arcilla · Serie 1', photos: [craftA1, craftA2, craftA3] }
        ],
        []
    )

    return (
        <div className="page">
            <header className="header">
                <div className="brand">
                    <div className="brandText">
                        <img className="nameIcon" src={namePng} alt="María Mesa" />
                        <p className="subtitle">Illustration • Sketchbook • Handmade • Web</p>
                    </div>
                </div>

                <nav className="nav" aria-label="Sections">
                    <a href="#finished">Dibujos</a>
                    <a href="#sketchbook">Sketchbook</a>
                    <a href="#animations">Animaciones</a>
                    <a href="#crafts">Artesanía</a>
                    <a href="#contact">Contacto</a>
                </nav>
            </header>

            <main>
                {/* TERMINADOS */}
                <section id="finished" className="section">
                    <h2>Galería · Dibujos terminados</h2>
                    <p>Una selección de piezas finalizadas.</p>

                    <div className="grid">
                        {finished.map((it, idx) => (
                            <button
                                key={idx}
                                className="imgButton"
                                onClick={() => setOpenImg(it.src)}
                                aria-label={`Abrir imagen terminada ${idx + 1}`}
                            >
                                <img src={it.src} alt="" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </section>

                {/* SKETCHBOOK */}
                <section id="sketchbook" className="section">
                    <h2>Sketchbook</h2>
                    <p>Desliza en móvil o usa ← → para pasar páginas.</p>

                    <div className="sketchWrap">
                        <div
                            className="sketchFrame"
                            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                            onTouchEnd={(e) => {
                                if (touchStartX === null) return
                                const dx = e.changedTouches[0].clientX - touchStartX
                                const threshold = 40
                                if (dx > threshold) setPage((p) => Math.max(0, p - 1))
                                if (dx < -threshold) setPage((p) => Math.min(sketchPages.length - 1, p + 1))
                                setTouchStartX(null)
                            }}
                        >
                            <img src={sketchPages[page]} alt={`Sketchbook page ${page + 1}`} loading="eager" />
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

                {/* ANIMACIONES */}
                <section id="animations" className="section">
                    <h2>Animaciones</h2>
                    <p>Piezas animadas en vídeo.</p>

                    <div className="grid">
                        <figure className="card">
                            <video
                                className="video"
                                src={anim1}
                                controls
                                playsInline
                                preload="metadata"
                            />
                            <video
                                className="video"
                                src={anim2}
                                controls
                                playsInline
                                preload="metadata"
                            />
                        </figure>
                    </div>
                </section>

                {/* ARTESANÍA */}
                <section id="crafts" className="section">
                    <h2>Proyectos artesanos</h2>
                    <p>Arcilla, piezas físicas, procesos y encargos.</p>

                    <div className="grid">
                        {craftProjects.map((p) => (
                            <figure className="card" key={p.title}>
                                <MiniCarousel photos={p.photos} altBase={p.title} />
                                <figcaption className="cap">{p.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                {/* CONTACTO */}
                <section id="contact" className="section">
                    <h2>Contacto</h2>
                    <p>
                        Email: <a href="mailto:mariagmesa37@gmail.com">mariagmesa37@gmail.com</a>
                        <br />
                        GitHub:{' '}
                        <a href="https://github.com/mesa-maria" target="_blank" rel="noreferrer">
                            mesa-maria
                        </a>
                    </p>
                </section>
            </main>

            <footer className="footer">© {new Date().getFullYear()} María Mesa</footer>

            {/* MODAL */}
            {openImg && (
                <div className="modal" role="dialog" aria-modal="true" onClick={() => setOpenImg(null)}>
                    <button className="modalClose" onClick={() => setOpenImg(null)} aria-label="Cerrar">
                        ✕
                    </button>
                    <img className="modalImg" src={openImg} alt="" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    )
}
