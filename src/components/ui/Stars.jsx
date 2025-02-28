export default function Stars({ vote }) {
    const starIcons = [];
  
    for (let i = 1; i <= 5; i++) {
      if (i <= vote) {
        // Stelline colorate
        starIcons.push(<i key={i} className="fa-solid fa-star"></i>);
      } else {
        // Stelline vuote
        starIcons.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
  
    return <div className="text-amber-300">{starIcons}</div>;
  }