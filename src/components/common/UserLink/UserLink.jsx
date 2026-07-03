import { useNavigate } from "react-router-dom";

function UserLink({ user, children, className = "", stopPropagation = false }) {
  const navigate = useNavigate();

  if (!user?.username) {
    return children;
  }

  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }

    navigate(`/profile/${user.username}`);
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
}

export default UserLink;
