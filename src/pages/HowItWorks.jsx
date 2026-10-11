import { Link } from 'react-router-dom';
import '../CssPages/HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '🔎',
      title: 'Find your tutor',
      description:
        'Explore tutors by subject, grade level, teaching experience, and availability.',
    },
    {
      number: '02',
      icon: '👤',
      title: 'Review tutor profiles',
      description:
        "Check each tutor's profile, qualifications, teaching approach, and reviews.",
    },
    {
      number: '03',
      icon: '📅',
      title: 'Book a lesson',
      description:
        'Choose a suitable available time and submit your lesson booking request.',
    },
    {
      number: '04',
      icon: '💬',
      title: 'Connect and learn',
      description:
        'Communicate about lessons and work toward your learning goals.',
    },
  ];

  const roles = [
    {
      icon: '🎓',
      title: 'For learners',
      description:
        'Discover tutors, explore subjects, and organize your learning sessions.',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'For guardians',
      description:
        'Help manage learning arrangements and monitor tutoring activities.',
    },
    {
      icon: '🧑‍🏫',
      title: 'For tutors',
      description:
        'Create a teaching profile, share your expertise, and manage lesson requests.',
    },
  ];

  return (
    <main className="how-page">
      <section className="how-hero">
        <span className="section-tag">HOW IT WORKS</span>
        <h1>Better learning starts with the right connection.</h1>
        <p>
          TutorConnect helps learners, guardians, and tutors connect through a
          simple process.
        </p>
        <Link to="/find-tutors" className="how-primary-btn">
          Find a tutor
        </Link>
      </section>

      <section className="how-steps-section">
        <div className="how-heading">
          <span className="section-tag">FOUR SIMPLE STEPS</span>
          <h2>Start your learning journey</h2>
          <p>From discovering a tutor to preparing for your lesson.</p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step) => (
            <article className="how-step-card" key={step.number}>
              <span className="how-step-number">{step.number}</span>
              <div className="how-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="how-roles-section">
        <div className="how-heading">
          <span className="section-tag">MADE FOR EVERYONE</span>
          <h2>How you can use TutorConnect</h2>
        </div>

        <div className="how-roles-grid">
          {roles.map((role) => (
            <article className="how-role-card" key={role.title}>
              <div className="how-role-icon">{role.icon}</div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="how-bottom">
        <h2>Ready to take the next step?</h2>
        <p>Explore available tutors and find support for your goals.</p>
        <Link to="/find-tutors" className="how-primary-btn">
          Explore tutors
        </Link>
      </section>
    </main>
  );
}

export default HowItWorks;
