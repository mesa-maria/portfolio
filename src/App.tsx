import { useEffect, useMemo, useState } from 'react'
import './App.css'

// ICONOS
import namePng from './assets/icons/name-icon.png'
import finishedPng from './assets/icons/finished-icon.png'
import sketchbookPng from './assets/icons/sketchbook-icon.png'
import animationsPng from './assets/icons/animations-icon.png'
import craftsPng from './assets/icons/crafts-icon.png'
import contactPng from './assets/icons/contact-icon.png'

// LABELS
import signature from './assets/labels/signature.png'

/* ===============================
   AUTO-IMPORT DE TODO EL ARTE
================================ */

const artFiles = import.meta.glob(
    './assets/art/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}',
    { eager: true, as: 'url' }
)

type ArtItem = { src: string }
type ArtIndex = Record<string, ArtItem[]>

function buildArtIndex(files: Record<string, string>): ArtIndex {
    const out: ArtIndex = {}

    for (const [path, url] of Object.entries(files)) {
        const parts = path.split('/')
        const folder = parts[3] // finished | sketchbook | animations | crafts

        if (!out[folder]) out[folder] = []
        out[folder].push({ src: url })
    }

    // ordenar de forma estable
    Object.values(out).forEach(arr =>
        arr.sort((a, b) => a.src.localeCompare(b.src))
    )

    return out
}

/* ===============================
   COMPONENTES AUXILIARES
================================ */

function MiniCarousel({ photos, altBase }: { photos: string[]; altBase: string }) {
    const [i, setI] = useState(0)
    const prev = () => setI(x => (x === 0 ? photos.length - 1 : x - 1))
    const next = () => setI(x => (x === photos.length - 1 ? 0 : x + 1))

    return (
        <div className="miniCarousel">
            <button className="btn small" onClick={prev} aria-label="Anterior">←</button>
            <img className="miniImg" src={photos[i]} alt={`${altBase} ${i + 1}`} loading="lazy" />
            <button className="btn small" onClick={next} aria-label="Siguiente">→</button>
        </div>
    )
}

/* ===============================
   APP
================================ */

export default function App() {
    const art = useMemo(() => buildArtIndex(artFiles), [])

    // MODAL
    const [openImg, setOpenImg] = useState<string | null>(null)

    // SKETCHBOOK
    const sketchPages = art.sketchbook?.map(i => i.src) ?? []
    const [page, setPage] = useState(0)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    // TECLADO
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') setPage(p => Math.max(0, p - 1))
            if (e.key === 'ArrowRight') setPage(p => Math.min(sketchPages.length - 1, p + 1))
            if (e.key === 'Escape') setOpenImg(null)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [sketchPages.length])

    return (
        <div className="page">
            <header className="header">
                <div className="brand">
                    <div className="brandText">
                        <img className="nameIcon" src={namePng} alt="María Mesa" />
                        <p className="subtitle">Illustration • Sketchbook • Handmade • Web</p>
                    </div>
                </div>

                <nav className="nav">
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
                    <img className="sectionTitleIcon" src={finishedPng} alt="Dibujos terminados" />
                    <p>Una selección de piezas finalizadas.</p>

                    <div className="grid">
                        {art.finished?.map(it => (
                            <button
                                key={it.src}
                                className="imgButton"
                                onClick={() => setOpenImg(it.src)}
                            >
                                <img src={it.src} alt="" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </section>

                {/* SKETCHBOOK */}
                <section id="sketchbook" className="section">
                    <img className="sectionTitleIcon" src={sketchbookPng} alt="Sketchbook" />
                    <p>Desliza o usa las flechas.</p>

                    <div
                        className="sketchFrame"
                        onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
                        onTouchEnd={e => {
                            if (touchStartX === null) return
                            const dx = e.changedTouches[0].clientX - touchStartX
                            if (dx > 40) setPage(p => Math.max(0, p - 1))
                            if (dx < -40) setPage(p => Math.min(sketchPages.length - 1, p + 1))
                            setTouchStartX(null)
                        }}
                    >
                        <img src={sketchPages[page]} alt={`Página ${page + 1}`} />
                    </div>

                    <div className="sketchControls">
                        <button className="btn" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                            ← Anterior
                        </button>
                        <span>Página {page + 1} / {sketchPages.length}</span>
                        <button
                            className="btn"
                            onClick={() => setPage(p => Math.min(sketchPages.length - 1, p + 1))}
                            disabled={page === sketchPages.length - 1}
                        >
                            Siguiente →
                        </button>
                    </div>
                </section>

                {/* ANIMACIONES */}
                <section id="animations" className="section">
                    <img className="sectionTitleIcon" src={animationsPng} alt="Animaciones" />
                    <div className="grid">
                        {art.animations?.map(it => (
                            <div className="reelFrame" key={it.src}>
                                <video
                                    className="reel"
                                    src={it.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ARTESANÍA */}
                <section id="crafts" className="section">
                    <img className="sectionTitleIcon" src={craftsPng} alt="Artesanía" />
                    <div className="grid">
                        {art.crafts?.length > 0 && (
                            <MiniCarousel
                                photos={art.crafts.map(i => i.src)}
                                altBase="Artesanía"
                            />
                        )}
                    </div>
                </section>

                {/* CONTACTO */}
                <section id="contact" className="section">
                    <img className="sectionTitleIcon" src={contactPng} alt="Contacto" />
                    <p>
                        Email: <a href="mailto:mariagmesa37@gmail.com">mariagmesa37@gmail.com</a><br />
                        GitHub: <a href="https://github.com/mesa-maria" target="_blank">mesa-maria</a><br />
                        Instagram: <a href="https://www.instagram.com/por_la_acera/" target="_blank">@por_la_acera</a>
                    </p>
                </section>
            </main>

            <footer className="footer">
                <img className="signature" src={signature} alt="Firma" />
            </footer>

            {/* MODAL */}
            {openImg && (
                <div className="modal" onClick={() => setOpenImg(null)}>
                    <button className="modalClose">✕</button>
                    <img className="modalImg" src={openImg} alt="" onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    )
}
