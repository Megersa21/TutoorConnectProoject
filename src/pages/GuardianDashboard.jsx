import { useState } from 'react';
import '../CssPages/GuardianDashboard.css';

function GuardianDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const learners = [
    {
      id: 1,
      name: 'Abel Bekele',
      grade: 'Grade 8',
      subjects: 'Mathematics, Physics',
    },
    {
      id: 2,
      name: 'Sara Bekele',
      grade: 'Grade 6',
      subjects: 'English, Biology',
    },
  ];

  const sessions = [
    {
      id: 1,
      learner: 'Abel Bekele',
      tutor: 'Dawit Alemu',
      subject: 'Mathematics',
      date: 'Oct 12, 2026',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      learner: 'Sara Bekele',
      tutor: 'Mekdes Tesfaye',
      subject: 'English',
      date: 'Oct 13, 2026',
      time: '2:00 PM',
      status: 'Pending',
    },
  ];

  const [requests, setRequests] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('tutorConnectBookings') || '[]');
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState([
    'Your Mathematics session has been confirmed.',
    'A new English tutoring request is awaiting approval.',
    "Remember to review your learner's weekly progress.",
  ]);

  function handleRequest(id, approved) {
    const request = requests.find((item) => item.id === id);

    if (!request) return;

    const updatedBookings = requests.map((item) =>
      item.id === id
        ? {
            ...item,
            status: approved ? 'Confirmed' : 'Declined',
          }
        : item,
    );

    setRequests(updatedBookings);

    sessionStorage.setItem(
      'tutorConnectBookings',
      JSON.stringify(updatedBookings),
    );

    setNotifications((previous) => [
      `${request.subject} booking with ${request.tutorName} ${
        approved ? 'confirmed' : 'declined'
      }.`,
      ...previous,
    ]);
  }

  return (
    <main className="guardian-dashboard">
      <aside className="guardian-sidebar">
        <h2>TutorConnect</h2>
        <p className="guardian-sidebar-label">PARENT PORTAL</p>

        <button
          className={
            activeTab === 'overview' ? 'guardian-nav active' : 'guardian-nav'
          }
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>

        <button
          className={
            activeTab === 'learners' ? 'guardian-nav active' : 'guardian-nav'
          }
          onClick={() => setActiveTab('learners')}
        >
          Learner Profiles
        </button>

        <button
          className={
            activeTab === 'sessions' ? 'guardian-nav active' : 'guardian-nav'
          }
          onClick={() => setActiveTab('sessions')}
        >
          Upcoming Sessions
        </button>

        <button
          className={
            activeTab === 'requests' ? 'guardian-nav active' : 'guardian-nav'
          }
          onClick={() => setActiveTab('requests')}
        >
          Booking Approvals
        </button>

        <button
          className={
            activeTab === 'notifications'
              ? 'guardian-nav active'
              : 'guardian-nav'
          }
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </aside>

      <section className="guardian-main">
        <header className="guardian-header">
          <div>
            <p className="guardian-eyebrow">PARENT / GUARDIAN</p>
            <h1>Guardian Dashboard</h1>
            <p>Manage your children's learning in one place.</p>
          </div>

          <div className="guardian-avatar">GB</div>
        </header>

        {activeTab === 'overview' && (
          <>
            <section className="guardian-welcome">
              <div>
                <p>WELCOME BACK</p>
                <h2>Your children's learning journey</h2>
                <span>Track sessions, manage bookings, and stay informed.</span>
              </div>
              <div className="guardian-welcome-icon">🎓</div>
            </section>

            <section className="guardian-stats">
              <article className="guardian-stat">
                <span>Learners</span>
                <h2>{learners.length}</h2>
                <p>Registered profiles</p>
              </article>

              <article className="guardian-stat">
                <span>Upcoming Sessions</span>
                <h2>
                  {sessions.filter((s) => s.status === 'Confirmed').length}
                </h2>
                <p>Confirmed sessions</p>
              </article>

              <article className="guardian-stat">
                <span>Booking Requests</span>
                <h2>{requests.length}</h2>
                <p>Awaiting your decision</p>
              </article>

              <article className="guardian-stat">
                <span>Notifications</span>
                <h2>{notifications.length}</h2>
                <p>Recent updates</p>
              </article>
            </section>

            <section className="guardian-panel">
              <div className="guardian-panel-heading">
                <div>
                  <h2>Upcoming Sessions</h2>
                  <p>Your children's next tutoring sessions.</p>
                </div>
                <button onClick={() => setActiveTab('sessions')}>
                  View all
                </button>
              </div>

              {sessions.map((session) => (
                <article className="guardian-session" key={session.id}>
                  <div className="guardian-session-date">
                    <span>{session.date.split(' ')[0]}</span>
                    <strong>
                      {session.date.split(' ')[1].replace(',', '')}
                    </strong>
                  </div>

                  <div className="guardian-session-info">
                    <h3>{session.subject}</h3>
                    <p>
                      {session.learner} · Tutor: {session.tutor}
                    </p>
                    <span>{session.time}</span>
                  </div>

                  <span
                    className={`guardian-status ${session.status.toLowerCase()}`}
                  >
                    {session.status}
                  </span>
                </article>
              ))}
            </section>

            <section className="guardian-panel">
              <div className="guardian-panel-heading">
                <div>
                  <h2>Booking Approvals</h2>
                  <p>Review pending tutoring requests.</p>
                </div>
                <button onClick={() => setActiveTab('requests')}>
                  Review requests
                </button>
              </div>

              {requests.length === 0 ? (
                <p className="guardian-empty">No pending requests.</p>
              ) : (
                requests.map((request) => (
                  <article className="guardian-request" key={request.id}>
                    <div>
                      <h3>{request.subject}</h3>
                      <p>
                        {request.learner} · {request.tutorName || request.tutor}
                      </p>
                    </div>
                    <div className="guardian-request-actions">
                      {request.status === 'Pending' ? (
                        <>
                          <button
                            className="guardian-approve"
                            onClick={() => handleRequest(request.id, true)}
                          >
                            Approve
                          </button>

                          <button
                            className="guardian-decline"
                            onClick={() => handleRequest(request.id, false)}
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span
                          className={`guardian-status ${request.status.toLowerCase()}`}
                        >
                          {request.status}
                        </span>
                      )}
                    </div>
                  </article>
                ))
              )}
            </section>
          </>
        )}

        {activeTab === 'learners' && (
          <section className="guardian-panel">
            <h2>Learner Profiles</h2>
            <p>View your children's learning information.</p>

            <div className="guardian-learner-grid">
              {learners.map((learner) => (
                <article className="guardian-learner-card" key={learner.id}>
                  <div className="guardian-learner-avatar">
                    {learner.name.charAt(0)}
                  </div>
                  <h3>{learner.name}</h3>
                  <p>{learner.grade}</p>
                  <span>{learner.subjects}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'sessions' && (
          <section className="guardian-panel">
            <h2>Upcoming Sessions</h2>
            <p>Review scheduled tutoring sessions.</p>

            {sessions.map((session) => (
              <article className="guardian-session" key={session.id}>
                <div className="guardian-session-info">
                  <h3>{session.subject}</h3>
                  <p>
                    {session.learner} · Tutor: {session.tutor}
                  </p>
                  <span>
                    {session.date} · {session.time}
                  </span>
                </div>
                <span
                  className={`guardian-status ${session.status.toLowerCase()}`}
                >
                  {session.status}
                </span>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'requests' && (
          <section className="guardian-panel">
            <h2>Booking Approvals</h2>
            <p>Approve or decline the sample booking requests.</p>

            {requests.length === 0 ? (
              <p className="guardian-empty">No pending requests.</p>
            ) : (
              requests.map((request) => (
                <article className="guardian-request" key={request.id}>
                  <div>
                    <h3>{request.subject}</h3>
                    <p>
                      {request.learner} · {request.tutorName}
                    </p>
                  </div>
                  <div className="guardian-request-actions">
                    {request.status === 'Pending' ? (
                      <>
                        <button
                          className="guardian-approve"
                          onClick={() => handleRequest(request.id, true)}
                        >
                          Approve
                        </button>

                        <button
                          className="guardian-decline"
                          onClick={() => handleRequest(request.id, false)}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span
                        className={`guardian-status ${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    )}
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="guardian-panel">
            <h2>Notifications</h2>
            <p>Updates about tutoring activities.</p>

            {notifications.length === 0 ? (
              <p className="guardian-empty">No notifications.</p>
            ) : (
              notifications.map((notification, index) => (
                <article className="guardian-notification" key={index}>
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

export default GuardianDashboard;
