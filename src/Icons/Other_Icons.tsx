const defaultValues = {
  dimension: 24,
  color: "currentColor",
};
export function IssueIcon({
  dimension = defaultValues.dimension,
  color = defaultValues.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8"
      ></path>
    </svg>
  );
}
export function StarIcon({
  dimension = defaultValues.dimension,
  color = defaultValues.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM17.25 7l.525-2.225L16 3.3l2.35-.2l.9-2.1l.9 2.1l2.35.2l-1.775 1.475L21.25 7l-2-1.175z"
      ></path>
    </svg>
  );
}
export function SearchIcon({
  dimension = defaultValues.dimension,
  color = defaultValues.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
      ></path>
    </svg>
  );
}
export function SideBarIcon({
  dimension = defaultValues.dimension,
  color = defaultValues.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <g fill={color}>
        <path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6z"></path>
        <path
          fillRule="evenodd"
          d="M11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6zm-2.293 7.707a1 1 0 0 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414-1.414L7.414 12z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}
export function MenuIcon({
  dimension = defaultValues.dimension,
  color = defaultValues.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M21 4H7v2h14zm0 7H11v2h10zm0 7H7v2h14zM1.99 8.814L3.402 7.4L8 11.996l-4.597 4.596l-1.414-1.414l3.182-3.182z"
      ></path>
    </svg>
  );
}
