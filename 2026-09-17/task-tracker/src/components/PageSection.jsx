export function PageSection({ title, children }) {
  return (
    <section className="page-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-content">{children}</div>
    </section>
  );
}
