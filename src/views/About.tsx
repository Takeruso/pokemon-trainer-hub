function About() {
  return (
    <main className="about-page">
      <section className="about-card">
        <p className="about-badge">Small Full-Stack Demo App</p>
        <h1 className="about-title">About This App</h1>
        <p className="about-lead">
          This project is a practice full-stack application that shows how to
          build a small but realistic web app with authentication, CRUD, and API
          integration.
        </p>

        <section className="about-section">
          <h2 className="about-section-title">Tech Stack</h2>
          <ul className="about-tech-grid">
            <li>
              <strong>React + TypeScript</strong>
              <span>SPA frontend with typed components</span>
            </li>
            <li>
              <strong>Express + Node.js</strong>
              <span>REST API server</span>
            </li>
            <li>
              <strong>MongoDB Atlas</strong>
              <span>Cloud-hosted document database</span>
            </li>
            <li>
              <strong>PokeAPI</strong>
              <span>External API example for Pokemon data</span>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Main Features</h2>
          <ul className="about-list">
            <li>
              <strong>User Authentication</strong> – Login / Signup with basic
              session handling
            </li>
            <li>
              <strong>Comment Dashboard</strong> – Create, edit, delete, and
              like comments
            </li>
            <li>
              <strong>Pokemon Explorer</strong> – Fetch and display data from
              PokeAPI
            </li>
            <li>
              <strong>News List</strong> – Simple rendering from local JSON
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            What This Project Demonstrates
          </h2>
          <ul className="about-list">
            <li>Basic full-stack architecture for a small app</li>
            <li>Connecting frontend components to an Express API</li>
            <li>Using MongoDB for persistent data</li>
            <li>Mixing your own backend with a public API</li>
          </ul>
        </section>
      </section>
    </main>
  );
}

export default About;
