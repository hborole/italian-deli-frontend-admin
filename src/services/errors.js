const errors = (errs) => {
  if (!errs.length > 0) return;

  return (
    <div className="alert alert-danger" role="alert">
      {errs.map((err) => (
        <>
          <div key={err.message}>{err.message}</div>
          {err.field && <div key={err.field}>{err.field}</div>}
        </>
      ))}
    </div>
  );
};

export default errors;
