import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSheetStore } from "../store/sheetStore";

export default function Question({ question, topicId, subTopicId }) {
  const toggleSolved = useSheetStore((s) => s.toggleSolved);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: question.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`
        flex items-center gap-3
        px-3 py-1.5 mt-1 rounded-md border text-sm
        ${question.solved
          ? "bg-green-900/30 border-green-600 text-green-300"
          : "bg-slate-800 border-slate-700 text-gray-200"}
      `}
    >
      {/* ✅ DRAG HANDLE */}
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-200 select-none"
        title="Drag question"
      >
        ⠿
      </span>

      {/* ✅ SOLVED CHECKBOX */}
      <input
        type="checkbox"
        checked={question.solved}
        onChange={() =>
          toggleSolved(topicId, subTopicId, question.id)
        }
        className="accent-green-500 cursor-pointer"
      />

      {/* QUESTION TITLE */}
      <span
        className={`flex-1 ${
          question.solved ? "line-through opacity-70" : ""
        }`}
      >
        {question.title}
      </span>
    </div>
  );
}
