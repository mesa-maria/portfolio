import './App.css'

export default function App() {
    return (
        <div className="page">
            <header className="header">
                <div>
                    <h1>María Mesa</h1>
                    <p className="subtitle">Art & Frontend Development</p>
                </div>

                <nav className="nav">
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <h2>Portfolio</h2>
                    <p>
                        Selección de trabajos artísticos y proyectos web. Diseño, implementación y
                        despliegue en GitHub Pages.
                    </p>
                    <div className="heroButtons">
                        <a className="btn" href="#work">Ver proyectos</a>
                        <a className="btn secondary" href="#contact">Contactar</a>
                    </div>
                </section>

                <section id="work" className="section">
                    <h3>Work</h3>

                    <div className="grid">
                        <article className="card">
                            <h4>Proyecto 1</h4>
                            <p>Descripción corta (qué es, tu rol, y qué aporta).</p>
                            <div className="tags">
                                <span>UI</span><span>React</span><span>Responsive</span>
                            </div>
                        </article>

                        <article className="card">
                            <h4>Proyecto 2</h4>
                            <p>Descripción corta (arte, concepto, proceso).</p>
                            <div className="tags">
                                <span>Illustration</span><span>Brand</span><span>Concept</span>
                            </div>
                        </article>

                        <article className="card">
                            <h4>Proyecto 3</h4>
                            <p>Proyecto técnico: qué decidiste y por qué.</p>
                            <div className="tags">
                                <span>TypeScript</span><span>Vite</span><span>Deploy</span>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="about" className="section">
                    <h3>About</h3>
                    <p>
                        Cuenta en 4–5 líneas quién eres, qué estilo tienes y qué tipo de proyectos
                        buscas. Aquí puedes mezclar arte + dev.
                    </p>
                </section>

                <section id="contact" className="section">
                    <h3>Contact</h3>
                    <p>
                        Email: <a href="mailto:tuemail@ejemplo.com">tuemail@ejemplo.com</a>
                        <br />
                        GitHub: <a href="https://github.com/mesa-maria" target="_blank" rel="noreferrer">mesa-maria</a>
                    </p>
                </section>
            </main>

            <footer className="footer">
                <small>© {new Date().getFullYear()} María Mesa</small>
            </footer>
        </div>
    )
}
