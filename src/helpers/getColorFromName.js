const getColorFromName = (name = "") => {
  if (!name) {
    return "#6A5ACD";
  }

  const colors = ["#6A5ACD", "#20B2AA", "#FF8C00", "#FF69B4", "#4682B4"];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default getColorFromName;
