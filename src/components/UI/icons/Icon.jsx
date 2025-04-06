const Icon = ({
  name,
  width = 24,
  height = 24,
  className = "",
  color = "currentColor",
  viewBox = "0 0 24 24", // 👈 Add default viewBox
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={color}
      viewBox={viewBox}
      aria-hidden="true"
      {...props}
    >
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
