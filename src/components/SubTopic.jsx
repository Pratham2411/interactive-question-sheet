import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSheetStore } from "../store/sheetStore";
import Question from "./Question";

export default function SubTopic({ subtopic, topicId }) {
  const {
    editSubTopic,
    deleteSubTopic,
    addQuestion,
    reorderQuestions,
    search,
  } = useSheetStore();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: subtopic.id });

  // ✅ VISUAL FILTER ONLY
  const visibleQuestions = subtopic.questions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-3"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab font-medium text-gray-200"
        >
          ⠿ {subtopic.title}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              const t = prompt("Edit subtopic", subtopic.title);
              if (t) editSubTopic(topicId, subtopic.id, t);
            }}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded"
          >
            ✏️
          </button>

          <button
            onClick={() =>
              deleteSubTopic(topicId, subtopic.id)
            }
            className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
          >
            ✕
          </button>

          <button
            onClick={() => {
              const t = prompt("Question name?");
              if (t) addQuestion(topicId, subtopic.id, t);
            }}
            className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
          >
            + Q
          </button>
        </div>
      </div>

      {/* QUESTIONS */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(e) =>
          reorderQuestions(
            topicId,
            subtopic.id,
            e.active.id,
            e.over?.id
          )
        }
      >
        {/* ✅ IMPORTANT: FULL LIST HERE */}
        <SortableContext
          items={subtopic.questions.map(q => q.id)}
          strategy={verticalListSortingStrategy}
        >
          {visibleQuestions.length === 0 ? (
            <div className="text-sm text-slate-400 italic">
              No matching questions
            </div>
          ) : (
            visibleQuestions.map(q => (
              <Question
                key={q.id}
                question={q}
                topicId={topicId}
                subTopicId={subtopic.id}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
