import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSheetStore } from "../store/sheetStore";
import SubTopic from "./SubTopic";

export default function Topic({ topic }) {
  const {
    editTopic,
    deleteTopic,
    addSubTopic,
    reorderSubTopics,
  } = useSheetStore();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: topic.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="
        bg-slate-800
        rounded-xl
        p-4
        mb-5
        shadow-md
        border
        border-slate-700
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab font-semibold text-lg text-white"
        >
          ⠿ {topic.title}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              const t = prompt("Edit topic", topic.title);
              if (t) editTopic(topic.id, t);
            }}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded"
          >
            ✏️
          </button>

          <button
            onClick={() => deleteTopic(topic.id)}
            className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
          >
            ✕
          </button>

          <button
            onClick={() => {
              const t = prompt("Subtopic name?");
              if (t) addSubTopic(topic.id, t);
            }}
            className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
          >
            + Sub
          </button>
        </div>
      </div>

      {/* SUBTOPICS */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(e) =>
          reorderSubTopics(topic.id, e.active.id, e.over?.id)
        }
      >
        <SortableContext
          items={topic.subtopics.map(st => st.id)}
          strategy={verticalListSortingStrategy}
        >
          {topic.subtopics.map(st => (
            <SubTopic
              key={st.id}
              subtopic={st}
              topicId={topic.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
