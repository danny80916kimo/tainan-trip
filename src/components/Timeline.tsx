import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Stop } from '../data/itinerary'
import { StopCard } from './StopCard'

interface Props {
  stops: Stop[]
  selectedId: string | null
  onSelect: (id: string) => void
  onMove: (from: number, to: number) => void
}

export function Timeline({ stops, selectedId, onSelect, onMove }: Props) {
  // Dragging only starts from the ⋮⋮ handle, so no activation distance is
  // needed and normal scrolling on the cards keeps working.
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const from = stops.findIndex((s) => s.id === active.id)
    const to = stops.findIndex((s) => s.id === over.id)
    if (from !== -1 && to !== -1) onMove(from, to)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <ol className="relative space-y-3 px-4 py-4">
          {/* vertical spine behind the numbered badges */}
          <div aria-hidden className="absolute top-8 bottom-8 left-[31px] w-0.5 bg-line" />
          {stops.map((stop, i) => (
            <StopCard
              key={stop.id}
              stop={stop}
              index={i}
              isSelected={selectedId === stop.id}
              onSelect={() => onSelect(stop.id)}
            />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  )
}
