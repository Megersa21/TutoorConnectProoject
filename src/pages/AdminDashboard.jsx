import { useState } from 'react';
import '../CssPages/AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: 'Dawit Alemu',
      subject: 'Mathematics',
      email: 'dawit@example.com',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Mekdes Tesfaye',
      subject: 'English',
      email: 'mekdes@example.com',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Samuel Bekele',
      subject: 'Physics',
      email: 'samuel@example.com',
      status: 'Verified',
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Abel Bekele', role: 'Learner', status: 'Active' },
    { id: 2, name: 'Sara Bekele', role: 'Learner', status: 'Active' },
    { id: 3, name: 'Dawit Alemu', role: 'Tutor', status: 'Active' },
    { id: 4, name: 'Mekdes Tesfaye', role: 'Tutor', status: 'Active' },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      learner: 'Abel Bekele',
      tutor: 'Samuel Bekele',
      subject: 'Physics',
      date: 'Oct 12, 2026',
      status: 'Confirmed',
    },
    {
      id: 2,
      learner: 'Sara Bekele',
      tutor: 'Mekdes Tesfaye',
      subject: 'English',
      date: 'Oct 13, 2026',
      status: 'Pending',
    },
    {
      id: 3,
      learner: 'Abel Bekele',
      tutor: 'Dawit Alemu',
      subject: 'Mathematics',
      date: 'Oct 14, 2026',
      status: 'Completed',
    },
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Missed tutoring session',
      submittedBy: 'Abel Bekele',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Incorrect booking details',
      submittedBy: 'Sara Bekele',
      status: 'Open',
    },
  ]);

  const [notice, setNotice] = useState('');

  function verifyTutor(id, approved) {
    const tutor = tutors.find((item) => item.id === id);
    if (!tutor) return;

    setTutors((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: approved ? 'Verified' : 'Rejected' }
          : item,
      ),
    );

    setNotice(
      `${tutor.name}'s application was ${approved ? 'approved' : 'rejected'}.`,
    );
  }

  function toggleUser(id) {
    const user = users.find((item) => item.id === id);
    if (!user) return;

    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';

    setUsers((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );

    setNotice(`${user.name}'s account is now ${newStatus.toLowerCase()}.`);
  }

  function updateBooking(id, status) {
    setBookings((previous) =>
      previous.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    setNotice(`Booking #${id} updated to ${status.toLowerCase()}.`);
  }

  function resolveReport(id) {
    setReports((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: 'Resolved' } : item,
      ),
    );
    setNotice('Report marked as resolved.');
  }

  const pendingTutors = tutors.filter(
    (tutor) => tutor.status === 'Pending',
  ).length;

  const activeBookings = bookings.filter(
    (booking) => booking.status === 'Pending' || booking.status === 'Confirmed',
  ).length;

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>TutorConnect</h2>
        <p className="admin-sidebar-label">ADMINISTRATION</p>

        {[
          ['overview', 'Overview'],
          ['tutors', 'Tutor Verification'],
          ['users', 'User Management'],
          ['bookings', 'Booking Management'],
          ['reports', 'Complaints & Reports'],
          ['settings', 'Platform Settings'],
        ].map(([tab, label]) => (
          <button
            key={tab}
            className={activeTab === tab ? 'admin-nav active' : 'admin-nav'}
            onClick={() => {
              setActiveTab(tab);
              setNotice('');
            }}
          >
            {label}
          </button>
        ))}
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">PLATFORM ADMINISTRATION</p>
            <h1>
              {activeTab === 'overview' && 'Admin Dashboard'}
              {activeTab === 'tutors' && 'Tutor Verification'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'bookings' && 'Booking Management'}
              {activeTab === 'reports' && 'Complaints & Reports'}
              {activeTab === 'settings' && 'Platform Settings'}
            </h1>
            <p>Monitor and manage the TutorConnect platform.</p>
          </div>
          <div className="admin-avatar">AD</div>
        </header>

        {notice && (
          <div className="admin-notice" role="status">
            {notice}
            <button onClick={() => setNotice('')}>Dismiss</button>
          </div>
        )}

        {activeTab === 'overview' && (
          <>
            <section className="admin-welcome">
              <p>ADMINISTRATOR WORKSPACE</p>
              <h2>Welcome to TutorConnect administration.</h2>
              <span>
                Review tutor applications, monitor bookings, and support users.
              </span>
            </section>

            <section className="admin-stats">
              <article className="admin-stat">
                <span>Total Users</span>
                <h2>{users.length}</h2>
                <p>Learners and tutors</p>
              </article>
              <article className="admin-stat">
                <span>Verified Tutors</span>
                <h2>{tutors.filter((t) => t.status === 'Verified').length}</h2>
                <p>Approved tutor profiles</p>
              </article>
              <article className="admin-stat">
                <span>Pending Applications</span>
                <h2>{pendingTutors}</h2>
                <p>Require review</p>
              </article>
              <article className="admin-stat">
                <span>Active Bookings</span>
                <h2>{activeBookings}</h2>
                <p>Pending or confirmed</p>
              </article>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Tutor Applications</h2>
                  <p>Review tutors waiting for verification.</p>
                </div>
                <button onClick={() => setActiveTab('tutors')}>View all</button>
              </div>

              {tutors.filter((t) => t.status === 'Pending').length === 0 ? (
                <p className="admin-empty">No applications awaiting review.</p>
              ) : (
                tutors
                  .filter((t) => t.status === 'Pending')
                  .map((tutor) => (
                    <article className="admin-list-row" key={tutor.id}>
                      <div className="admin-row-info">
                        <h3>{tutor.name}</h3>
                        <p>
                          {tutor.subject} · {tutor.email}
                        </p>
                      </div>
                      <span className="admin-status pending">Pending</span>
                    </article>
                  ))
              )}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Recent Bookings</h2>
                  <p>Check current tutoring activity.</p>
                </div>
                <button onClick={() => setActiveTab('bookings')}>
                  View all
                </button>
              </div>

              {bookings.slice(0, 3).map((booking) => (
                <article className="admin-list-row" key={booking.id}>
                  <div className="admin-row-info">
                    <h3>{booking.subject}</h3>
                    <p>
                      {booking.learner} with {booking.tutor} · {booking.date}
                    </p>
                  </div>
                  <span
                    className={`admin-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </article>
              ))}
            </section>
          </>
        )}

        {activeTab === 'tutors' && (
          <section className="admin-panel">
            <h2>Review Tutor Applications</h2>
            <p>Approve or reject sample tutor applications.</p>

            {tutors.map((tutor) => (
              <article className="admin-list-row" key={tutor.id}>
                <div className="admin-row-info">
                  <h3>{tutor.name}</h3>
                  <p>
                    {tutor.subject} · {tutor.email}
                  </p>
                  <span
                    className={`admin-status ${tutor.status.toLowerCase()}`}
                  >
                    {tutor.status}
                  </span>
                </div>

                {tutor.status === 'Pending' && (
                  <div className="admin-actions">
                    <button
                      className="admin-approve"
                      onClick={() => verifyTutor(tutor.id, true)}
                    >
                      Approve
                    </button>
                    <button
                      className="admin-reject"
                      onClick={() => verifyTutor(tutor.id, false)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        {activeTab === 'users' && (
          <section className="admin-panel">
            <h2>Registered Users</h2>
            <p>Manage the sample learner and tutor accounts.</p>

            {users.map((user) => (
              <article className="admin-list-row" key={user.id}>
                <div className="admin-row-info">
                  <h3>{user.name}</h3>
                  <p>{user.role}</p>
                  <span className={`admin-status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </div>
                <button
                  className={
                    user.status === 'Active' ? 'admin-reject' : 'admin-approve'
                  }
                  onClick={() => toggleUser(user.id)}
                >
                  {user.status === 'Active' ? 'Suspend' : 'Reactivate'}
                </button>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'bookings' && (
          <section className="admin-panel">
            <h2>All Bookings</h2>
            <p>Monitor booking status in the demo platform.</p>

            {bookings.map((booking) => (
              <article className="admin-list-row" key={booking.id}>
                <div className="admin-row-info">
                  <h3>{booking.subject}</h3>
                  <p>
                    {booking.learner} with {booking.tutor}
                  </p>
                  <p>{booking.date}</p>
                  <span
                    className={`admin-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </div>

                {booking.status !== 'Completed' &&
                  booking.status !== 'Cancelled' && (
                    <div className="admin-actions">
                      <button
                        className="admin-approve"
                        onClick={() => updateBooking(booking.id, 'Completed')}
                      >
                        Complete
                      </button>
                      <button
                        className="admin-reject"
                        onClick={() => updateBooking(booking.id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </article>
            ))}
          </section>
        )}

        {activeTab === 'reports' && (
          <section className="admin-panel">
            <h2>Complaints & Reports</h2>
            <p>Review sample issues submitted by platform users.</p>

            {reports.map((report) => (
              <article className="admin-list-row" key={report.id}>
                <div className="admin-row-info">
                  <h3>{report.title}</h3>
                  <p>Reported by {report.submittedBy}</p>
                  <span
                    className={`admin-status ${report.status.toLowerCase()}`}
                  >
                    {report.status}
                  </span>
                </div>
                {report.status === 'Open' && (
                  <button
                    className="admin-approve"
                    onClick={() => resolveReport(report.id)}
                  >
                    Mark Resolved
                  </button>
                )}
              </article>
            ))}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="admin-panel">
            <h2>Platform Settings</h2>
            <p>
              These are planning placeholders for the future backend. They do
              not change live platform settings.
            </p>
            <div className="admin-setting-row">
              <div>
                <h3>Tutor verification</h3>
                <p>Require administrator review of new tutor profiles.</p>
              </div>
              <span className="admin-status verified">Planned</span>
            </div>
            <div className="admin-setting-row">
              <div>
                <h3>Booking notifications</h3>
                <p>Notify users about booking status changes.</p>
              </div>
              <span className="admin-status verified">Planned</span>
            </div>
            <div className="admin-setting-row">
              <div>
                <h3>Payment integration</h3>
                <p>Connect a payment provider after backend setup.</p>
              </div>
              <span className="admin-status pending">Not connected</span>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
