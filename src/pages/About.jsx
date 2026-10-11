import '../CssPages/About.css';

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="section-tag">ABOUT TUTORCONNECT</span>
        <h1>Helping every learner find the right support.</h1>
        <p>
          TutorConnect brings learners, guardians, and qualified tutors together
          to make personalized learning easier to access.
        </p>

        <a href="/find-tutors" className="about-cta">
          Find a tutor
        </a>
      </section>

      <section className="about-intro">
        <div className="about-intro-text">
          <span className="section-tag">WHO WE ARE</span>
          <h2>Learning works better when the right people connect.</h2>
          <p>
            TutorConnect is a tutoring platform designed to help learners
            discover tutors based on subjects, grade levels, learning needs,
            availability, and preferences.
          </p>
          <p>
            Guardians can help manage learning arrangements, tutors can share
            their expertise, and learners can find support for their educational
            goals.
          </p>
        </div>

        <div className="about-highlight">
          <div className="about-highlight-icon">🎓</div>
          <h3>Learning centered on you</h3>
          <p>
            Our goal is to make it easier to find suitable learning support and
            manage tutoring in one place.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <span className="section-tag">WHAT MATTERS TO US</span>
          <h2>Our core values</h2>
          <p>The principles that guide the TutorConnect experience.</p>
        </div>

        <div className="about-value-grid">
          <article className="about-value-card">
            <span>🤝</span>
            <h3>Trust and safety</h3>
            <p>
              We aim to support trustworthy connections and safer tutoring
              experiences for learners and guardians.
            </p>
          </article>

          <article className="about-value-card">
            <span>🎯</span>
            <h3>Personalized learning</h3>
            <p>
              Learners should be able to explore tutors who fit their subjects,
              goals, and learning preferences.
            </p>
          </article>

          <article className="about-value-card">
            <span>🌱</span>
            <h3>Growth and opportunity</h3>
            <p>
              We want learners to grow their skills and tutors to share
              knowledge and build meaningful teaching experiences.
            </p>
          </article>
        </div>
      </section>

      <section className="about-bottom">
        <h2>Your learning journey starts with the right connection.</h2>
        <p>Explore tutors and take the next step toward your learning goals.</p>
        <a href="/find-tutors" className="about-cta">
          Explore tutors
        </a>
      </section>
    </main>
  );
}

export default About;
