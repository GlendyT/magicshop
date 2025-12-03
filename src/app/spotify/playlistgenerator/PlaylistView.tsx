import useSpotify from "@/hooks/useSpotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import React from "react";
import { FaTrash, FaMusic, FaShuffle, FaGripVertical } from "react-icons/fa6";
import UnauthView from "./UnauthView";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SpotifyTrack } from "@/types/types.spotify";
import Image from "next/image";

interface SortableTrackItemProps {
  track: SpotifyTrack;
  index: number;
  id: string;
  removeTrackFromPreview: (trackId: string, index: number) => void;
}

const SortableTrackItem = ({
  track,
  index,
  id,
  removeTrackFromPreview,
}: SortableTrackItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center  bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex flex-row w-full items-center justify-between gap-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaGripVertical className="text-lg" />
        </div>

        <div className="flex flex-row w-full justify-between items-center gap-1">
          {track.album.images[0] && (
            <Image
              src={track.album.images[0].url}
              alt={track.album.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded"
            />
          )}

          <div className="flex-1">
            <p className="font-medium text-gray-900 text-md truncate w-62 ">{track.name}</p>
            <p className="text-xs text-gray-600">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>

          <ButtonUtils
            icon={<FaTrash />}
            onClick={() => removeTrackFromPreview(track.id, index)}
            className=" hover:bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = () => {
  const {
    accessToken,
    selectedTracks,
    totalSongs,
    generatePlaylist,
    targetDurationHours,
    currentDuration,
    expandedPlaylist,
    shufflePlaylist,
    removeTrackFromPreview,
    reorderPlaylist,
  } = useSpotify();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = expandedPlaylist.findIndex(
        (_, i) => `track-${i}` === active.id
      );
      const newIndex = expandedPlaylist.findIndex(
        (_, i) => `track-${i}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(expandedPlaylist, oldIndex, newIndex);
        reorderPlaylist(newOrder);
      }
    }
  };

  return (
    <div
      className={`relative w-96 ${!accessToken ? "pointer-events-none" : ""}`}
    >
      {!accessToken && <UnauthView />}
      <div className=" mb-2 rounded-lg shadow-md px-6 py-4 flex bg-white flex-wrap items-center justify-between ">
        <div>
          <h2 className="text-xl font-semibold text-purple-900">
            Selected Songs ({totalSongs} total)
          </h2>
          <p className="text-sm text-gray-600">
            Manage your selected songs below
          </p>
        </div>

        {selectedTracks.size > 0 && (
          <div className="flex gap-2">
            <ButtonUtils
              icon={<FaShuffle />}
              onClick={shufflePlaylist}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg text-xs cursor-pointer"
            />
            <ButtonUtils
              label={"Create Playlist"}
              onClick={generatePlaylist}
              disabled={
                !targetDurationHours ||
                currentDuration.totalMs < targetDurationHours * 60 * 60 * 1000
              }
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-3 shadow-lg text-xs cursor-pointer"
            />
          </div>
        )}
      </div>
      {selectedTracks.size > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={expandedPlaylist.map((_, i) => `track-${i}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className=" bg-white rounded-lg shadow-md p-2 space-y-2 h-96 overflow-y-auto">
              {expandedPlaylist.map((track, index) => (
                <SortableTrackItem
                  key={`track-${index}`}
                  id={`track-${index}`}
                  track={track}
                  index={index}
                  removeTrackFromPreview={removeTrackFromPreview}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className=" h-auto bg-white rounded-lg shadow-md w-auto text-gray-500 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Playlist Preview
            </h2>
          </div>
          <div className="flex flex-col gap-1 h-auto  ">
            <div className="flex flex-col  w-auto items-center justify-center text-gray-500 py-14">
              <FaMusic className="text-3xl items-center" />
              <p className="text-lg font-medium">No songs selected yet</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistView;
