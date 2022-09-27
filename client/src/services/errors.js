const errors = (errs) => {
  if (!errs.length > 0) return;

  return (
    <div className="alert alert-danger" role="alert">
      {errs.map((err, index) => (
        <div key={index}>{err.message}</div>
      ))}
    </div>
  );
};

export default errors;
