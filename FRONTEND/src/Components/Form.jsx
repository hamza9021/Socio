const Form = ({ onSubmit, children, className = "" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit}  className={className}>
      {children}
    </form>
  );
};

export default Form;