// const Icon = ({ name, size = 24, color = "currentColor", ...props }) => (
//   <svg width={size} height={size} fill={color} {...props}>
//     <use xlinkHref={`#${name}`} />
//   </svg>
// );

// export default Icon;

const Icon = ({
  name,
  width = 24,
  height = 24,
  className = "",
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={color}
      aria-hidden="true"
      {...props}
    >
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
