import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSheetStore } from "../store/sheetStore";
import Topic from "./Topic";

export default function SheetView() {
  const sheet = useSheetStore((s) => s.sheet);
  const addTopic = useSheetStore((s) => s.addTopic);
  const reorderTopics = useSheetStore((s) => s.reorderTopics);
  const search = useSheetStore((s) => s.search);
  const setSearch = useSheetStore((s) => s.setSearch);

  if (!sheet) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">
          {sheet.title}
        </h1>

        <button
          onClick={() => addTopic(prompt("Topic name"))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
        >
          + Add Topic
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search questions..."
        className="w-full mb-6 px-4 py-2 rounded-lg bg-slate-800 text-gray-200 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(e) =>
          reorderTopics(e.active.id, e.over?.id)
        }
      >
        <SortableContext
          items={sheet.topics.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {sheet.topics.map((t) => (
            <Topic key={t.id} topic={t} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
