import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import Dropdown from "../../../../components/ui/Dropdown/Dropdown";
import DropdownItem from "../../../../components/ui/Dropdown/DropdownItem";
import useModalStore from "../../../../stores/useModalStore";

function CommentMenu({ comment, postId }) {
  const [open, setOpen] = useState(false);

  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full p-2 transition hover:bg-zinc-800"
      >
        <BsThreeDots size={20} className="text-zinc-400" />
      </button>

      <Dropdown open={open} onClose={() => setOpen(false)}>
        <DropdownItem
          icon={<FiEdit2 size={18} />}
          onClick={() => {
            setOpen(false);
            openModal("edit-comment", {
              comment,
              postId,
            });
          }}
        >
          Edit Comment
        </DropdownItem>

        <DropdownItem
          danger
          icon={<FiTrash2 size={18} />}
          onClick={() => {
            setOpen(false);
            openModal("delete-comment", {
              comment,
              postId,
            });
          }}
        >
          Delete Comment
        </DropdownItem>
      </Dropdown>
    </div>
  );
}

export default CommentMenu;
