import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const formatName = (raw) => {
    if (!raw) return "Unknown";
    const base = raw.includes("@") ? raw.split("@")[0] : raw;
    return base
      .split(/[ ._-]+/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    const parts = (nameOrEmail.includes("@") ? nameOrEmail.split("@")[0] : nameOrEmail)
      .split(" ")
      .filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  const user = note?.user || null;
  const displayName = user ? formatName(user.name || user.email) : "Unknown";
  const initials = user ? getInitials(user.name || user.email) : "U";
  const isAdmin = user?.role === "admin";

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] "
    >
      <div className="card-body">
        <div className="card-actions justify-between items-center mb-4">
          
        {user && (
          <div className="flex items-center gap-3 mt-2">
            {/* Avatar circle with subtle glass + ring */}
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full ring-1 ${
                isAdmin
                  ? "ring-purple-400/30 bg-gradient-to-br from-purple-50 to-pink-50"
                  : "ring-emerald-300/25 bg-gradient-to-br from-emerald-50 to-teal-50"
              }`}
              title={isAdmin ? "Administrator" : "User"}
              aria-hidden="true"
            >
              <span
                className={`text-sm font-semibold ${
                  isAdmin ? "text-purple-600" : "text-emerald-600"
                }`}
              >
                {initials}
              </span>
            </div>

            {/* Name + role */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-base-content">{displayName}</span>

              <span
                className={`inline-flex items-center px-2 py-[2px] text-[10px] rounded-full tracking-widest uppercase ${
                  isAdmin
                    ? "bg-gradient-to-r from-purple-600/10 to-pink-600/10 text-purple-600"
                    : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600"
                }`}
                aria-label={`Role: ${isAdmin ? "Administrator" : "User"}`}
                title={isAdmin ? "Administrator" : "User"}
              >
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
        )}

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
        
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>
      </div>
    </Link>
  );
};
export default NoteCard;
