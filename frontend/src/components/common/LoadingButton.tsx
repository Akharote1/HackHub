import { Button } from "react-bootstrap";

const LoadingButton = ({
  onClick = null,
  disabled = false,
  children,
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      disabled={disabled}
      className={"d-flex justify-content-center align-items-center " + className}
      {...props}
    >
      {loading && (
        <div className="btn-loader position-absolute mx-auto" />
      )}
      <span
        className={loading ? 'opacity-0' : 'opacity-100'}
      >
        {children}
      </span>
    </Button>
  )
}

export default LoadingButton;