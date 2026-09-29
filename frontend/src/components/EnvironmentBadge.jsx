function EnvironmentBadge({ environment }) {
  return (
    <span
      className={`environment environment-${environment}`}
    >
      <span className="environment-dot" />
      {environment}
    </span>
  );
}

export default EnvironmentBadge;