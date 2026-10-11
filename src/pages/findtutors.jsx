import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../CssPages/FindTutors.css';

const tutors = [
  {
    id: 1,
    initials: 'HT',
    name: 'Hanna Tesfaye',
    subjects: ['Mathematics'],
    grades: [6, 7, 8, 9, 10],
    modes: ['Online', 'In-person'],
    rating: 4.9,
    reviews: 38,
    experience: 7,
    price: 250,
    availability: 'Sat 10:00',
    verified: true,
    description:
      'Secondary school mathematics teacher focused on exam confidence and clear step-by-step methods.',
  },
  {
    id: 2,
    initials: 'YG',
    name: 'Yonas Girma',
    subjects: ['Mathematics', 'Physics'],
    grades: [6, 7, 8, 9, 10, 11, 12],
    modes: ['Online'],
    rating: 4.7,
    reviews: 21,
    experience: 4,
    price: 220,
    availability: 'Mon 17:00',
    verified: true,
    description:
      'Engineering graduate who explains concepts with real examples and practice sets.',
  },
  {
    id: 3,
    initials: 'MK',
    name: 'Meseret Kebede',
    subjects: ['Mathematics'],
    grades: [5, 6, 7, 8, 9],
    modes: ['In-person'],
    rating: 4.8,
    reviews: 15,
    experience: 5,
    price: 280,
    availability: 'Tue 16:30',
    verified: true,
    description:
      'Patient tutor for middle grades, with homework support and weekly progress notes.',
  },
  {
    id: 4,
    initials: 'BT',
    name: 'Biruk Tadesse',
    subjects: ['Mathematics'],
    grades: [6, 7, 8, 9],
    modes: ['Online'],
    rating: 4.5,
    reviews: 4,
    experience: 1,
    price: 150,
    availability: 'Wed 18:00',
    verified: false,
    description:
      'University student offering affordable lessons for Grades 6 to 9.',
  },
  {
    id: 5,
    initials: 'DA',
    name: 'Dawit Alemu',
    subjects: ['Physics', 'Chemistry'],
    grades: [9, 10, 11, 12],
    modes: ['Online', 'Hybrid'],
    rating: 4.8,
    reviews: 52,
    experience: 6,
    price: 320,
    availability: 'Thu 15:00',
    verified: true,
    description:
      'Science tutor helping students understand difficult topics and prepare for exams.',
  },
  {
    id: 6,
    initials: 'SB',
    name: 'Selam Bekele',
    subjects: ['English', 'Amharic'],
    grades: [0, 1, 2, 3, 4, 5, 6],
    modes: ['Online', 'In-person'],
    rating: 4.9,
    reviews: 27,
    experience: 5,
    price: 200,
    availability: 'Fri 14:00',
    verified: true,
    description:
      'Language tutor specializing in reading, writing and early learning.',
  },
];

