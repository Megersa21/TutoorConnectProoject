import { useEffect, useState } from 'react';
import '../CssPages/TutorDashboard.css';

function TutorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const [sessions, setSessions] = useState([
    {
      id: 1,
      learner: 'Abel Bekele',
      subject: 'Mathematics',
      date: 'Oct 12, 2026',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      learner: 'Sara Bekele',
      subject: 'Physics',
      date: 'Oct 13, 2026',
      time: '2:00 PM',
      status: 'Pending',
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      learner: 'Abel Bekele',
      subject: 'Mathematics',
      date: 'Oct 14, 2026',
      time: '11:00 AM',
    },
    {
      id: 2,
      learner: 'Sara Bekele',
      subject: 'Physics',
      date: 'Oct 15, 2026',
      time: '3:00 PM',
    },
  ]);

  const [notifications, setNotifications] = useState([
    'Your tutor profile is ready to manage.',
    'You have two new booking requests.',
    'Remember to update your weekly availability.',
  ]);

  const [availability, setAvailability] = useState(() => {
    try {
      const savedAvailability = localStorage.getItem(
        'tutorConnectAvailability',
      );

      if (savedAvailability) {
        return JSON.parse(savedAvailability);
      }
    } catch (error) {
      console.error('Could not load availability:', error);
    }

    return [
      { day: 'Monday', enabled: true },
      { day: 'Tuesday', enabled: true },
      { day: 'Wednesday', enabled: false },
      { day: 'Thursday', enabled: true },
      { day: 'Friday', enabled: true },
      { day: 'Saturday', enabled: false },
      { day: 'Sunday', enabled: false },
    ];
  });
  const [hourlyRate, setHourlyRate] = useState('500');
  const [subjects, setSubjects] = useState('Mathematics, Physics');
  const [bio, setBio] = useState(
    'I help learners understand difficult concepts through clear explanations and practice.',
  );
  useEffect(() => {
    try {
      const savedProfile = JSON.parse(
        localStorage.getItem('tutorConnectProfile') || 'null',
      );

      if (savedProfile) {
        setHourlyRate(savedProfile.hourlyRate ?? '500');
        setSubjects(savedProfile.subjects ?? 'Mathematics, Physics');
        setBio(
          savedProfile.bio ??
            'I help learners understand difficult concepts through clear explanations and practice.',
        );
      }
    } catch (error) {
      console.error('Could not load tutor profile:', error);
    }
  }, []);
  const [profileMessage, setProfileMessage] = useState('');

  function handleRequest(id, approved) {
    const request = requests.find((item) => item.id === id);

    if (!request) return;

    if (approved) {
      setSessions((previous) => [
        ...previous,
        {
          ...request,
          id: Date.now(),
          status: 'Confirmed',
        },
      ]);
    }

    setNotifications((previous) => [
      `${request.subject} request from ${request.learner} was ${
        approved ? 'accepted' : 'declined'
      }.`,
      ...previous,
    ]);

    setRequests((previous) => previous.filter((item) => item.id !== id));
  }

  function toggleAvailability(day) {
    setAvailability((previous) => {
      const updatedAvailability = previous.map((item) =>
        item.day === day ? { ...item, enabled: !item.enabled } : item,
      );

      try {
        localStorage.setItem(
          'tutorConnectAvailability',
          JSON.stringify(updatedAvailability),
        );
      } catch (error) {
        console.error('Could not save availability:', error);
      }

      return updatedAvailability;
    });
  }

  function saveProfile(event) {
    event.preventDefault();

    const profile = {
      subjects,
      hourlyRate,
      bio,
    };

    try {
      localStorage.setItem('tutorConnectProfile', JSON.stringify(profile));

      setProfileMessage('Your profile has been saved successfully.');

      setNotifications((previous) => [
        'You updated your tutor profile.',
        ...previous,
      ]);
    } catch (error) {
      setProfileMessage('Could not save your profile. Please try again.');
      console.error('Could not save tutor profile:', error);
    }
  }

  return (
    <main className="tutor-dashboard">
      <aside className="tutor-sidebar">
        <h2>TutorConnect</h2>
        <p className="tutor-sidebar-label">TUTOR PORTAL</p>

        <button
          className={
            activeTab === 'overview' ? 'tutor-nav active' : 'tutor-nav'
          }
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>

        <button
          className={
            activeTab === 'sessions' ? 'tutor-nav active' : 'tutor-nav'
          }
          onClick={() => setActiveTab('sessions')}
        >
          My Sessions
        </button>

        <button
          className={
            activeTab === 'requests' ? 'tutor-nav active' : 'tutor-nav'
          }
          onClick={() => setActiveTab('requests')}
        >
          Booking Requests
          {requests.length > 0 && (
            <span className="tutor-nav-count">{requests.length}</span>
          )}
        </button>

        <button
          className={
            activeTab === 'availability' ? 'tutor-nav active' : 'tutor-nav'
          }
          onClick={() => setActiveTab('availability')}
        >
          Availability
        </button>

        <button
          className={activeTab === 'profile' ? 'tutor-nav active' : 'tutor-nav'}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>

        <button
          className={
            activeTab === 'notifications' ? 'tutor-nav active' : 'tutor-nav'
          }
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </aside>

      <section className="tutor-main">
        <header className="tutor-header">
          <div>
            <p className="tutor-eyebrow">TUTOR WORKSPACE</p>
            <h1>
              {activeTab === 'overview'
                ? 'Tutor Dashboard'
                : activeTab === 'sessions'
                  ? 'My Sessions'
                  : activeTab === 'requests'
                    ? 'Booking Requests'
                    : activeTab === 'availability'
                      ? 'Manage Availability'
                      : activeTab === 'profile'
                        ? 'My Profile'
                        : 'Notifications'}
            </h1>
            <p>Manage your teaching activities in one place.</p>
          </div>

          <div className="tutor-avatar">TA</div>
        </header>

        {activeTab === 'overview' && (
          <>
            <section className="tutor-welcome">
              <div>
                <p>WELCOME BACK, TUTOR</p>
                <h2>Make a difference in every lesson.</h2>
                <span>Manage your sessions and help learners succeed.</span>
              </div>
              <span className="tutor-welcome-icon">🎓</span>
            </section>

            <section className="tutor-stats">
              <article className="tutor-stat">
                <span>Total Sessions</span>
                <h2>{sessions.length}</h2>
                <p>Scheduled sessions</p>
              </article>

              <article className="tutor-stat">
                <span>Booking Requests</span>
                <h2>{requests.length}</h2>
                <p>Awaiting your response</p>
              </article>

              <article className="tutor-stat">
                <span>Teaching Days</span>
                <h2>{availability.filter((day) => day.enabled).length}</h2>
                <p>Available days per week</p>
              </article>

              <article className="tutor-stat">
                <span>Hourly Rate</span>
                <h2>{Number(hourlyRate || 0).toLocaleString()}</h2>
                <p>Sample rate in ETB</p>
              </article>
            </section>

            <section className="tutor-panel">
              <div className="tutor-panel-heading">
                <div>
                  <h2>Upcoming Sessions</h2>
                  <p>Keep track of your scheduled lessons.</p>
                </div>
                <button onClick={() => setActiveTab('sessions')}>
                  View all
                </button>
              </div>

              {sessions.length === 0 ? (
                <p className="tutor-empty">No sessions scheduled yet.</p>
              ) : (
                sessions.map((session) => (
                  <article className="tutor-session" key={session.id}>
                    <div className="tutor-session-icon">📘</div>
                    <div className="tutor-session-info">
                      <h3>{session.subject}</h3>
                      <p>Learner: {session.learner}</p>
                      <span>
                        {session.date} · {session.time}
                      </span>
                    </div>
                    <span
                      className={`tutor-status ${session.status.toLowerCase()}`}
                    >
                      {session.status}
                    </span>
                  </article>
                ))
              )}
            </section>

            <section className="tutor-panel">
              <div className="tutor-panel-heading">
                <div>
                  <h2>New Booking Requests</h2>
                  <p>Respond to learners who want your help.</p>
                </div>
                <button onClick={() => setActiveTab('requests')}>
                  View requests
                </button>
              </div>

              {requests.length === 0 ? (
                <p className="tutor-empty">No pending booking requests.</p>
              ) : (
                requests.map((request) => (
                  <article className="tutor-request" key={request.id}>
                    <div>
                      <h3>{request.subject}</h3>
                      <p>
                        {request.learner} · {request.date} · {request.time}
                      </p>
                    </div>
                    <div className="tutor-request-actions">
                      <button
                        className="tutor-accept"
                        onClick={() => handleRequest(request.id, true)}
                      >
                        Accept
                      </button>
                      <button
                        className="tutor-decline"
                        onClick={() => handleRequest(request.id, false)}
                      >
                        Decline
                      </button>
                    </div>
                  </article>
                ))
              )}
            </section>
          </>
        )}

        {activeTab === 'sessions' && (
          <section className="tutor-panel">
            <h2>My Sessions</h2>
            <p>View your current scheduled tutoring sessions.</p>

            {sessions.length === 0 ? (
              <p className="tutor-empty">No sessions scheduled yet.</p>
            ) : (
              sessions.map((session) => (
                <article className="tutor-session" key={session.id}>
                  <div className="tutor-session-icon">📘</div>
                  <div className="tutor-session-info">
                    <h3>{session.subject}</h3>
                    <p>Learner: {session.learner}</p>
                    <span>
                      {session.date} · {session.time}
                    </span>
                  </div>
                  <span
                    className={`tutor-status ${session.status.toLowerCase()}`}
                  >
                    {session.status}
                  </span>
                </article>
              ))
            )}
          </section>
        )}

        {activeTab === 'requests' && (
          <section className="tutor-panel">
            <h2>Booking Requests</h2>
            <p>Accept or decline the sample requests.</p>

            {requests.length === 0 ? (
              <p className="tutor-empty">No pending requests.</p>
            ) : (
              requests.map((request) => (
                <article className="tutor-request" key={request.id}>
                  <div>
                    <h3>{request.subject}</h3>
                    <p>
                      {request.learner} · {request.date} · {request.time}
                    </p>
                  </div>
                  <div className="tutor-request-actions">
                    <button
                      className="tutor-accept"
                      onClick={() => handleRequest(request.id, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="tutor-decline"
                      onClick={() => handleRequest(request.id, false)}
                    >
                      Decline
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {activeTab === 'availability' && (
          <section className="tutor-panel">
            <h2>Weekly Availability</h2>
            <p>Select the days when learners can request sessions.</p>

            <div className="tutor-availability-list">
              {availability.map((item) => (
                <label className="tutor-availability-day" key={item.day}>
                  <span>{item.day}</span>
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => toggleAvailability(item.day)}
                  />
                  <span>{item.enabled ? 'Available' : 'Unavailable'}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section className="tutor-panel">
            <h2>My Teaching Profile</h2>
            <p>Update the information learners see about you.</p>

            <form className="tutor-profile-form" onSubmit={saveProfile}>
              <label>
                Tutor name
                <input type="text" defaultValue="Tutor Alemu" />
              </label>

              <label>
                Subjects you teach
                <input
                  type="text"
                  value={subjects}
                  onChange={(event) => setSubjects(event.target.value)}
                  required
                />
              </label>

              <label>
                Hourly rate (ETB)
                <input
                  type="number"
                  min="1"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  required
                />
              </label>

              <label>
                Teaching introduction
                <textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows="5"
                  required
                />
              </label>

              <button type="submit" className="tutor-save-button">
                Save Profile
              </button>

              {profileMessage && (
                <p className="tutor-success-message">{profileMessage}</p>
              )}
            </form>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="tutor-panel">
            <h2>Notifications</h2>
            <p>Updates about your tutoring activities.</p>

            {notifications.length === 0 ? (
              <p className="tutor-empty">No notifications.</p>
            ) : (
              notifications.map((notification, index) => (
                <article className="tutor-notification" key={index}>
                  <span>🔔</span>
                  <p>{notification}</p>
                </article>
              ))
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default TutorDashboard;
