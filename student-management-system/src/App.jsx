import { useEffect, useMemo, useState } from 'react';
import { BookOpen, GraduationCap, Search, Plus, Pencil, Trash2, Users, UserCheck, UserRoundX, ChevronDown, X, CheckCircle2 } from 'lucide-react';
import StudentModal from './components/StudentModal.jsx';

const starterStudents = [
  { id: '902061', fullName: 'Teboho Mokoena', age: 21, email: 'teboho.mokoena@example.com', course: 'Information Technology', status: 'Enrolled' },
  { id: '902062', fullName: 'Relebohile Khati', age: 22, email: 'relebohile.khati@example.com', course: 'Business Information Technology', status: 'Enrolled' },
  { id: '902063', fullName: 'Ntsoaki Ramathe', age: 20, email: 'ntsoaki.ramathe@example.com', course: 'Multimedia Design', status: 'Inactive' },
  { id: '902064', fullName: 'Reaboka Thamae', age: 23, email: 'reaboka.thamae@example.com', course: 'Information Technology', status: 'Enrolled' }
];

export default function App() {
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem('campus-desk-students');
      return savedStudents ? JSON.parse(savedStudents) : starterStudents;
    } catch {
      return starterStudents;
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [modalStudent, setModalStudent] = useState(undefined);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem('campus-desk-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const visibleStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = [student.id, student.fullName, student.email, student.course].some((value) => value.toLowerCase().includes(search));
      return matchesSearch && (statusFilter === 'All statuses' || student.status === statusFilter);
    });
  }, [students, searchTerm, statusFilter]);

  const enrolledCount = students.filter((student) => student.status === 'Enrolled').length;
  const inactiveCount = students.filter((student) => student.status === 'Inactive').length;

  const saveStudent = (student) => {
    if (modalStudent) {
      setStudents((current) => current.map((item) => item.id === modalStudent.id ? student : item));
      setNotice('Student details updated.');
    } else {
      setStudents((current) => [...current, student]);
      setNotice('Student added successfully.');
    }
    setModalStudent(undefined);
  };

  const confirmDelete = () => {
    setStudents((current) => current.filter((student) => student.id !== studentToDelete.id));
    setNotice(`${studentToDelete.fullName} was removed.`);
    setStudentToDelete(null);
  };

  const openAddModal = () => setModalStudent(null);
  const openEditModal = (student) => setModalStudent(student);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><GraduationCap size={23} /></div><div><strong>Campus Desk</strong><span>STUDENT SERVICES</span></div></div>
        <div className="side-label">WORKSPACE</div>
        <button className="nav-item active"><BookOpen size={18} /><span>Student records</span></button>
        <div className="sidebar-note"><div className="note-icon"><Users size={18} /></div><strong>Keep things organised.</strong><p>A simple place to manage student information and enrollment status.</p></div>
        <div className="sidebar-bottom"><span className="avatar-small">CD</span><div><strong>Student Admin</strong><span>Local workspace</span></div><ChevronDown size={15} /></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Student records</strong></div><div className="topbar-right"><span className="online-dot" /> Changes save on this device</div></header>
        <div className="page-content">
          <section className="welcome-row"><div><p className="eyebrow">STUDENT SERVICES / OVERVIEW</p><h1>Student management</h1><p className="page-subtitle">A clear view of student records, all in one place.</p></div><button className="button button-primary add-top" onClick={openAddModal}><Plus size={18} /> Add student</button></section>

          <section className="stats-grid" aria-label="Student summary">
            <div className="stat-card"><div className="stat-icon burgundy"><Users size={20} /></div><div className="stat-label">Total students</div><div className="stat-bottom"><strong>{students.length}</strong><span>All records</span></div></div>
            <div className="stat-card"><div className="stat-icon sage"><UserCheck size={20} /></div><div className="stat-label">Enrolled</div><div className="stat-bottom"><strong>{enrolledCount}</strong><span>Currently active</span></div></div>
            <div className="stat-card"><div className="stat-icon rose"><UserRoundX size={20} /></div><div className="stat-label">Inactive</div><div className="stat-bottom"><strong>{inactiveCount}</strong><span>Not currently enrolled</span></div></div>
          </section>

          <section className="records-panel">
            <div className="panel-heading"><div><h2>Student records</h2><p>View and update student details.</p></div><span className="record-count">{students.length} {students.length === 1 ? 'record' : 'records'}</span></div>
            <div className="toolbar"><label className="search-box"><Search size={17} /><input aria-label="Search students" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name, ID, email or course" />{searchTerm && <button aria-label="Clear search" className="clear-search" onClick={() => setSearchTerm('')}><X size={15} /></button>}</label><select className="filter-select" aria-label="Filter by enrollment status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Enrolled</option><option>Inactive</option><option>Graduated</option></select></div>
            <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>COURSE OF STUDY</th><th>AGE</th><th>STATUS</th><th className="actions-heading">ACTIONS</th></tr></thead><tbody>
              {visibleStudents.map((student) => <tr key={student.id}><td><div className="student-cell"><span className="student-avatar">{student.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span><div><strong>{student.fullName}</strong><span>{student.email}</span></div></div></td><td><span className="student-id">{student.id}</span></td><td><span className="course-name">{student.course}</span></td><td>{student.age}</td><td><span className={`status-pill ${student.status.toLowerCase()}`}><span />{student.status}</span></td><td><div className="row-actions"><button className="action-button" title={`Edit ${student.fullName}`} aria-label={`Edit ${student.fullName}`} onClick={() => openEditModal(student)}><Pencil size={16} /></button><button className="action-button delete-action" title={`Delete ${student.fullName}`} aria-label={`Delete ${student.fullName}`} onClick={() => setStudentToDelete(student)}><Trash2 size={16} /></button></div></td></tr>)}
              {visibleStudents.length === 0 && <tr><td colSpan="6"><div className="empty-state"><div className="empty-icon"><Search size={23} /></div><strong>{students.length === 0 ? 'No students yet' : 'No matching students'}</strong><p>{students.length === 0 ? 'Add your first student to get started.' : 'Try a different search or status filter.'}</p>{students.length === 0 && <button className="button button-primary" onClick={openAddModal}><Plus size={17} /> Add student</button>}</div></td></tr>}
            </tbody></table></div>
            <div className="table-footer"><span>Showing <strong>{visibleStudents.length}</strong> of <strong>{students.length}</strong> students</span><span className="footer-note"><CheckCircle2 size={14} /> Data saved in this browser</span></div>
          </section>
          <footer className="page-footer"><span>Campus Desk <span className="footer-dot">·</span> Student Management System</span><span>Made for learning, one record at a time.</span></footer>
        </div>
      </main>

      {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}<button aria-label="Dismiss message" onClick={() => setNotice('')}><X size={15} /></button></div>}
      {modalStudent !== undefined && <StudentModal student={modalStudent} students={students} onClose={() => setModalStudent(undefined)} onSave={saveStudent} />}
      {studentToDelete && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setStudentToDelete(null); }}><section className="modal delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><div className="delete-icon"><Trash2 size={22} /></div><button className="icon-button delete-close" aria-label="Close dialog" onClick={() => setStudentToDelete(null)}><X size={19} /></button><h2 id="delete-title">Delete this student?</h2><p className="muted">You are about to remove <strong>{studentToDelete.fullName}</strong> ({studentToDelete.id}). This action cannot be undone.</p><div className="modal-actions"><button className="button button-light" onClick={() => setStudentToDelete(null)}>Cancel</button><button className="button button-danger" onClick={confirmDelete}><Trash2 size={16} /> Confirm delete</button></div></section></div>}
    </div>
  );
}