function FindTutors() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('Any');
  const [grade, setGrade] = useState('');
  const [mode, setMode] = useState('Any');
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState('0');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearch(params.get('search') || '');
    setSubject(params.get('subject') || 'Any');
    setGrade(params.get('grade') || '');
    setMode(params.get('mode') || 'Any');
    setVerifiedOnly(params.get('verified') === 'true');
  }, [location.search]);

  const filteredTutors = useMemo(() => {
    const results = tutors.filter((tutor) => {
      const searchMatch = `${tutor.name} ${tutor.subjects.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const subjectMatch =
        subject === 'Any' || tutor.subjects.includes(subject);

      const gradeMatch = grade === '' || tutor.grades.includes(Number(grade));

      const modeMatch = mode === 'Any' || tutor.modes.includes(mode);

      const priceMatch = tutor.price <= maxPrice;
      const ratingMatch = tutor.rating >= Number(minRating);
      const verifiedMatch = !verifiedOnly || tutor.verified;

      return (
        searchMatch &&
        subjectMatch &&
        gradeMatch &&
        modeMatch &&
        priceMatch &&
        ratingMatch &&
        verifiedMatch
      );
    });

    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'experience') {
      results.sort((a, b) => b.experience - a.experience);
    }

    return results;
  }, [search, subject, grade, mode, maxPrice, minRating, verifiedOnly, sort]);

  function clearFilters() {
    setSearch('');
    setSubject('Any');
    setGrade('');
    setMode('Any');
    setMaxPrice(400);
    setMinRating('0');
    setVerifiedOnly(false);
    setSort('recommended');
  }

  function toggleSaved(id) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  return (
    <div className="app">
      <main className="find-page">
        <div className="find-heading">
          <span className="eyebrow">Find your learning partner</span>
          <h1>Find a tutor</h1>
          <p>
            Compare tutors by subject, grade, price and availability to find the
            right match.
          </p>
        </div>

        <div className="find-layout">
          <aside className="filter-panel">
            <div className="filter-title">
              <h2>Filters</h2>
              <button
                type="button"
                className="clear-btn"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>

            <label htmlFor="tutor-search">Search by name or subject</label>
            <input
              id="tutor-search"
              type="search"
              placeholder="e.g. Hanna, Mathematics"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <label htmlFor="subject-filter">Subject</label>
            <select
              id="subject-filter"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option>Any</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>Amharic</option>
            </select>

            <label htmlFor="grade-filter">Grade</label>
            <select
              id="grade-filter"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            >
              <option value="">Any grade</option>
              {Array.from({ length: 13 }, (_, index) => (
                <option key={index} value={index}>
                  Grade {index}
                </option>
              ))}
            </select>

            <label htmlFor="mode-filter">Learning mode</label>
            <select
              id="mode-filter"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
            >
              <option>Any</option>
              <option>Online</option>
              <option>In-person</option>
              <option>Hybrid</option>
            </select>

            <div className="filter-label-row">
              <label htmlFor="price-filter">Max price per hour</label>
              <strong>{maxPrice} ETB</strong>
            </div>
            <input
              id="price-filter"
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />

            <label htmlFor="rating-filter">Minimum rating</label>
            <select
              id="rating-filter"
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
            >
              <option value="0">Any rating</option>
              <option value="4">4.0+ stars</option>
              <option value="4.5">4.5+ stars</option>
              <option value="4.8">4.8+ stars</option>
            </select>

            <label className="verified-filter">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(event) => setVerifiedOnly(event.target.checked)}
              />
              Verified tutors only
            </label>
          </aside>

          <section className="results-panel">
            <div className="results-toolbar">
              <div>
                <h2>{filteredTutors.length} tutors found</h2>
                <p>Review each tutor's details before booking.</p>
              </div>

              <div className="sort-control">
                <label htmlFor="sort-filter">Sort by</label>
                <select
                  id="sort-filter"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest rating</option>
                  <option value="price-low">Lowest price</option>
                  <option value="price-high">Highest price</option>
                  <option value="experience">Most experience</option>
                </select>
              </div>
            </div>

            {filteredTutors.length === 0 ? (
              <div className="no-results">
                <h3>No tutors match your filters</h3>
                <p>Try changing the subject, grade, price or rating.</p>
                <button className="primary-btn" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="find-results">
                {filteredTutors.map((tutor) => (
                  <article className="find-tutor-card" key={tutor.id}>
                    <div className="find-avatar">{tutor.initials}</div>

                    <div className="find-tutor-info">
                      <div className="find-tutor-name">
                        <h3>{tutor.name}</h3>
                        {tutor.verified ? (
                          <span className="verified">✓ Verified</span>
                        ) : (
                          <span className="pending-badge">
                            Verification pending
                          </span>
                        )}
                      </div>

                      <p className="find-subject">
                        {tutor.subjects.join(', ')} ·{' '}
                        {tutor.modes.join(' and ')}
                      </p>

                      <p className="find-description">{tutor.description}</p>

                      <div className="find-meta">
                        <span>
                          ★ {tutor.rating} ({tutor.reviews})
                        </span>
                        <span>{tutor.experience} years experience</span>
                        <span>Next slot: {tutor.availability}</span>
                      </div>

                      <p className="match-note">
                        Subject, availability and price are shown to help you
                        compare tutors.
                      </p>

                      <div className="find-card-actions">
                        <button
                          className="primary-btn"
                          onClick={() => navigate(`/tutors/${tutor.id}`)}
                        >
                          View profile
                        </button>

                        <button
                          className="secondary-btn"
                          onClick={() => toggleSaved(tutor.id)}
                        >
                          {saved.includes(tutor.id)
                            ? '♥ Saved'
                            : '♡ Save tutor'}
                        </button>
                      </div>
                    </div>

                    <div className="find-price">
                      <strong>{tutor.price} ETB</strong>
                      <span>per hour</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FindTutors;
