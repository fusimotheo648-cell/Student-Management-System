import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyForm = { id: '', fullName: '', age: '', email: '', course: '', status: 'Enrolled' };

export default function StudentModal({ student, students, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(student ? { ...student, age: String(student.age) } : emptyForm);
    setErrors({});
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!form.id.trim()) nextErrors.id = 'Enter a student ID.';
    if (!form.fullName.trim()) nextErrors.fullName = 'Enter the student’s full name.';
    if (!form.age.trim() || !Number.isFinite(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) nextErrors.age = 'Enter an age from 1 to 120.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!form.course.trim()) nextErrors.course = 'Enter the course of study.';
    const duplicateId = students.some((item) => item.id.toLowerCase() === form.id.trim().toLowerCase() && item.id !== student?.id);
    if (duplicateId) nextErrors.id = 'This student ID is already being used.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    onSave({ ...form, id: form.id.trim(), fullName: form.fullName.trim(), age: Number(form.age), email: form.email.trim(), course: form.course.trim() });
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div><p className="eyebrow">STUDENT RECORD</p><h2 id="modal-title">{student ? 'Edit student' : 'Add a student'}</h2><p className="muted">Fill in the details below.</p></div>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>Student ID<input name="id" value={form.id} onChange={handleChange} placeholder="e.g. ST001" />{errors.id && <span className="field-error">{errors.id}</span>}</label>
            <label>Full name<input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" />{errors.fullName && <span className="field-error">{errors.fullName}</span>}</label>
            <label>Age<input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} placeholder="e.g. 21" />{errors.age && <span className="field-error">{errors.age}</span>}</label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />{errors.email && <span className="field-error">{errors.email}</span>}</label>
            <label className="full-width">Course of study<input name="course" value={form.course} onChange={handleChange} placeholder="e.g. Information Technology" />{errors.course && <span className="field-error">{errors.course}</span>}</label>
            <label className="full-width">Enrollment status<select name="status" value={form.status} onChange={handleChange}><option>Enrolled</option><option>Inactive</option><option>Graduated</option></select></label>
          </div>
          <div className="modal-actions"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{student ? 'Save changes' : 'Add student'}</button></div>
        </form>
      </section>
    </div>
  );
}
