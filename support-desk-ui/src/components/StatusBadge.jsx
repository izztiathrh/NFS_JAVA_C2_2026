function StatusBadge({ status }) {
  const label = status.replace('_', ' ');                     // no .toLowerCase()
  const className = `badge status-${status.toLowerCase().replace('_', '-')}`;  // underscore → hyphen
  return <span className={className}>{label}</span>;
}

export default StatusBadge;
